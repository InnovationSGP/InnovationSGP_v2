import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: any) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      recaptchaToken,
    } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Missing required fields",
        }),
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Invalid email format",
        }),
        { status: 400 }
      );
    }

    // Optional: Verify reCAPTCHA token
    // if (recaptchaToken && process.env.GOOGLE_RECAPTCHA_SECRET) {
    //     const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: `secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${recaptchaToken}`
    //     });
    //
    //     const recaptchaData = await recaptchaResponse.json();
    //     if (!recaptchaData.success) {
    //         return new NextResponse(
    //             JSON.stringify({
    //                 status: "error",
    //                 message: "reCAPTCHA verification failed",
    //             }),
    //             { status: 400 }
    //         );
    //     }
    // }

    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_EMAIL_HOST as string,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL as string,
        pass: process.env.APP_PASSWORD_FOR_EMAIL as string,
      },
    });

    // Email template for admin notification
    const adminTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #555;">Name:</strong> 
                        <span style="color: #333;">${firstName} ${lastName}</span>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #555;">Email:</strong> 
                        <span style="color: #333;">${email}</span>
                    </div>
                    
                    ${
                      phone
                        ? `
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #555;">Phone:</strong> 
                        <span style="color: #333;">${phone}</span>
                    </div>
                    `
                        : ""
                    }
                    
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #555;">Subject:</strong> 
                        <span style="color: #333;">${subject}</span>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <strong style="color: #555;">Message:</strong>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 5px; border-left: 4px solid #007bff;">
                            ${message.replace(/\n/g, "<br>")}
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                        <p>Submitted on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        `;

    // Email template for user confirmation
    const userTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        Thank You for Contacting Us!
                    </h2>
                    
                    <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
                        Dear ${firstName},
                    </p>
                    
                    <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
                        Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.
                    </p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745;">
                        <p style="margin: 0; color: #333;"><strong>Your message summary:</strong></p>
                        <p style="margin: 5px 0 0 0; color: #666;">Subject: ${subject}</p>
                    </div>
                    
                    <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
                        If you have any urgent questions, please don't hesitate to contact us directly.
                    </p>
                    
                    <p style="color: #333; line-height: 1.6;">
                        Best regards,<br>
                        <strong>InnovationSGP Team</strong>
                    </p>
                    
                    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                        <p>This is an automated confirmation email. Please do not reply to this email.</p>
                    </div>
                </div>
            </div>
        `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: process.env.NEXT_SALES_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission - ${subject}`,
      html: adminTemplate,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.NEXT_SALES_EMAIL,
      to: email,
      subject: "Thank you for contacting InnovationSGP",
      html: userTemplate,
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        message:
          "Message sent successfully! We'll get back to you within 24 hours.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Failed to send message. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
