"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Replace this with your own Formspree endpoint (see README.md — takes ~2
// minutes to set up, free tier is plenty for a single lot). Once set, every
// submission emails you directly with no server or database to maintain.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/https://formspree.io/f/mbgrrrvo";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefillVehicle = searchParams.get("vehicle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: prefillVehicle ? `I'm interested in the ${prefillVehicle}.` : "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Name and phone are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setError("Something went wrong sending your message. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-8 gap-3 font-body">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brandOrange">
          <Check size={24} color="#fff" strokeWidth={3} />
        </div>
        <p className="font-semibold text-navy900">Message sent.</p>
        <p className="text-sm text-muted">We'll be in touch within one business day.</p>
        <button onClick={() => setSubmitted(false)} className="text-sm font-semibold underline mt-2 focus-ring text-brandOrange">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-body">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy900">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-borderTan rounded-md px-3 py-2 text-sm focus-ring"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-navy900">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border border-borderTan rounded-md px-3 py-2 text-sm focus-ring"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-navy900">Email (optional)</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-borderTan rounded-md px-3 py-2 text-sm focus-ring"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-navy900">What are you looking for?</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="border border-borderTan rounded-md px-3 py-2 text-sm focus-ring"
        />
      </div>
      {error && <p className="text-sm text-[#B3261E]">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition focus-ring disabled:opacity-60 bg-brandOrange"
      >
        {submitting ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
