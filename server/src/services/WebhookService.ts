import { Service } from "@tsed/di";
const fetch = require('node-fetch');

interface InviteUserData {
  name: string;
  email: string;
  role: string;
  phone?: string;
}

@Service()
export class WebhookService {
  private readonly ZAPIER_WEBHOOK_URL = process.env.ZAP_INVITE_WEBHOOK;

  async sendInvite(data: InviteUserData) {
    if (!this.ZAPIER_WEBHOOK_URL) {
      throw new Error('Zapier webhook URL is not configured');
    }

    try {
      const response = await fetch(this.ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
          phone: data.phone,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Zapier webhook failed with status ${response.status}: ${errorText}`);
      }

      return { success: true, message: 'Invitation sent successfully' };
    } catch (error) {
      console.error('Error sending invite via Zapier:', error);
      throw new Error(`Failed to send invitation: ${error.message}`);
    }
  }
}
