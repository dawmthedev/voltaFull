import { Injectable } from "@tsed/di";
import jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  public generateToken(user: { _id: string; email: string; role: string }): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }
    return jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }
}
