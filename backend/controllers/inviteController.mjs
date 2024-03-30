import nodemailer from 'nodemailer';
import DebateRoom from '../models/DebateRoomModel.mjs';

// Function to send invitation email
export const sendInvitationEmail = async (req, res) => {
  const { email, chatboxLink, team1, team2, topic, participants } = req.body; // Extract chat room details from request body

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

    // Construct the HTML content of the email with chat room details
    const htmlContent = `
      <p>You are invited to join the chat room:</p>
      <p>Team 1: ${team1}</p>
      <p>Team 2: ${team2}</p>
      <p>Topic: ${topic}</p>
      <p>Participants:</p>
      <ul>
        ${participants.map(participant => `<li>${participant.name}</li>`).join('')}
      </ul>
      <p>Click <a href="${chatboxLink}">here</a> to join.</p>
    `;

    // Send invitation email
    const info = await transporter.sendMail({
      from: '"DebateBox" <sra1kumar218@gmail.com>',
      to: email,
      subject: 'Invitation to ChatBox',
      html: htmlContent,
    });

    console.log('Invitation email sent:', info.messageId);
    let roomInfo = new DebateRoom({
      topic: topic,
      team1: team1,
      team2: team2,
      participants: participants,
      uniqueLink: chatboxLink.split('/')[chatboxLink.split('/').length - 1],
    });
    await roomInfo.save();
    res.json({ message: 'Invitation email sent successfully' });
  } catch (error) {
    console.error('Error sending invitation email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
