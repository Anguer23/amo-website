// Calendar service using Google Calendar API via Replit connector
import { getUncachableGoogleCalendarClient } from "./calendar-client.js";

function parseConsultationDateTime(dateStr: string, timeStr: string): { start: string; end: string } {
  // dateStr: e.g. "March 15, 2026" or "2026-03-15"
  // timeStr: e.g. "10:00 AM", "2:30 PM"

  let dateObj: Date;

  // Try ISO format first
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    dateObj = new Date(dateStr);
  } else {
    // Parse "Month DD, YYYY"
    dateObj = new Date(dateStr);
  }

  // Parse time
  const timeMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    dateObj.setHours(hours, minutes, 0, 0);
  }

  const start = dateObj.toISOString();
  const endObj = new Date(dateObj.getTime() + 60 * 60 * 1000); // 1 hour duration
  const end = endObj.toISOString();

  return { start, end };
}

export async function createConsultationCalendarEvent(
  operatorName: string,
  operatorEmail: string,
  date: string,
  time: string,
  tier: string,
  fleetSize: string
): Promise<{ success: boolean; eventId?: string; eventLink?: string; error?: string }> {
  try {
    const calendar = await getUncachableGoogleCalendarClient();
    const { start, end } = parseConsultationDateTime(date, time);

    const event = {
      summary: `Consultation — ${operatorName} (${tier})`,
      description: [
        `Fleet Operator: ${operatorName}`,
        `Email: ${operatorEmail}`,
        `Fleet Size: ${fleetSize}`,
        `Plan: ${tier}`,
        ``,
        `This consultation was scheduled via the AM Operations Group website.`,
        ``,
        `Agenda:`,
        `• Review operator's current dispatch setup`,
        `• Present live revenue improvement projections`,
        `• Walk through the ${tier} plan in detail`,
        `• Q&A — no commitment required`,
      ].join("\n"),
      start: {
        dateTime: start,
        timeZone: "America/New_York",
      },
      end: {
        dateTime: end,
        timeZone: "America/New_York",
      },
      attendees: [{ email: operatorEmail, displayName: operatorName }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 30 },       // 30 min before
        ],
      },
      conferenceData: undefined,
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all", // sends invites to attendees
    });

    console.log(`✓ Calendar event created: ${response.data.id} (${response.data.htmlLink})`);
    return {
      success: true,
      eventId: response.data.id ?? undefined,
      eventLink: response.data.htmlLink ?? undefined,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to create calendar event:", msg);
    return { success: false, error: msg };
  }
}
