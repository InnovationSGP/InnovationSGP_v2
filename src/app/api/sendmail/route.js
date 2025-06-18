import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// all categories
export async function POST(req) {
    const {
        email,
    } = await req.json()

    const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_HOST,
        port: process.env.SMTP_PORT || 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.APP_PASSWORD_FOR_EMAIL,
        },
    });

    const template = `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <p>${email}</p>
        </div>
    `

    try {
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: `${process.env.NEXT_PUBLIC_EMAIL}, ${email}`,
            subject: `Email from InnovationSGP`,
            html: template
        });
        return new NextResponse(
            JSON.stringify({
                status: "ok",
                message: "Email sent",
            }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}