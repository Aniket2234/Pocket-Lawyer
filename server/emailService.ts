import { MailService } from '@sendgrid/mail';
import type { Feedback } from '@shared/schema';

// Email service for feedback notifications
const mailService = new MailService();

// Debug API key and set if available
if (process.env.SENDGRID_API_KEY) {
  const apiKey = process.env.SENDGRID_API_KEY.trim();
  console.log(`SendGrid API key format check: starts with "SG.": ${apiKey.startsWith('SG.')}, length: ${apiKey.length}`);
  mailService.setApiKey(apiKey);
} else {
  console.log('No SENDGRID_API_KEY found in environment variables');
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  // If no API key, just log the email content
  if (!process.env.SENDGRID_API_KEY) {
    console.log('📧 Email would be sent (API key needed):', {
      to: params.to,
      from: params.from,
      subject: params.subject
    });
    return false;
  }

  try {
    const emailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };
    
    if (params.text) emailData.text = params.text;
    if (params.html) emailData.html = params.html;
    
    await mailService.send(emailData);
    console.log(`✅ Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendFeedbackNotification(feedback: Feedback): Promise<boolean> {
  // Option 1: Console logging (always works)
  logFeedbackToConsole(feedback);
  
  // Option 2: Try IFTTT email webhook (works immediately)
  const iftttSuccess = await sendIFTTTEmail(feedback);
  if (iftttSuccess) {
    console.log('📧 Email notification sent to workfree613@gmail.com via IFTTT!');
    return true;
  }
  
  // Option 3: Try Formspree (simple form-to-email service)
  const formspreeSuccess = await sendToFormspree(feedback);
  if (formspreeSuccess) {
    return true;
  }
  
  // Option 3: Try simple mailto link (if no API key)
  if (!process.env.SENDGRID_API_KEY) {
    generateMailtoLink(feedback);
    return false;
  }
  
  // Option 4: SendGrid (if API key is available)
  const creatorEmail = "workfree613@gmail.com";
  const fromEmail = "workfree613@gmail.com";
  
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

// Alternative 1: Log feedback to console (always available)
function logFeedbackToConsole(feedback: Feedback) {
  console.log('\n' + '='.repeat(60));
  console.log('📧 NEW FEEDBACK RECEIVED');
  console.log('='.repeat(60));
  console.log(`🔸 Type: ${feedback.type === 'positive' ? '👍 Positive' : feedback.type === 'negative' ? '👎 Negative' : '💬 Text Feedback'}`);
  console.log(`🔸 Time: ${new Date(feedback.timestamp).toLocaleString()}`);
  console.log(`🔸 ID: #${feedback.id}`);
  
  if (feedback.content) {
    console.log(`🔸 Message:`);
    console.log(`   "${feedback.content}"`);
  }
  
  if (feedback.userAgent) {
    console.log(`🔸 Browser: ${feedback.userAgent}`);
  }
  
  console.log('='.repeat(60));
  console.log('💡 Alternative ways to receive emails:');
  console.log('   1. Check the console logs above');
  console.log('   2. Use webhook services like webhook.site');
  console.log('   3. Set up a simple email service like Formspree');
  console.log('   4. Use Gmail SMTP with app password');
  console.log('='.repeat(60) + '\n');
}

// Alternative 2: Generate mailto link for easy email creation
function generateMailtoLink(feedback: Feedback) {
  const subject = encodeURIComponent(`Feedback from Pocket Lawyer - ${feedback.type}`);
  const body = encodeURIComponent(`
New feedback received:

Type: ${feedback.type === 'positive' ? '👍 Positive' : feedback.type === 'negative' ? '👎 Negative' : '💬 Text Feedback'}
Time: ${new Date(feedback.timestamp).toLocaleString()}
ID: #${feedback.id}

${feedback.content ? `Message: ${feedback.content}` : ''}
${feedback.userAgent ? `Browser: ${feedback.userAgent}` : ''}
  `);
  
  const mailtoLink = `mailto:workfree613@gmail.com?subject=${subject}&body=${body}`;
  console.log('\n📧 Mailto link generated (copy and paste in browser):');
  console.log(mailtoLink);
  console.log('\n');
}

// Alternative 3: Send to webhook (simple HTTP POST)
export async function sendToWebhook(feedback: Feedback): Promise<boolean> {
  // You can use services like webhook.site, requestbin.com, or pipedream.com
  // Just replace this URL with your webhook URL
  const webhookUrl = "https://webhook.site/your-unique-url"; // Replace with your webhook URL
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        feedback: feedback,
        source: 'Pocket Lawyer App'
      })
    });
    
    if (response.ok) {
      console.log('✅ Feedback sent to webhook successfully');
      return true;
    } else {
      console.log('⚠️ Webhook failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('⚠️ Webhook error:', error);
    return false;
  }
}

// Alternative 4: Formspree.io (simple form-to-email service)
export async function sendToFormspree(feedback: Feedback): Promise<boolean> {
  // Using Formspree's legacy endpoint which works with email directly
  // This will work immediately without signup for basic testing
  const formspreeUrl = "https://formspree.io/workfree613@gmail.com";
  
  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: `Pocket Lawyer Feedback - ${feedback.type}`,
        message: `
New feedback received from Pocket Lawyer:

Type: ${feedback.type === 'positive' ? '👍 Positive' : feedback.type === 'negative' ? '👎 Negative' : '💬 Text Feedback'}
Time: ${new Date(feedback.timestamp).toLocaleString()}
Feedback ID: #${feedback.id}

${feedback.content ? `User Message: ${feedback.content}` : ''}
${feedback.userAgent ? `Browser: ${feedback.userAgent}` : ''}

This feedback was automatically sent from your Pocket Lawyer application.
        `,
        email: "noreply@pocketlawyer.app",
        _replyto: "workfree613@gmail.com"
      })
    });
    
    if (response.ok) {
      console.log('✅ Feedback sent via Formspree successfully');
      return true;
    } else {
      console.log('⚠️ Formspree failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('⚠️ Formspree error:', error);
    return false;
  }
}

// Alternative 5: EmailJS (client-side email service)
export async function sendToEmailJS(feedback: Feedback): Promise<boolean> {
  // EmailJS service - you need to set up EmailJS account
  const serviceId = "your_service_id";
  const templateId = "your_template_id";
  const publicKey = "your_public_key";
  
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: "workfree613@gmail.com",
          subject: `Pocket Lawyer Feedback - ${feedback.type}`,
          feedback_type: feedback.type,
          feedback_content: feedback.content || 'No content provided',
          timestamp: new Date(feedback.timestamp).toLocaleString(),
          feedback_id: feedback.id,
          user_agent: feedback.userAgent || 'Unknown'
        }
      })
    });
    
    if (response.ok) {
      console.log('✅ Feedback sent via EmailJS successfully');
      return true;
    } else {
      console.log('⚠️ EmailJS failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('⚠️ EmailJS error:', error);
    return false;
  }
}

// Simple IFTTT webhook that triggers email
export async function sendIFTTTEmail(feedback: Feedback): Promise<boolean> {
  // Using IFTTT webhook to send email - this works immediately
  const iftttUrl = "https://maker.ifttt.com/trigger/pocket_lawyer_feedback/with/key/bYQT7WS-rq9XkLfj-3_wGONt7E8bT3Z6xE5MQHtAqR4";
  
  try {
    const response = await fetch(iftttUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value1: `Pocket Lawyer Feedback: ${feedback.type}`,
        value2: feedback.content || 'No content provided',
        value3: `Time: ${new Date(feedback.timestamp).toLocaleString()}, ID: ${feedback.id}`
      })
    });
    
    if (response.ok) {
      console.log('✅ IFTTT webhook triggered - email should arrive at workfree613@gmail.com');
      return true;
    } else {
      console.log('⚠️ IFTTT webhook failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('⚠️ IFTTT webhook error:', error);
    return false;
  }
}