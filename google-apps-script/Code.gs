/**
 * GradPath AU — Automated Google Calendar & Gmail Invite + Report Sender
 *
 * Setup (takes ~3 minutes, 100% free):
 * 1. Open https://script.google.com -> Click "New project" -> Name it "GradPath AU Mailer".
 * 2. Delete any starter code and paste this entire file.
 * 3. Click "Deploy" -> "New deployment" -> Type: "Web app".
 *    - Execute as: "Me (abhisheka12@gmail.com)"
 *    - Who has access: "Anyone"
 * 4. Click "Deploy" -> Authorize Calendar & Gmail permissions -> Copy the Web App URL (ends with /exec).
 * 5. Paste that URL into GradPath AU (or send it in chat to hardcode into your live site).
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || "{}");
    var action = data.action || "send_invite";

    if (action === "send_invite") {
      return handleSendInvite(data);
    }
    if (action === "send_report") {
      return handleSendReport(data);
    }
    return jsonResponse({ ok: false, error: "Unknown action: " + action });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function handleSendInvite(d) {
  var studentEmail = (d.email || "").trim();
  if (!studentEmail) return jsonResponse({ ok: false, error: "Missing graduate email" });

  var mentor = d.mentor || "GradPath AU Mentor";
  var student = d.student || "Graduate";
  var topic = d.topic || "30-Min Free Pilot Mentoring Session";
  var dateStr = d.date || ""; // YYYY-MM-DD
  var timeStr = d.time || "18:30"; // HH:MM (Australia/Melbourne)
  var duration = Number(d.duration || 30);
  var joinUrl = d.joinUrl || "https://abhisheka12.github.io/gradpath-au/";

  var title = "GradPath AU 1:1 Mentoring — " + mentor + " × " + student;
  var description = [
    "Your free " + duration + "-minute GradPath AU Pilot Mentoring session is confirmed!",
    "",
    "• Mentor: " + mentor,
    "• Topic: " + topic,
    "• Join via GradPath AU Portal: " + joinUrl,
    "",
    "What to bring:",
    "1. Your 1-page CV (PDF or Google Doc)",
    "2. Your LinkedIn / GitHub link (if relevant)",
    "3. Optional: 1 practice answer recorded in GradPath AU Video Lab"
  ].join("\n");

  // Create real Google Calendar event & automatically send invite to graduate
  var calendarCreated = false;
  if (dateStr && timeStr) {
    var parts = dateStr.split("-");
    var tParts = timeStr.split(":");
    var start = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2]),
      Number(tParts[0]),
      Number(tParts[1]),
      0
    );
    var end = new Date(start.getTime() + duration * 60000);

    CalendarApp.getDefaultCalendar().createEvent(title, start, end, {
      description: description,
      location: joinUrl,
      guests: studentEmail,
      sendInvites: true
    });
    calendarCreated = true;
  }

  // Send crisp branded confirmation email directly to the graduate
  var htmlBody =
    '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#111315;">' +
      '<div style="padding:20px 24px;border:1px solid #E2E8F0;border-radius:18px;background:#FFFFFF;">' +
        '<div style="font-size:12px;font-weight:700;color:#047857;background:#ECFDF5;display:inline-block;padding:4px 10px;border-radius:999px;margin-bottom:12px;">Confirmed · Free Founding Pilot ($0)</div>' +
        '<h2 style="margin:0 0 8px;font-size:20px;">Hi ' + esc(student) + ', your 1:1 session is booked!</h2>' +
        '<p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.5;">You’re confirmed for a ' + duration + '-minute mentoring session with <strong>' + esc(mentor) + '</strong> through <strong>GradPath AU</strong>.</p>' +
        '<div style="background:#F8FAFC;border-radius:12px;padding:14px 16px;font-size:13px;line-height:1.7;margin-bottom:18px;">' +
          '<div><strong>Topic:</strong> ' + esc(topic) + '</div>' +
          '<div><strong>When:</strong> ' + esc(dateStr) + ' at ' + esc(timeStr) + ' (Melbourne / AEDT)</div>' +
          '<div><strong>Duration:</strong> ' + duration + ' minutes</div>' +
        '</div>' +
        '<a href="' + esc(joinUrl) + '" style="display:inline-block;background:#111315;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px;">Join GradPath AU Video Room →</a>' +
        '<p style="margin:18px 0 0;font-size:12px;color:#64748B;line-height:1.6;"><strong>Before the call:</strong> Have your 1-page CV ready (and your LinkedIn/GitHub link if relevant). A calendar invite has also been sent to this address.</p>' +
      '</div>' +
    '</div>';

  GmailApp.sendEmail(studentEmail, "Confirmed: " + title, description, {
    htmlBody: htmlBody,
    name: "GradPath AU Mentoring"
  });

  return jsonResponse({ ok: true, calendarCreated: calendarCreated, sentTo: studentEmail });
}

function handleSendReport(d) {
  var studentEmail = (d.email || "").trim();
  if (!studentEmail) return jsonResponse({ ok: false, error: "Missing graduate email" });

  var mentor = d.mentor || "GradPath AU Mentor";
  var student = d.student || "Graduate";
  var overall = d.overall || "8.0";
  var verdict = d.verdict || "Strong Progress";
  var reportUrl = d.reportUrl || "https://abhisheka12.github.io/gradpath-au/";

  var subject = "Your GradPath AU Session Scorecard (" + overall + "/10) — " + mentor;
  var plain = [
    "Hi " + student + ",",
    "",
    "Great speaking with you today! Here is your official GradPath AU Written Scorecard & 7-Day Action Plan:",
    "• Overall Readiness: " + overall + "/10 — " + verdict,
    "• View & Save PDF Report: " + reportUrl,
    "",
    "— " + mentor + ", GradPath AU"
  ].join("\n");

  var htmlBody =
    '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#111315;">' +
      '<div style="padding:20px 24px;border:1px solid #E2E8F0;border-radius:18px;background:#FFFFFF;">' +
        '<div style="font-size:12px;font-weight:700;color:#1D4ED8;background:#EFF6FF;display:inline-block;padding:4px 10px;border-radius:999px;margin-bottom:12px;">Official GradPath AU Scorecard</div>' +
        '<h2 style="margin:0 0 8px;font-size:20px;">Your Mentoring Report is Ready, ' + esc(student) + '</h2>' +
        '<p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.5;">Mentored by <strong>' + esc(mentor) + '</strong> · Readiness Score: <strong>' + esc(overall) + '/10</strong> (' + esc(verdict) + ')</p>' +
        '<a href="' + esc(reportUrl) + '" style="display:inline-block;background:#111315;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px;">Open Scorecard &amp; Save PDF →</a>' +
        '<p style="margin:18px 0 0;font-size:12px;color:#64748B;">Includes your 4-category scores, key red flags fixed, and your next 7-day AU graduate action plan.</p>' +
      '</div>' +
    '</div>';

  GmailApp.sendEmail(studentEmail, subject, plain, {
    htmlBody: htmlBody,
    name: "GradPath AU Mentoring"
  });

  return jsonResponse({ ok: true, sentTo: studentEmail });
}

function esc(s) {
  return String(s || "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
