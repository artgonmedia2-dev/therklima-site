import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== "false", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "contact@therklima.com",
    pass: process.env.SMTP_PASS || "Azzeddine92@",
  },
  tls: {
    rejectUnauthorized: false, // Prevents self-signed SSL errors if any
  },
});

export interface EmailPayload {
  type: "contact" | "devis" | "devis-electricite" | "devis-climatisation" | "devis-tabs";
  subject?: string;
  nom?: string;
  prenom?: string;
  email: string;
  telephone?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  sujet?: string;
  message?: string;
  details?: Record<string, any>;
  photos?: { filename: string; content: string; contentType: string }[];
}

export function generateEmailHtml(payload: EmailPayload): { html: string; text: string } {
  const nomComplet = [payload.prenom, payload.nom].filter(Boolean).join(" ") || "Client";
  const typeLabel =
    payload.type === "contact"
      ? "Formulaire de Contact"
      : payload.type === "devis"
      ? "Demande de Devis Général"
      : payload.type === "devis-electricite"
      ? "Demande de Devis Électricité"
      : payload.type === "devis-climatisation"
      ? "Demande de Devis Climatisation"
      : "Demande de Devis Express / Urgence";

  const detailsRows = payload.details
    ? Object.entries(payload.details)
        .filter(([_, value]) => value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0))
        .map(([key, value]) => {
          const formattedValue = Array.isArray(value) ? value.join(", ") : String(value);
          const formattedKey = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
          return `
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 35%;">${formattedKey}</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${formattedValue}</td>
            </tr>
          `;
        })
        .join("")
    : "";

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
        .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #0f172a; padding: 24px 30px; text-align: center; border-bottom: 3px solid #0da2e1; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
        .header p { color: #0da2e1; margin: 6px 0 0 0; font-size: 14px; font-weight: 500; }
        .badge { display: inline-block; background: #e6f6fc; color: #0da2e1; font-weight: 600; font-size: 13px; padding: 4px 12px; border-radius: 9999px; margin-top: 10px; }
        .content { padding: 30px; }
        .section-title { font-size: 16px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #0da2e1; padding-bottom: 6px; margin-top: 24px; margin-bottom: 14px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
        .message-box { background: #f1f5f9; border-left: 4px solid #0da2e1; padding: 16px; border-radius: 4px; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 10px; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>THERKLIMA</h1>
          <p>Nouvelle Demande Client</p>
          <span class="badge">${typeLabel}</span>
        </div>
        <div class="content">
          <div class="section-title">Coordonnées du client</div>
          <table>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 35%;">Nom / Prénom</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${nomComplet}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Email</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0da2e1;"><a href="mailto:${payload.email}" style="color: #0da2e1; text-decoration: none;">${payload.email}</a></td>
            </tr>
            ${payload.telephone ? `
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Téléphone</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;"><a href="tel:${payload.telephone}" style="color: #0f172a; text-decoration: none;">${payload.telephone}</a></td>
            </tr>
            ` : ""}
            ${payload.adresse || payload.codePostal || payload.ville ? `
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Adresse</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${[payload.adresse, payload.codePostal, payload.ville].filter(Boolean).join(" ")}</td>
            </tr>
            ` : ""}
            ${payload.sujet ? `
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Sujet</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${payload.sujet}</td>
            </tr>
            ` : ""}
          </table>

          ${detailsRows ? `
            <div class="section-title">Détails du projet / besoin</div>
            <table>
              ${detailsRows}
            </table>
          ` : ""}

          ${payload.message ? `
            <div class="section-title">Message du client</div>
            <div class="message-box">${payload.message}</div>
          ` : ""}

          ${payload.photos && payload.photos.length > 0 ? `
            <div class="section-title">Photos jointes (${payload.photos.length})</div>
            <p style="font-size: 14px; color: #475569; margin-top: 6px;">
              📎 ${payload.photos.length} photo(s) transmise(s) en pièce(s) jointe(s) :<br/>
              <strong style="color: #0f172a;">${payload.photos.map((p) => p.filename).join(", ")}</strong>
            </p>
          ` : ""}
        </div>
        <div class="footer">
          Cet email a été envoyé automatiquement depuis le site web <strong>therklima.com</strong>.
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Nouvelle demande - THERKLIMA (${typeLabel})
---------------------------------------------------
Nom / Prénom: ${nomComplet}
Email: ${payload.email}
Téléphone: ${payload.telephone || "N/A"}
Adresse: ${[payload.adresse, payload.codePostal, payload.ville].filter(Boolean).join(" ") || "N/A"}
${payload.sujet ? `Sujet: ${payload.sujet}\n` : ""}${payload.message ? `Message: ${payload.message}\n` : ""}${payload.photos && payload.photos.length > 0 ? `Photos jointes: ${payload.photos.map((p) => p.filename).join(", ")}\n` : ""}
  `.trim();

  return { html, text };
}
