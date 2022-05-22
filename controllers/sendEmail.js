const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'gabriel.wolf@ethereal.email',
        pass: 'jkm1Q5WdNuGzpNfBd2'
    }
  });

  let info = await transporter.sendMail({
    from: '"Ben Chude" <benchude@gmail.com>',
    to: 'bar@example.com',
    subject: 'Hello',
    // text: 'Sending emails with Node.js'
    html: '<h2>Sending emails with Node.js</h2>'
  })

  res.json(info)
}

module.exports = sendEmail