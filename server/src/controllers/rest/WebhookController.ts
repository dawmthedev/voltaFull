import { Controller, Inject } from "@tsed/di";
import { Post } from "@tsed/schema";
import { BodyParams } from "@tsed/platform-params";
import { WebhookService } from "../../services/WebhookService";
import { SuccessResult } from "../../util/entities";

interface InviteUserPayload {
  name: string;
  email: string;
  role: string;
  phone?: string;
}

@Controller("/webhooks")
export class WebhookController {
  @Inject()
  private webhookService: WebhookService;

  @Post("/invite-user")
  async inviteUser(@BodyParams() body: InviteUserPayload) {
    console.log('Received invite user request:', body);
    const result = await this.webhookService.sendInvite(body);
    return new SuccessResult(result, Object);
  }
}
