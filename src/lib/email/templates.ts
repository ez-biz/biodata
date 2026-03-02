const MAROON = "#831843";
const GOLD = "#D4A537";
const LIGHT_BG = "#FFF7ED";
const TEXT_DARK = "#1F2937";
const TEXT_MUTED = "#6B7280";
const BASE_URL = process.env.NEXTAUTH_URL || "https://biodatacraft.in";

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${MAROON}, #9D174D); padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: ${GOLD}; letter-spacing: 0.5px;">BiodataCraft</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #FDE8E8; letter-spacing: 1px;">Beautiful Indian Marriage Biodatas</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: ${LIGHT_BG}; padding: 24px 32px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: ${TEXT_MUTED};">
                &copy; ${new Date().getFullYear()} BiodataCraft. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 12px; color: ${TEXT_MUTED};">
                <a href="${BASE_URL}/unsubscribe" style="color: ${MAROON}; text-decoration: underline;">Unsubscribe</a>
                &nbsp;&middot;&nbsp;
                <a href="${BASE_URL}/privacy" style="color: ${MAROON}; text-decoration: underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(text: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 24px auto;">
  <tr>
    <td style="background-color: ${MAROON}; border-radius: 8px;">
      <a href="${href}" style="display: inline-block; padding: 14px 32px; color: ${GOLD}; font-size: 16px; font-weight: 600; text-decoration: none; letter-spacing: 0.3px;">${text}</a>
    </td>
  </tr>
</table>`;
}

export function welcomeEmail(name: string): string {
  const firstName = name.split(" ")[0];
  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 22px; color: ${MAROON};">Welcome, ${firstName}! 🙏</h2>
    <p style="margin: 0 0 16px 0; font-size: 15px; color: ${TEXT_DARK}; line-height: 1.6;">
      Thank you for joining <strong>BiodataCraft</strong> — the easiest way to create a beautiful Indian marriage biodata.
    </p>
    <p style="margin: 0 0 8px 0; font-size: 15px; color: ${TEXT_DARK}; font-weight: 600;">Here's how to get started:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 16px 0; width: 100%;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6;">
          <span style="display: inline-block; width: 28px; height: 28px; background-color: ${MAROON}; color: ${GOLD}; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; margin-right: 12px; vertical-align: middle;">1</span>
          <span style="font-size: 15px; color: ${TEXT_DARK}; vertical-align: middle;">Fill in your personal details in our guided form</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6;">
          <span style="display: inline-block; width: 28px; height: 28px; background-color: ${MAROON}; color: ${GOLD}; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; margin-right: 12px; vertical-align: middle;">2</span>
          <span style="font-size: 15px; color: ${TEXT_DARK}; vertical-align: middle;">Choose from 8+ professionally designed templates</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <span style="display: inline-block; width: 28px; height: 28px; background-color: ${MAROON}; color: ${GOLD}; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; margin-right: 12px; vertical-align: middle;">3</span>
          <span style="font-size: 15px; color: ${TEXT_DARK}; vertical-align: middle;">Download your biodata as a high-quality PDF</span>
        </td>
      </tr>
    </table>
    ${ctaButton("Create Your Biodata", `${BASE_URL}/create`)}
    <p style="margin: 0; font-size: 14px; color: ${TEXT_MUTED}; text-align: center;">
      3 templates are completely free — no credit card needed.
    </p>
  `;
  return emailWrapper(content);
}

export function paymentReceiptEmail(
  name: string,
  plan: string,
  amount: number
): string {
  const firstName = name.split(" ")[0];
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
  const date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 22px; color: ${MAROON};">Payment Confirmed!</h2>
    <p style="margin: 0 0 20px 0; font-size: 15px; color: ${TEXT_DARK}; line-height: 1.6;">
      Hi ${firstName}, your payment has been successfully processed. Here are your receipt details:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: ${LIGHT_BG}; border-radius: 8px; border: 1px solid #E5E7EB; margin: 0 0 24px 0;">
      <tr>
        <td style="padding: 16px 20px; border-bottom: 1px solid #E5E7EB;">
          <span style="font-size: 13px; color: ${TEXT_MUTED}; text-transform: uppercase; letter-spacing: 0.5px;">Plan</span><br />
          <span style="font-size: 16px; color: ${TEXT_DARK}; font-weight: 600;">${plan}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px 20px; border-bottom: 1px solid #E5E7EB;">
          <span style="font-size: 13px; color: ${TEXT_MUTED}; text-transform: uppercase; letter-spacing: 0.5px;">Amount Paid</span><br />
          <span style="font-size: 20px; color: ${MAROON}; font-weight: 700;">${formattedAmount}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px 20px; border-bottom: 1px solid #E5E7EB;">
          <span style="font-size: 13px; color: ${TEXT_MUTED}; text-transform: uppercase; letter-spacing: 0.5px;">Date</span><br />
          <span style="font-size: 16px; color: ${TEXT_DARK};">${date}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 16px 20px;">
          <span style="font-size: 13px; color: ${TEXT_MUTED}; text-transform: uppercase; letter-spacing: 0.5px;">Valid For</span><br />
          <span style="font-size: 16px; color: ${TEXT_DARK};">1 Year</span>
        </td>
      </tr>
    </table>
    ${ctaButton("Go to Dashboard", `${BASE_URL}/dashboard`)}
    <p style="margin: 0; font-size: 14px; color: ${TEXT_MUTED}; text-align: center;">
      Thank you for choosing BiodataCraft. Your premium features are now active!
    </p>
  `;
  return emailWrapper(content);
}

export function biodataViewedEmail(
  name: string,
  biodataName: string,
  viewCount: number
): string {
  const firstName = name.split(" ")[0];

  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 22px; color: ${MAROON};">Your Biodata is Getting Noticed!</h2>
    <p style="margin: 0 0 20px 0; font-size: 15px; color: ${TEXT_DARK}; line-height: 1.6;">
      Hi ${firstName}, great news! Your shared biodata has reached a milestone.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; text-align: center; margin: 0 0 24px 0;">
      <tr>
        <td style="padding: 24px; background-color: ${LIGHT_BG}; border-radius: 8px; border: 1px solid #E5E7EB;">
          <p style="margin: 0 0 4px 0; font-size: 14px; color: ${TEXT_MUTED}; text-transform: uppercase; letter-spacing: 0.5px;">Total Views</p>
          <p style="margin: 0 0 12px 0; font-size: 40px; font-weight: 700; color: ${MAROON};">${viewCount}</p>
          <p style="margin: 0; font-size: 15px; color: ${TEXT_DARK};">
            <strong>${biodataName}</strong>
          </p>
        </td>
      </tr>
    </table>
    <p style="margin: 0 0 8px 0; font-size: 15px; color: ${TEXT_DARK}; line-height: 1.6;">
      People are viewing your biodata — make sure it's looking its best with a premium template!
    </p>
    ${ctaButton("View Analytics", `${BASE_URL}/dashboard`)}
  `;
  return emailWrapper(content);
}
