/**
 * Email Templates for Route Story Contact Form Submissions
 */

/**
 * Returns HTML for the confirmation email sent to the customer
 * @param {string} name 
 * @param {string} destination 
 * @param {string} travelDate 
 * @returns {string} HTML content
 */
export function getCustomerEmailHtml(name, destination, travelDate) {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Journey with Route Story Begins</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f7f9fa;
      color: #2D3748;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border: 1px solid #e9ebef;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    .header {
      background-color: #030213;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 28px;
      margin: 0;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
      font-size: 15px;
    }
    .content h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      color: #030213;
      margin-top: 0;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .summary-card {
      background-color: #f8fafc;
      border-left: 3px solid #7A90A8;
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 4px 4px 0;
    }
    .summary-title {
      font-weight: 600;
      color: #7A90A8;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 10px;
    }
    .summary-item {
      margin-bottom: 8px;
      font-size: 14px;
    }
    .summary-item:last-child {
      margin-bottom: 0;
    }
    .summary-label {
      font-weight: 600;
      color: #4a5568;
    }
    .footer {
      background-color: #f8fafc;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      color: #718096;
      border-top: 1px solid #e9ebef;
    }
    .footer p {
      margin: 0 0 10px 0;
    }
    .footer a {
      color: #7A90A8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Route Story</h1>
    </div>
    <div class="content">
      <h2>Your Story Begins Here</h2>
      <p>Hello ${name},</p>
      <p>Thank you for reaching out to Route Story. We are thrilled at the prospect of helping you design your next custom journey.</p>
      <p>Our travel curation specialists have received your inquiry and are already brainstorming options to capture the perfect experiences, sights, and feelings for your trip.</p>
      
      <div class="summary-card">
        <div class="summary-title">Journey Details</div>
        ${destination ? `<div class="summary-item"><span class="summary-label">Preferred Destination:</span> ${destination}</div>` : ''}
        ${travelDate ? `<div class="summary-item"><span class="summary-label">Intended Travel Date:</span> ${travelDate}</div>` : ''}
      </div>

      <p><strong>What happens next?</strong></p>
      <p>We will review your detailed message and contact you within the next 24 hours to schedule a consultation call or share an initial customized itinerary outline.</p>
      <p>If you prefer to connect with us immediately, you can also reach us via WhatsApp or reply directly to this email.</p>
      <p>Warm regards,<br><strong>Route Story Team</strong></p>
    </div>
    <div class="footer">
      <p>&copy; ${currentYear} Route Story. All rights reserved.</p>
      <p>Crafting Unforgettable Journeys Across India.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Returns HTML for the enquiry details email sent to the admin
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @param {string} destination 
 * @param {string} travelDate 
 * @param {string} message 
 * @returns {string} HTML content
 */
export function getAdminEmailHtml(name, email, phone, destination, travelDate, message) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Journey Enquiry</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f7f9fa;
      color: #2D3748;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border: 1px solid #e9ebef;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    .header {
      background-color: #030213;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 20px;
      margin: 0;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
      font-size: 15px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      margin-bottom: 25px;
    }
    .details-table th, .details-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }
    .details-table th {
      background-color: #f8fafc;
      width: 35%;
      font-weight: 600;
      color: #4a5568;
    }
    .details-table td {
      color: #2d3748;
    }
    .message-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 15px;
      font-style: italic;
      white-space: pre-line;
      color: #4a5568;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #718096;
      border-top: 1px solid #e9ebef;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Journey Enquiry</h1>
    </div>
    <div class="content">
      <p>Hello Admin,</p>
      <p>A new customer has submitted a journey enquiry form on the website. Here are the details:</p>
      
      <table class="details-table">
        <tr>
          <th>Customer Name</th>
          <td>${name}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <th>Phone Number</th>
          <td>${phone || "N/A"}</td>
        </tr>
        <tr>
          <th>Destination</th>
          <td>${destination || "N/A"}</td>
        </tr>
        <tr>
          <th>Travel Date</th>
          <td>${travelDate || "N/A"}</td>
        </tr>
      </table>

      <h3>Customer Story / Message:</h3>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">
      <p>This is an automated notification from Route Story website.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Returns HTML for the review confirmation email sent to the customer
 * @param {string} author 
 * @param {number} rating 
 * @param {string} quote 
 * @param {string} journey 
 * @returns {string} HTML content
 */
export function getCustomerReviewEmailHtml(author, rating, quote, journey) {
  const currentYear = new Date().getFullYear();
  let stars = "";
  for (let i = 0; i < (rating || 5); i++) {
    stars += "★";
  }
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Sharing Your Route Story</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f7f9fa;
      color: #2D3748;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border: 1px solid #e9ebef;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    .header {
      background-color: #030213;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 28px;
      margin: 0;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
      font-size: 15px;
    }
    .content h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      color: #030213;
      margin-top: 0;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .review-card {
      background-color: #f8fafc;
      border-left: 3px solid #7A90A8;
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 4px 4px 0;
    }
    .stars {
      color: #FFC107;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .quote {
      font-style: italic;
      color: #4a5568;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    .journey {
      font-size: 12px;
      color: #7A90A8;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 600;
    }
    .footer {
      background-color: #f8fafc;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      color: #718096;
      border-top: 1px solid #e9ebef;
    }
    .footer p {
      margin: 0 0 10px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Route Story</h1>
    </div>
    <div class="content">
      <h2>Thank You for Your Review!</h2>
      <p>Hello ${author},</p>
      <p>We are so grateful that you took a moment to share your travel story with Route Story. Reviews like yours inspire us to keep designing outstanding, customized journeys across India.</p>
      <p>Here is a copy of what you shared on our website:</p>
      
      <div class="review-card">
        <div class="stars">${stars}</div>
        <div class="quote">"${quote}"</div>
        ${journey ? `<div class="journey">${journey}</div>` : ''}
      </div>

      <p>Your review is now live on our Experiences page, helping other fellow travelers plan their dream itineraries.</p>
      <p>We look forward to creating many more beautiful stories with you on your future adventures!</p>
      <p>Warm regards,<br><strong>Route Story Team</strong></p>
    </div>
    <div class="footer">
      <p>&copy; ${currentYear} Route Story. All rights reserved.</p>
      <p>Crafting Unforgettable Journeys Across India.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Returns HTML for the review notification email sent to the admin
 * @param {string} author 
 * @param {string} email 
 * @param {string} location 
 * @param {string} journey 
 * @param {string} quote 
 * @param {number} rating 
 * @returns {string} HTML content
 */
export function getAdminReviewEmailHtml(author, email, location, journey, quote, rating) {
  let stars = "";
  for (let i = 0; i < (rating || 5); i++) {
    stars += "★";
  }
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Review Submitted - Route Story</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f7f9fa;
      color: #2D3748;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border: 1px solid #e9ebef;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    .header {
      background-color: #030213;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 20px;
      margin: 0;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
      font-size: 15px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      margin-bottom: 25px;
    }
    .details-table th, .details-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }
    .details-table th {
      background-color: #f8fafc;
      width: 35%;
      font-weight: 600;
      color: #4a5568;
    }
    .details-table td {
      color: #2d3748;
    }
    .quote-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 15px;
      font-style: italic;
      color: #4a5568;
      white-space: pre-line;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #718096;
      border-top: 1px solid #e9ebef;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Review Submitted</h1>
    </div>
    <div class="content">
      <p>Hello Admin,</p>
      <p>A customer has submitted a new travel review. Here are the details:</p>
      
      <table class="details-table">
        <tr>
          <th>Author Name</th>
          <td>${author}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <th>Location</th>
          <td>${location || "N/A"}</td>
        </tr>
        <tr>
          <th>Journey / Circuit</th>
          <td>${journey || "N/A"}</td>
        </tr>
        <tr>
          <th>Rating</th>
          <td style="color: #FFC107; font-size: 18px;">${stars} (${rating || 5}/5)</td>
        </tr>
      </table>

      <h3>Customer Story / Review Quote:</h3>
      <div class="quote-box">"${quote}"</div>
    </div>
    <div class="footer">
      <p>This is an automated review notification from Route Story website.</p>
    </div>
  </div>
</body>
</html>`;
}
