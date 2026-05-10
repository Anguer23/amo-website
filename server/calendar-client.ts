// Google Calendar integration via Replit connector (google-calendar)
// WARNING: Never cache this client. Tokens expire — always call getUncachableGoogleCalendarClient() fresh.
import { google } from "googleapis";

let calendarConnectionSettings: any;

async function getCalendarAccessToken() {
  if (
    calendarConnectionSettings &&
    calendarConnectionSettings.settings.expires_at &&
    new Date(calendarConnectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return calendarConnectionSettings.settings.access_token;
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

  calendarConnectionSettings = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=google-calendar",
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
    calendarConnectionSettings?.settings?.access_token ||
    calendarConnectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!calendarConnectionSettings || !accessToken) {
    calendarConnectionSettings = null; // clear cache so next call fetches fresh
    throw new Error("Google Calendar not connected");
  }
  return accessToken;
}

export async function getUncachableGoogleCalendarClient() {
  const accessToken = await getCalendarAccessToken();
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
}
