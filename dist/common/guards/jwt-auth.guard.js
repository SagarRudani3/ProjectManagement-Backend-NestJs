"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJwtGard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
let UserJwtGard = class UserJwtGard {
    constructor(jwtService, OrganizationModel) {
        this.jwtService = jwtService;
        this.OrganizationModel = OrganizationModel;
    }
    getRequest(context) {
        return context.switchToHttp().getRequest();
    }
    getToken(request) {
        const authorization = request.headers["authorization"];
        console.log("%c Line:28 🍓 authorization", "color:#ea7e5c", authorization);
        if (!authorization || Array.isArray(authorization)) {
            throw new Error("Invalid Authorization Header");
        }
        const [_, token] = authorization.split(" ");
        return token;
    }
    async canActivate(context) {
        const request = this.getRequest(context);
        try {
            const token = this.getToken(request);
            console.log("%c Line:41 🍑 token", "color:#b03734", token);
            const user = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            console.log("%c Line:43 🍬 user", "color:#f5ce50", user);
            const getAllOrgOfUser = await this.OrganizationModel.findOne({
                _id: new mongoose_2.default.Types.ObjectId(user?.sub),
                isDeleted: "false",
            });
            request.user = getAllOrgOfUser;
            return true;
        }
        catch (e) {
            console.log("%c Line:55 🍫 e", "color:#4fff4B", e);
            if (e.name === "TokenExpiredError") {
                throw new common_1.UnauthorizedException("Token has Expired");
            }
            else if (e.name === "JsonWebTokenError") {
                throw new common_1.UnauthorizedException("Invalid Token");
            }
            else {
                throw new common_1.UnauthorizedException("Authentication Failed");
            }
        }
    }
};
exports.UserJwtGard = UserJwtGard;
exports.UserJwtGard = UserJwtGard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], UserJwtGard);
//# sourceMappingURL=jwt-auth.guard.js.map