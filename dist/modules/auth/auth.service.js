"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../database/schemas/user.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async login(email) {
        let user = await this.userModel.findOne({ email });
        if (!user) {
            user = await this.userModel.create({ email });
        }
        return {
            success: true,
            message: 'OTP sent successfully (mock - any OTP will work)',
        };
    }
    async verifyOtp(email, otp) {
        let user = await this.userModel.findOne({ email });
        if (!user) {
            user = await this.userModel.create({ email });
        }
        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload);
        return {
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                isSuperUser: user.isSuperUser,
            },
        };
    }
    async validateUser(userId) {
        return await this.userModel.findOne({
            _id: userId,
            $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }]
        }).exec();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map