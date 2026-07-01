export type PrivacyBlock =
  | { type: "heading"; text: string }
  | { type: "divider" }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

/** Privacy & Refund Policy content — Figma nodes 78:11104–78:11140, document order. */
export const privacyBlocks: PrivacyBlock[] = [
  { type: "heading", text: "1. Who we are" },
  { type: "divider" },
  {
    type: "paragraph",
    text: '5–9 Playhaus ("5–9 Playhaus," "5to9 Playhaus", "we," "our") is hosted and operated by Diem, an independent artist and educator based in Ontario, Canada. The studio operates under the name 5–9 Playhaus.',
  },
  {
    type: "paragraph",
    text: "For any questions about this policy, you can reach us at the contact details at the bottom of this page.",
  },
  { type: "heading", text: "2. Information we collect" },
  { type: "divider" },
  {
    type: "paragraph",
    text: "We collect only what we need to run workshops and keep in touch. This includes:",
  },
  {
    type: "list",
    items: [
      "Name, email address, and phone number when you book a workshop or contact us",
      "Payment details processed through our third-party booking and payment platforms (we never store card numbers directly)",
      "Accessibility needs or allergies if you choose to share them, so we can make your session comfortable",
      "Company name and event details for corporate bookings",
      "Your email address if you subscribe to updates or the tutorial newsletter",
      "Basic browsing data collected automatically by our website host (pages visited, device type, approximate location)",
    ],
  },
  { type: "heading", text: "3. How we use your information" },
  { type: "divider" },
  {
    type: "paragraph",
    text: "Your information is used to:",
  },
  {
    type: "list",
    items: [
      "Confirm bookings and send reminders, directions, and pickup notices for your finished pieces",
      "Process payments and issue refunds when needed",
      "Respond to questions or requests you send us",
      "Send workshop announcements, new tutorial releases, or studio news — only if you've opted in",
      "Accommodate any accessibility or dietary needs you've shared",
      "Improve the website and workshop experience based on aggregate, anonymised usage patterns",
    ],
  },
  {
    type: "paragraph",
    text: "We will never use your personal information to send you unrelated marketing, and we will never sell it.",
  },
  { type: "heading", text: "4. Sharing your information" },
  { type: "divider" },
  {
    type: "paragraph",
    text: "We do not sell or rent your personal information. We may share limited data with trusted third-party services that help us operate:",
  },
  {
    type: "list",
    items: [
      "Booking and payment processors (e.g. Square, Stripe, or similar) to handle transactions",
      "Email platforms to send booking confirmations and newsletters",
      "Our website host for basic analytics and site functionality",
    ],
  },
  {
    type: "paragraph",
    text: "Each of these services is bound by their own privacy policies and data processing agreements. We only share the minimum information required for each service to function.",
  },
  {
    type: "paragraph",
    text: "For corporate bookings, we may coordinate with your company's point of contact to organise the event — no additional personal data from attendees is shared externally without consent.",
  },
  { type: "heading", text: "5. Photography & content" },
  { type: "divider" },
  {
    type: "paragraph",
    text: "We occasionally photograph workshops for use on our website, social media, and promotional materials.",
  },
  {
    type: "paragraph",
    text: "If you see a photo of yourself on our platforms that you'd like removed, please reach out and we'll take it down promptly.",
  },
  { type: "heading", text: "6. How long we keep your information" },
  { type: "divider" },
  {
    type: "paragraph",
    text: "We keep booking and payment records for up to seven years as required by Canadian tax law. Email subscriber data is retained until you unsubscribe. Accessibility or dietary information you share for a session is deleted once that booking is complete.",
  },
  {
    type: "paragraph",
    text: "You can request deletion of your personal information at any time.",
  },
  { type: "heading", text: "7. Cookies" },
  { type: "divider" },
  {
    type: "paragraph",
    text: "Our website uses cookies for basic functionality — keeping your booking session active, remembering preferences, and understanding how visitors navigate the site. We use only essential and analytics cookies; no advertising or tracking cookies are used.",
  },
  {
    type: "paragraph",
    text: "You can control cookies through your browser settings. Disabling cookies may affect some booking functionality.",
  },
  { type: "heading", text: "8. Returns & exchanges" },
  { type: "divider" },
  {
    type: "paragraph",
    text: "We understand that plans can change. Refunds and rescheduling depend on the type of workshop or event booked.",
  },
  {
    type: "paragraph",
    text: "For ticketed cozy workshops, refund requests must be made at least # days before the workshop date. After that window, tickets are generally non-refundable, but please reach out if something comes up. We may be able to offer a reschedule or credit depending on availability!",
  },
  {
    type: "paragraph",
    text: "For corporate workshops, private bookings, and larger events, cancellations or refund requests must be made at least 7 days before the event date. Cancellations made within 7 days of the event are non-refundable due to preparation time, materials, and scheduling.",
  },
  {
    type: "paragraph",
    text: "If you need to reschedule a corporate, private, or group event, please contact Diem as early as possible. Rescheduling can be discussed based on availability and the details of your booking.",
  },
];
