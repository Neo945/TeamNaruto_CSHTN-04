const nodemailer = require("nodemailer");

async function transport(to, subject, text) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "learnit80@gmail.com",
      pass: "Letslearn1",
    },
  });
  // eslint-disable-next-line no-return-await
  return await transporter.sendMail({
    from: "learnit80@gmail.com",
    to: `${to}`,
    subject: `${subject}`,
    html: `${text}`,
  });
}
module.exports = transport;
