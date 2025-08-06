import { MailService } from '@sendgrid/mail';
import type { Feedback } from '@shared/schema';

// Email service disabled - feedback will be logged instead
const mailService = new MailService();

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  // Email service disabled - just log the email content
  console.log('📧 Email notification (email service disabled):', {
    to: params.to,
    from: params.from,
    subject: params.subject,
    content: params.text || params.html
  });
  return true;
}

export async function sendFeedbackNotification(feedback: Feedback): Promise<boolean> {
  // Send feedback to the specified creator email
  const creatorEmail = "workfree613@gmail.com";
  const fromEmail = process.env.FROM_EMAIL || "noreply@replit.com";
  
  let subject = "";
  let feedbackTypeText = "";
  let contentText = "";
  
  switch (feedback.type) {
    case 'positive':
      subject = "✅ Positive Feedback Received - Pocket Lawyer";
      feedbackTypeText = "Positive (👍 Thumbs Up)";
      contentText = "User gave positive feedback!";
      break;
    case 'negative':
      subject = "⚠️ Negative Feedback Received - Pocket Lawyer";
      feedbackTypeText = "Negative (👎 Thumbs Down)";
      contentText = "User reported issues that need attention.";
      break;
    case 'text':
      subject = "💬 Detailed Feedback Received - Pocket Lawyer";
      feedbackTypeText = "Text Feedback";
      contentText = feedback.content || "No content provided";
      break;
  }
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Pocket Lawyer</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">AI Legal Assistant</p>
      </div>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 10px; border-left: 4px solid #3b82f6;">
        <h2 style="color: #1e293b; margin-top: 0;">New Feedback Received</h2>
        
        <div style="margin: 20px 0;">
          <strong style="color: #475569;">Feedback Type:</strong>
          <span style="color: #1e293b; margin-left: 10px;">${feedbackTypeText}</span>
        </div>
        
        <div style="margin: 20px 0;">
          <strong style="color: #475569;">Timestamp:</strong>
          <span style="color: #1e293b; margin-left: 10px;">${new Date(feedback.timestamp).toLocaleString()}</span>
        </div>
        
        ${feedback.content ? `
        <div style="margin: 20px 0;">
          <strong style="color: #475569;">User Message:</strong>
          <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px; border: 1px solid #e2e8f0;">
            <p style="color: #1e293b; margin: 0; line-height: 1.6;">${feedback.content || ''}</p>
          </div>
        </div>
        ` : ''}
        
        ${feedback.userAgent ? `
        <div style="margin: 20px 0;">
          <strong style="color: #475569;">User Browser:</strong>
          <span style="color: #64748b; margin-left: 10px; font-size: 14px;">${feedback.userAgent || ''}</span>
        </div>
        ` : ''}
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 10px;">
        <p style="color: #64748b; margin: 0; font-size: 14px;">
          This feedback was submitted through the Pocket Lawyer application.
        </p>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">
          Feedback ID: #${feedback.id}
        </p>
      </div>
    </div>
  `;
  
  const textContent = `
New Feedback Received - Pocket Lawyer

Feedback Type: ${feedbackTypeText}
Timestamp: ${new Date(feedback.timestamp).toLocaleString()}
${feedback.content ? `\nUser Message:\n${feedback.content}` : ''}
${feedback.userAgent ? `\nUser Browser: ${feedback.userAgent || ''}` : ''}

Feedback ID: #${feedback.id}
  `;
  
  return await sendEmail({
    to: creatorEmail,
    from: fromEmail,
    subject: subject,
    text: textContent,
    html: htmlContent,
  });
}