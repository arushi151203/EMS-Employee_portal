const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const messages = {
  reset: {
    subject: "Your password reset code",
    heading: "Reset your password",
    body: "Use the code below to reset your password. This code expires in 10 minutes.",
  },
  login: {
    subject: "Your sign-in code",
    heading: "Sign in to Nexus HR",
    body: "Use the code below to sign in to your account. This code expires in 10 minutes.",
  },
};

async function sendOtpEmail(toEmail, otpCode, purpose = "reset") {
  const content = messages[purpose] || messages.reset;

  await transporter.sendMail({
    from: `"Nexus HR" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: content.subject,
    html: `
      <div style="font-family: sans-serif; max-width: 420px; margin: auto;">
        <h2 style="color:#2563eb;">${content.heading}</h2>
        <p>${content.body}</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background: #f1f5f9; padding: 16px; text-align: center; border-radius: 8px; margin: 20px 0;">
          ${otpCode}
        </div>
        <p style="color: #64748b; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendOtpEmail };