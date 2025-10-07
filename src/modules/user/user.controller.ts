import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ToggleSuperUserDto } from "./dto/toggle-super-user.dto";
import { UserJwtGard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@Controller("user")
@UseGuards(UserJwtGard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("toggle-super-user")
  async toggleSuperUser(
    @Body() toggleDto: ToggleSuperUserDto,
    @CurrentUser() user: any
  ) {
    return this.userService.toggleSuperUser(user._id, toggleDto.password);
  }
}
