import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { UserDocument } from "src/database/schemas/user.schema";
export declare class UserJwtGard implements CanActivate {
    private readonly jwtService;
    private readonly OrganizationModel;
    constructor(jwtService: JwtService, OrganizationModel: Model<UserDocument>);
    protected getRequest<T>(context: ExecutionContext): T;
    protected getToken(request: {
        headers: Record<string, string | string[]>;
    }): string;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
