import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const captchaSecret = process.env.GOOGLE_RECAPTCHA_SECRET

    if (!captchaSecret) {
        return NextResponse.json({
            success: false,
            error: 'reCAPTCHA secret not configured'
        })
    }

    try {
        const postData = await request.json()
        const { gRecaptchaToken } = postData

        if (!gRecaptchaToken) {
            return NextResponse.json({
                success: false,
                error: 'No reCAPTCHA token provided'
            })
        }

        const formData = `secret=${captchaSecret}&response=${gRecaptchaToken}`

        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()

        if (data?.success && data?.score > 0.5) {
            console.log("reCAPTCHA score:", data.score);

            return NextResponse.json({
                success: true,
                score: data.score,
            });
        } else {
            console.log("reCAPTCHA verification failed:", data);
            return NextResponse.json({
                success: false,
                error: 'reCAPTCHA verification failed',
                details: data
            });
        }

    } catch (error) {
        console.error("reCAPTCHA verification error:", error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        })
    }
}