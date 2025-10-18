// JS/script.js - contact form submit to Node API
async function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const phoneEl = document.getElementById('phone');
  const phone = phoneEl ? phoneEl.value.trim() : '';

  const status = document.getElementById('formStatus');
  if (!name || !email || !message) {
    status.textContent = 'Please fill all required fields.';
    return;
  }
  status.textContent = 'Sending...';

  try {
    // If frontend and API are on same host behind nginx, use relative path "/api/contact"
    // Replace with full URL if API uses different host/IP: e.g. "http://EC2_PUBLIC_IP/api/contact"
    //const API_URL = (window.API_URL && window.API_URL.length) ? window.API_URL : '/api/contact';
    const API_URL = '/api/contact';
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Server error');

    status.textContent = 'Message sent — we will contact you within 1 business day.';
    document.getElementById('contactForm').reset();
  } catch (err) {
    console.error(err);
    status.textContent = 'Failed to send message. Try again later.';
  }
}
