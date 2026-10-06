export default function ContactPage() {
  return (
    <main className="page">
      <h1>Contact Us!</h1>

      <section className="contact-info">
        <h2>Address</h2>
        <dd>
          123 Main Street
          <br />
          San Luis Obispo, CA 93401
        </dd>

        <h2>Email</h2>
        <dd>
          <a href="mailto:hello@krispicafe.com">hello@krispicafe.com</a>
        </dd>

        <h2>Hours</h2>
        <dd>
          Mon–Thu: 11am – 9pm
          <br />
          Fri–Sat: 11am – 11pm
          <br />
          Sun: Closed
        </dd>
      </section>

      <h2>Send us a message</h2>
      <form id="contact-form" className="form">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-field">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows={4} required />
        </div>

        <input type="submit" value="Submit" />
      </form>

      <footer className="footer">© 2026 Krispi Cafe | All Rights Reserved</footer>
    </main>
  );
}
