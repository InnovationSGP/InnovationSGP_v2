"use client";

import Image from "next/image";
import React, { useState } from "react";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email) return alert("Please enter an email.");

    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmail("");
        setLoading(false);
        setMessage("Thank you for subscribing!");
      } else {
        setLoading(false);
        console.error("Error:", data.error);
        setMessage("Failed to send email.");
      }
    } catch (err) {
      console.error("Send error:", err);
      setLoading(false);
      setMessage("Failed to send email.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-[11px] pl-6 flex items-center w-full mt-4 rounded-l-[4px] rounded-r-[30px]"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full outline-none border-none"
          required
        />
        <button type="submit" className="cursor-pointer" disabled={loading}>
          <Image
            src="/svg/email-button.svg"
            alt="Send"
            width={38}
            height={38}
          />
        </button>
      </form>
      {message && (
        <p className="text-green-500 mt-2 text-sm">{message}</p>
      )}
    </>
  );
};

export default EmailForm;
