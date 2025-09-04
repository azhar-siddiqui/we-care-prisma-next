import { ServerResponseType } from '@/@types/api-response';
import WeCareVerifyEmail from '@/components/email/VerificationEmail';
import { resend } from '@/lib/resend';
import { env } from './env';

export async function sendVerificationEmail(
  name: string,
  email: string,
  verifyCode: string,
): Promise<ServerResponseType<null>> {
  try {
    await resend.emails.send({
      from: env.RESEND_DOMAIN,
      to: email,
      subject: 'Your We Care OTP for Email Verification',
      react: WeCareVerifyEmail({ name, verificationCode: verifyCode }),
    });

    return {
      success: true,
      message: 'Verification email send successfully',
    };
  } catch (error) {
    console.log('Error while sending email:', error);
    return {
      success: false,
      message: 'Failed to send verification email',
    };
  }
}
