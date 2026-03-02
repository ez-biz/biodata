"use client";

import { useState } from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this would POST to an API route
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-paisley py-16">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-maroon-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-maroon-700/70 max-w-2xl mx-auto">
            Have a question, suggestion, or need help? We would love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="container px-4 py-16 max-w-4xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-maroon-900 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-maroon-900 mb-1">
                  Email
                </h3>
                <a
                  href="mailto:support@biodatacraft.in"
                  className="text-maroon-700 hover:underline"
                >
                  support@biodatacraft.in
                </a>
              </div>
              <div>
                <h3 className="font-display font-semibold text-maroon-900 mb-1">
                  Support Hours
                </h3>
                <p className="text-maroon-700/70">
                  Monday to Saturday, 10:00 AM - 7:00 PM IST
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-maroon-900 mb-1">
                  Response Time
                </h3>
                <p className="text-maroon-700/70">
                  We typically respond within 24 hours on business days.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-maroon-900 mb-1">
                  Address
                </h3>
                <p className="text-maroon-700/70">
                  BiodataCraft
                  <br />
                  Bengaluru, Karnataka
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-display text-2xl font-bold text-maroon-900 mb-6">
              Send a Message
            </h2>
            {submitted ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                <div className="text-3xl mb-3">&#10003;</div>
                <h3 className="font-display text-lg font-bold text-green-800 mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-green-700/80">
                  Thank you for reaching out. We will get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-maroon-900 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-maroon-200 bg-white px-4 py-3 text-sm text-maroon-900 placeholder:text-maroon-300 focus:border-maroon-400 focus:outline-none focus:ring-2 focus:ring-maroon-100 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-maroon-900 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-maroon-200 bg-white px-4 py-3 text-sm text-maroon-900 placeholder:text-maroon-300 focus:border-maroon-400 focus:outline-none focus:ring-2 focus:ring-maroon-100 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-maroon-900 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-xl border border-maroon-200 bg-white px-4 py-3 text-sm text-maroon-900 placeholder:text-maroon-300 focus:border-maroon-400 focus:outline-none focus:ring-2 focus:ring-maroon-100 transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-maroon-800 px-6 py-3 text-sm font-semibold text-gold-100 hover:bg-maroon-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
