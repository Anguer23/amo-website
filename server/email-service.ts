// Email service using Gmail API via Replit connector
// Calendar invites are embedded as iCal (.ics) attachments in the confirmation email
import { getUncachableGmailClient } from "./gmail-client.js";

function generateICalEvent(
  operatorName: string,
  operatorEmail: string,
  date: string,
  time: string,
  tier: string,
  fleetCapacity: string
): string {
  // Parse date and time into a Date object
  let dateObj = new Date(date);

  const timeMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    dateObj.setHours(hours, minutes, 0, 0);
  }

  const endObj = new Date(dateObj.getTime() + 60 * 60 * 1000); // 1 hour

  function toICalDate(d: Date): string {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  const uid = `${Date.now()}-${Math.random().toString(36).substring(2)}@amopsgroup.com`;
  const now = toICalDate(new Date());
  const start = toICalDate(dateObj);
  const end = toICalDate(endObj);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AM Operations Group//Consultation Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Consultation — AM Operations Group (${tier})`,
    `DESCRIPTION:Fleet Operator: ${operatorName}\\nFleet Size: ${fleetCapacity}\\nPlan: ${tier}\\n\\nAgenda:\\n• Review your current dispatch setup\\n• Live revenue improvement projections\\n• ${tier} plan walkthrough\\n• Q&A — no commitment required`,
    `ORGANIZER;CN=AM Operations Group:mailto:amopsgroup@gmail.com`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${operatorName}:mailto:${operatorEmail}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:EMAIL",
    `DESCRIPTION:Reminder: Consultation with AM Operations Group tomorrow`,
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:Consultation with AM Operations Group in 30 minutes`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function createMimeMessageWithCalendar(
  to: string,
  subject: string,
  htmlBody: string,
  icalContent: string
): string {
  const boundary = `amops_${Date.now()}_boundary`;
  const calBoundary = `amops_${Date.now()}_cal`;

  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: multipart/alternative; boundary="${calBoundary}"`,
    ``,
    `--${calBoundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: quoted-printable`,
    ``,
    htmlBody,
    ``,
    `--${calBoundary}`,
    `Content-Type: text/calendar; charset=UTF-8; method=REQUEST`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    icalContent,
    ``,
    `--${calBoundary}--`,
    ``,
    `--${boundary}`,
    `Content-Type: application/ics; name="consultation.ics"`,
    `Content-Transfer-Encoding: base64`,
    `Content-Disposition: attachment; filename="consultation.ics"`,
    ``,
    Buffer.from(icalContent).toString("base64"),
    ``,
    `--${boundary}--`,
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const TEAM_EMAILS = [
  "angel@amopsgroup.com",
  "max@amopsgroup.com",
  "dispatch@amopsgroup.com",
];

function createSimpleMimeMessage(to: string, subject: string, htmlBody: string): string {
  const boundary = `amops_simple_${Date.now()}`;
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: quoted-printable`,
    ``,
    htmlBody,
    ``,
    `--${boundary}--`,
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendInternalNotification(
  operatorName: string,
  operatorEmail: string,
  date: string,
  time: string,
  tier: string,
  fleetCapacity: string
): Promise<void> {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #030303; color: white; padding: 28px 30px; border-radius: 12px 12px 0 0;">
        <p style="margin: 0; color: #888; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">AM Operations Group — Internal Alert</p>
        <h1 style="font-size: 22px; margin: 8px 0 0 0; font-weight: 800;">🔔 New Consultation Booked</h1>
      </div>

      <div style="padding: 32px 30px; background: #f9f9f9;">
        <p style="color: #555; font-size: 15px; margin-top: 0;">A fleet operator just submitted a consultation request on the website. Here are the details:</p>

        <div style="background: white; border-left: 4px solid #6366f1; padding: 24px; margin: 20px 0; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 130px;">Operator</td>
              <td style="padding: 8px 0; color: #030303; font-size: 16px; font-weight: 700;">${operatorName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 8px 0; color: #030303; font-size: 15px;"><a href="mailto:${operatorEmail}" style="color: #6366f1;">${operatorEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Fleet Size</td>
              <td style="padding: 8px 0; color: #030303; font-size: 15px;">${fleetCapacity}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Requested Date</td>
              <td style="padding: 8px 0; color: #030303; font-size: 15px; font-weight: 600;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Requested Time</td>
              <td style="padding: 8px 0; color: #030303; font-size: 15px; font-weight: 600;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Plan Interest</td>
              <td style="padding: 8px 0;">
                <span style="background: #030303; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">${tier}</span>
              </td>
            </tr>
          </table>
        </div>

        <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 16px 20px; border-radius: 8px; margin-top: 20px;">
          <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 1.6;">
            <strong>Action needed:</strong> The operator has received a confirmation email with a calendar invite.
            Follow up within 24 hours to prepare for the call. Reply to this email to reach them directly.
          </p>
        </div>
      </div>

      <div style="text-align: center; padding: 20px 30px; background: #030303; border-radius: 0 0 12px 12px;">
        <p style="color: #555; margin: 0; font-size: 11px; letter-spacing: 1px;">
          AM Operations Group &nbsp;·&nbsp; Internal Notification System
        </p>
      </div>
    </div>
  `;

  try {
    const gmail = await getUncachableGmailClient();
    const toLine = TEAM_EMAILS.join(", ");
    const raw = createSimpleMimeMessage(
      toLine,
      `🔔 New Consultation: ${operatorName} — ${date} at ${time}`,
      htmlBody
    );

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    console.log(`✓ Internal notification sent to team (id: ${response.data.id})`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send internal notification:", msg);
  }
}

export async function sendConsultationEmail(
  operatorEmail: string,
  operatorName: string,
  date: string,
  time: string,
  tier: string,
  fleetCapacity = ""
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #030303; color: white; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="font-size: 28px; margin: 0 0 8px 0; font-weight: 800; letter-spacing: -0.5px;">AM Operations Group</h1>
        <p style="margin: 0; color: #888; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Revenue Stability Engineered</p>
      </div>

      <div style="padding: 40px 30px; background: #f9f9f9;">
        <h2 style="color: #030303; margin-top: 0; font-size: 22px;">Your Consultation is Confirmed</h2>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">Hi <strong>${operatorName}</strong>,</p>

        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          We're looking forward to showing you exactly how AM Operations Group can
          stabilize and grow your fleet revenue. Your consultation is locked in.
        </p>

        <div style="background: white; border-left: 4px solid #10b981; padding: 24px; margin: 28px 0; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Date</td>
              <td style="padding: 8px 0; color: #030303; font-size: 16px; font-weight: 600;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Time</td>
              <td style="padding: 8px 0; color: #030303; font-size: 16px; font-weight: 600;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Plan</td>
              <td style="padding: 8px 0; color: #030303; font-size: 16px; font-weight: 600;">${tier}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 8px 0; color: #030303; font-size: 16px;">${operatorEmail}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fbbf24; padding: 16px 20px; border-radius: 8px; margin: 0 0 28px 0;">
          <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
            📅 <strong>A calendar invite is attached to this email.</strong> Open the attachment or click "Add to Calendar" to save it directly to Google Calendar, Outlook, or Apple Calendar.
          </p>
        </div>

        <h3 style="color: #030303; font-size: 16px; margin-top: 32px;">What Happens on the Call</h3>
        <ul style="color: #555; font-size: 15px; line-height: 2; padding-left: 20px;">
          <li>Review of your fleet's current dispatch setup</li>
          <li>Live breakdown of projected revenue improvements</li>
          <li>${tier} plan walkthrough — line by line</li>
          <li>No commitment required — just results you can see</li>
        </ul>

        <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 20px 24px; border-radius: 8px; margin: 32px 0;">
          <p style="color: #166534; margin: 0; font-size: 14px; line-height: 1.6;">
            <strong>Zero Risk Guarantee:</strong> Every plan includes no lock-in. Try us for one load
            free on the First Load Free tier and decide for yourself. We earn your business by
            performing, not by signing contracts.
          </p>
        </div>

        <p style="color: #888; font-size: 14px; margin-top: 32px;">
          Questions before the call? Reply directly to this email.
        </p>
      </div>

      <div style="text-align: center; padding: 24px 30px; background: #030303; border-radius: 0 0 12px 12px;">
        <p style="color: #555; margin: 0; font-size: 12px; letter-spacing: 1px;">
          © 2026 AM Operations Group &nbsp;·&nbsp; Structural Discipline Guaranteed
        </p>
      </div>
    </div>
  `;

  const icalContent = generateICalEvent(operatorName, operatorEmail, date, time, tier, fleetCapacity);

  try {
    const gmail = await getUncachableGmailClient();
    const raw = createMimeMessageWithCalendar(
      operatorEmail,
      `Consultation Confirmed — AM Operations Group`,
      htmlBody,
      icalContent
    );

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    console.log(`✓ Confirmation email + calendar invite sent to ${operatorEmail} (id: ${response.data.id})`);
    return { success: true, messageId: response.data.id ?? undefined };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send confirmation email:", msg);
    return { success: false, error: msg };
  }
}

export async function sendTestEmail(
  toEmail: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #f9f9f9; border-radius: 12px;">
      <div style="background: #030303; color: white; padding: 32px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800;">AM Operations Group</h1>
        <p style="margin: 8px 0 0 0; color: #888; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Revenue Stability Engineered</p>
      </div>
      <h2 style="color: #030303;">Gmail Integration Active ✓</h2>
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Your Gmail connector is working. Consultation confirmation emails with calendar invites
        will now be sent automatically to every operator who books a consultation.
      </p>
      <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 16px 20px; border-radius: 8px; margin-top: 20px;">
        <p style="color: #166534; margin: 0; font-size: 14px;">
          ✓ Gmail connected &nbsp;|&nbsp; ✓ Calendar invites embedded &nbsp;|&nbsp; ✓ Ready for production
        </p>
        <p style="color: #166534; margin: 8px 0 0 0; font-size: 12px;">
          Sent at: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST
        </p>
      </div>
    </div>
  `;

  // Also attach a sample ical for the test
  const icalContent = generateICalEvent(
    "Test Operator",
    toEmail,
    "April 2, 2026",
    "10:00 AM",
    "First Load Free",
    "5 trucks"
  );

  try {
    const gmail = await getUncachableGmailClient();
    const raw = createMimeMessageWithCalendar(
      toEmail,
      "Gmail Integration Test — AM Operations Group",
      htmlBody,
      icalContent
    );

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    console.log(`✓ Test email sent to ${toEmail} (id: ${response.data.id})`);
    return { success: true, messageId: response.data.id ?? undefined };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send test email:", msg);
    return { success: false, error: msg };
  }
}
