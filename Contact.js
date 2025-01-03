import React, { useState } from "react";

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    // Send message to json-server
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
      setIsModalOpen(false); // Close the modal after sending the message
    } else {
      alert("There was an error sending your message.");
    }
  };

  return (
    <div className="contact">
      <button onClick={() => setIsModalOpen(true)} className="contact-button">
        Contact Us
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              onClick={() => setIsModalOpen(false)}
              className="close-button"
            >
              &times;
            </button>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject of your message"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
