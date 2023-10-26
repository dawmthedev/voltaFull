import { Injectable } from "@tsed/di";
import { decrypt, encrypt } from "../util/crypto";
import { EMAIL_NOT_VERIFIED, INCORRECT_CODE_OR_EMAIL, INVALID_VERIFICATION_TOKEN } from "../util/errors";
import { addMinutes, isPast } from "date-fns";
import { VerificationType } from "../../types";
import { generate6DigitCode } from "../util";

@Injectable()
export class VerificationService {
  // public async findVerificationByEmail(email: string) {
  //   return prisma.verification.findFirst({
  //     where: { email: email.toLowerCase(), verified: false },
  //     orderBy: { createdAt: "desc" }
  //   });
  // }

  // public async findVerificationById(id: string) {
  //   return prisma.verification.findFirst({
  //     where: { id }
  //   });
  // }

  // public isCodeExpired(expiry: Date) {
  //   return !expiry ? false : isPast(new Date(expiry));
  // }

  // public generateToken(id: string) {
  //   return encrypt(id);
  // }

  // public getDecryptedCode(code: string) {
  //   return decrypt(code);
  // }

  // public async expireToken(verificationId: string) {
  //   return await prisma.verification.update({
  //     where: { id: verificationId },
  //     data: { expiry: new Date() }
  //   });
  // }

  // public async addExpiryTime(verificationId: string) {
  //   return await prisma.verification.update({
  //     where: { id: verificationId },
  //     data: { expiry: addMinutes(new Date(), 15) }
  //   });
  // }

  // public async updateVerificationStatus({ id, status }: { id: string; status: boolean }) {
  //   return await prisma.verification.update({
  //     where: { id },
  //     data: { verified: status }
  //   });
  // }

  // public async verifyToken(data: { verificationToken: string; email?: string }) {
  //   const verification = await prisma.verification.findFirst({
  //     where: { code: data.verificationToken, verified: false }
  //   });
  //   if (!verification) throw new Forbidden(EMAIL_NOT_VERIFIED);
  //   if (data.email && data.email.toLowerCase() !== verification.email) throw new Forbidden(EMAIL_NOT_VERIFIED);
  //   return verification;
  // }

  // public async verifyCode({ email, code }: { email: string; code: string }) {
  //   const verification = await this.findVerificationByEmail(email);
  //   if (!verification || code !== verification.code) throw new Forbidden(INCORRECT_CODE_OR_EMAIL);
  //   await this.addExpiryTime(verification.id);
  //   return await this.updateVerificationStatus({ id: verification.id, status: true });
  // }

  // public async generateVerification({ email, type }: { email: string; type: VerificationType }) {
  //   let verification = await this.findVerificationByEmail(email);
  //   if (!verification) {
  //     verification = await prisma.verification.create({
  //       data: {
  //         email: email.trim().toLowerCase(),
  //         type,
  //         code: generate6DigitCode()
  //       }
  //     });
  //   }
  //   return verification;
  // }
}
