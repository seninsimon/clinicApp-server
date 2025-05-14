import nodemailer from 'nodemailer';
import { IEmailService } from '../../application/services/IEmailService';

export class NodeMailerService implements IEmailService {
  async sendEmail(to: string, content: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL || "seninsimon002@gmail.com",
        pass: process.env.PASSWORD || "ayghazgxuqybncco",
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL || "seninsimon002@gmail.com",
      to,
      subject: 'OTP Verification',
      text: content,
    });
  }
}
