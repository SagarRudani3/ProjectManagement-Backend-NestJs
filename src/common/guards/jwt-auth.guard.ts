import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { AuthGuard } from "@nestjs/passport";
import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "src/database/schemas/user.schema";

@Injectable()
// export class JwtAuthGuard extends AuthGuard("jwt") {}
export class UserJwtGard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel("User")
    private readonly OrganizationModel: Model<UserDocument>
  ) {}

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }
  protected getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    const authorization = request.headers["authorization"];
    console.log("%c Line:28 🍓 authorization", "color:#ea7e5c", authorization);

    if (!authorization || Array.isArray(authorization)) {
      throw new Error("Invalid Authorization Header");
    }
    const [_, token] = authorization.split(" ");
    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest<any>(context);
    try {
      const token = this.getToken(request);
      console.log("%c Line:41 🍑 token", "color:#b03734", token);

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log("%c Line:43 🍬 user", "color:#f5ce50", user);

      const getAllOrgOfUser = await this.OrganizationModel.findOne({
        _id: new mongoose.Types.ObjectId(user?.sub),
        isDeleted: "false",
      });

      request.user = getAllOrgOfUser;
      return true;
    } catch (e) {
      console.log("%c Line:55 🍫 e", "color:#4fff4B", e);
      if (e.name === "TokenExpiredError") {
        throw new UnauthorizedException("Token has Expired");
      } else if (e.name === "JsonWebTokenError") {
        throw new UnauthorizedException("Invalid Token");
      } else {
        throw new UnauthorizedException("Authentication Failed");
      }
    }
  }
}
