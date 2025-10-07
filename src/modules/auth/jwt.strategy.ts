import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>("JWT_SECRET") || "projectManagementSecretKey",
    });
  }

  async validate(payload: any) {
    console.log("JWT Strategy validate called with payload:", payload);

    if (!payload.sub) {
      console.log("No sub in payload");
      throw new UnauthorizedException("Invalid token payload");
    }

    const user = await this.authService.validateUser(payload.sub);
    console.log("User from validateUser:", user);

    if (!user) {
      console.log("User not found");
      throw new UnauthorizedException("User not found or deleted");
    }
    return user;
  }
}
