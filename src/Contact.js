import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send message to JSON server
    const response = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message sent successfully!");
      setFormData({
        subject: "",
        email: "",
        message: "",
      });
    } else {
      alert("There was an error sending your message.");
    }
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="subject" className="contact-label">
          Subject:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="contact-input"
          placeholder="Enter the subject of your message"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email" className="contact-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="contact-input"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="message" className="contact-label">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          className="contact-textarea"
          placeholder="Write your message here"
          value={formData.message}
          onChange={handleInputChange}
          required
        ></textarea>

        <button type="submit" className="contact-submit">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
