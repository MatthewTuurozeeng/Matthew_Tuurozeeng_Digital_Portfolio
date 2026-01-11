import { sendEmail } from './EmailService';
import dotenv from 'dotenv';

dotenv.config();

const testEmail = async () => {
  try {
    console.log('Testing email configuration...');
    console.log('Email Host:', process.env.EMAIL_HOST);
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Port:', process.env.EMAIL_PORT);

    await sendEmail({
      to: process.env.EMAIL_USER!,
      subject: 'Test Email from Portfolio',
      html: '<h1>Test Successful!</h1><p>Your email configuration is working correctly.</p>',
    });

    console.log('✅ Test email sent successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test email failed:', error);
    process.exit(1);
  }
};

testEmail();