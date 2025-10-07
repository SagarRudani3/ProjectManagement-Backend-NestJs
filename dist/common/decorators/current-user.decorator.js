"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log("%c Line:6 🍷 request", "color:#7f2b82", request.user);
    return request.user;
});
//# sourceMappingURL=current-user.decorator.js.map