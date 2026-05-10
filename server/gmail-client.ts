// Gmail integration via Replit connector (google-mail)
// WARNING: Never cache this client. Tokens expire — always call getUncachableGmailClient() fresh.
import { google } from "googleapis";

let gmailConnectionSettings: any;

async function getGmailAccessToken() {
  if (
    gmailConnectionSettings &&
    gmailConnectionSettings.settings.expires_at &&
    new Date(gmailConnectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return gmailConnectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error("X-Replit-Token not found for repl/depl");
  }

  gmailConnectionSettings = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=google-mail",
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken =
    gmailConnectionSettings?.settings?.access_token ||
    gmailConnectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!gmailConnectionSettings || !accessToken) {
    gmailConnectionSettings = null; // clear cache so next call fetches fresh
    throw new Error("Gmail not connected");
  }
  return accessToken;
}

export async function getUncachableGmailClient() {
  const accessToken = await getGmailAccessToken();
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.gmail({ version: "v1", auth: oauth2Client });
}
