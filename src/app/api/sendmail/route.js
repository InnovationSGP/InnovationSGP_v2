import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/schemas/contact-form.schema";

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    const validationResult = contactFormSchema.safeParse({
      name,
      email,
      phone,
      subject,
      message,
    });

    if (!validationResult.success) {
      console.warn(
        "Validation failed:",
        validationResult.error.flatten().fieldErrors
      );
      return NextResponse.json(
        {
          message: "Validation failed.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({
        status: 400,
        message: "Missing required fields.",
      });
    }

    const smtpHost = process.env.SMTP_HOST || "mail.mijndomein.nl";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;

    const mailRecipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL || "kphoogendorp@gmail.com";
    const mailSenderName =
      process.env.SMTP_SENDER_NAME || "Website Contact Form";
    const mailSenderEmail = process.env.SMTP_SENDER_EMAIL || "info@passionforhealth.nl";

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPass ||
      !mailRecipient ||
      !mailSenderEmail
    ) {
      console.error("SMTP environment variables are not fully set.");
      return NextResponse.json(
        {
          message: "Server configuration error. Unable to send email.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const emailHtmlBody = `
    <p>You have a new contact form submission from <strong>${name}</strong>:</p>
    <hr>
    <p><strong>Full Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

    <p><strong>Subject:</strong> ${subject}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: sans-serif; font-size: 14px;">${message}</pre>
    <hr>
    <p><small>This email was sent from the contact form.</small></p>
  `;

    const emailTextBody = `
    You have a new contact form submission from ${name}:
    --------------------------------------------------
    Full Name: ${name}
    Email: ${email}
    Phone: ${phone || "Not provided"}
 
    Subject: ${subject}
    --------------------------------------------------
    Message:
    ${message}
    --------------------------------------------------
    This email was sent from the contact form.
  `;

    await transporter.sendMail({
      from: `"${mailSenderName}" <${mailSenderEmail}>`,
      to: mailRecipient,
      subject: `New Contact: ${subject} (from ${name})`,
      replyTo: email,
      html: emailHtmlBody,
      text: emailTextBody,
    });

    return NextResponse.json({
      status: 200,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong. Please try again later.",
    });
  }
}
