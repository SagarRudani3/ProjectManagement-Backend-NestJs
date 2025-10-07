import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: any): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas/user.schema").User, {}, {}> & import("../../database/schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export {};
