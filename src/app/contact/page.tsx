"use client";
import Banner from "@/components/banner";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { EmailData, initEmailJS, sendEmail } from "@/services/emailService";

const parseYoastValue = (val: any) => {
  if (typeof val === "string") {
    const parts = val.split(":");
    return parseInt(parts.length > 1 ? parts[1] : parts[0], 10);
  } else if (typeof val === "number") {
    return val;
  }
  return -1;
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    initEmailJS();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using our email service
      const result = await sendEmail({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.text === "OK") {
        setShowSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        toast.success(
          "Message sent successfully! We'll get back to you within 24 hours.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        setTimeout(() => setShowSuccess(false), 10000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: keyof FormData) => `
        w-full px-5 py-4 border-2 rounded-xl text-base transition-all duration-300 bg-gray-50
        focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-lg
        ${
          errors[fieldName]
            ? "border-red-400 focus:border-red-400 focus:shadow-red-100"
            : "border-gray-200 focus:border-blue-400 focus:shadow-sky-100"
        }
    `;

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Contact Us"
        headingText="Lets Get Started"
        description="Talk to us today"
      />

      <div className="min-h-screen p-5 gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-20 h-20 bg-white/10 rounded-full top-1/4 left-1/12 animate-pulse"></div>
          <div className="absolute w-32 h-32 bg-white/5 rounded-full top-3/5 right-1/12 animate-pulse delay-1000"></div>
          <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-1/4 left-1/5 animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto">
          <div className="flex justify-center items-center min-h-screen py-10">
            <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/30">
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                  Contact Us
                </h1>
                <p className="text-gray-600 text-lg">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>
              </div>

              {showSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields remain the same */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 font-semibold text-gray-700 text-sm"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClasses("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 font-semibold text-gray-700 text-sm"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClasses("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-semibold text-gray-700 text-sm"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 font-semibold text-gray-700 text-sm"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses("phone")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 font-semibold text-gray-700 text-sm"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses("subject")}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 font-semibold text-gray-700 text-sm"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project or question..."
                    className={`${inputClasses(
                      "message"
                    )} resize-vertical min-h-[120px] font-sans`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white py-4 px-6 rounded-xl text-lg font-semibold 
                                     transition-all duration-300 hover:-translate-y-1 hover:shadow-xl 
                                     active:translate-y-0 flex items-center justify-center gap-3 
                                     relative overflow-hidden group
                                     ${
                                       isSubmitting
                                         ? "bg-gray-400 cursor-not-allowed"
                                         : "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700"
                                     }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
