import axios from "axios";
import { NodeMailerTypes } from "types";

const ZAPIER_WEBHOOK_URL =
  "https://hooks.zapier.com/hooks/catch/8338143/2j3d5rt/";

async function postToZapier(payload: Record<string, unknown>) {
  const response = await axios.post(ZAPIER_WEBHOOK_URL, payload);
  if (response.status !== 200) {
    throw new Error(`Failed to send webhook: ${response.statusText}`);
  }
  return "Email sent successfully";
}

export class NodemailerClient {
  ///
  public static async sendVerificationEmail({ title = "Email", email, code }: NodeMailerTypes) {
    return postToZapier({ type: "verification", title, email, code });
  }

  public static async sendCompleteRegistrationEmail({ email }: { email: string }) {
    return postToZapier({ type: "completeRegistration", email });
  }

  public static async sendEmailToPlanner({
    email,
    title,
    description,
    action
  }: {
    email: string;
    title: string;
    description: string;
    action: string;
  }) {
    return postToZapier({ type: "planner", email, title, description, action });
  }
}
