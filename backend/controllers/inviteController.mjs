import nodemailer from 'nodemailer';

// Function to send invitation email
export const sendInvitationEmail = async (req, res) => {
  const { email, chatboxLink } = req.body;

  try {
    // Create transporter with SMTP options
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sra1kumar218@gmail.com', // your email
      pass: 'zhkidteaabeucsit', // your App Password
    },
  });
  
    // Send invitation email
    const info = await transporter.sendMail({
        from: '"DebateBox" <sra1kumar218@gmail.com>',
      to: email,
      subject: 'Invitation to ChatBox',
      text: `You are invited to join the chat! Click on the following link: ${chatboxLink}`,
      html: `<p>You are invited to join the chat! Click <a href="${chatboxLink}">here</a> to join.</p>`,
    });

    console.log('Invitation email sent:', info.messageId);
    res.json({ message: 'Invitation email sent successfully' });
  } catch (error) {
    console.error('Error sending invitation email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
