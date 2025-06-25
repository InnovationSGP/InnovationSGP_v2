import emailjs from "@emailjs/browser";

// Interface for email data
export interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Initialize EmailJS with the public key
 */
export const initEmailJS = (): void => {
  if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }
};

/**
 * Send an email using EmailJS
 * @param data Email data to send
 * @returns Promise containing the result of the email sending operation
 */
export const sendEmail = async (data: EmailData) => {
  const templateParams = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || "Not provided",
    subject: data.subject,
    message: data.message,
  };

  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    templateParams,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
  );
};
