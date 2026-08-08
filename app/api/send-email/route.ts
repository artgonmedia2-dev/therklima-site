import { NextResponse } from "next/server";
import { transporter, generateEmailHtml, EmailPayload } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const payload: EmailPayload = await req.json();

    if (!payload || !payload.email) {
      return NextResponse.json(
        { success: false, error: "L'adresse email est requise." },
        { status: 400 }
      );
    }

    const nomComplet = [payload.prenom, payload.nom].filter(Boolean).join(" ") || "Client";
    const typeSubjectLabel =
      payload.type === "contact"
        ? "Contact"
        : payload.type === "devis-electricite"
        ? "Devis Électricité"
        : payload.type === "devis-climatisation"
        ? "Devis Climatisation"
        : payload.type === "devis-tabs"
        ? "Devis Express"
        : "Devis";

    const subject =
      payload.subject ||
      payload.sujet ||
      `[Therklima Web] ${typeSubjectLabel} de ${nomComplet}`;

    const { html, text } = generateEmailHtml(payload);

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "contact@therklima.com";
    const fromAddress = process.env.SMTP_FROM || "Therklima <contact@therklima.com>";

    const attachments = payload.photos?.map((photo) => ({
      filename: photo.filename,
      content: photo.content.includes(";base64,")
        ? photo.content.split(";base64,").pop()!
        : photo.content,
      encoding: "base64",
      contentType: photo.contentType,
    }));

    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      replyTo: payload.email,
      subject,
      text,
      html,
      attachments: attachments && attachments.length > 0 ? attachments : undefined,
    });

    console.log("Email envoyé avec succès:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès",
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email SMTP:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erreur serveur lors de l'envoi de l'email.",
      },
      { status: 500 }
    );
  }
}
