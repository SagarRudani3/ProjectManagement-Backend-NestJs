import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { UserJwtGard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@Controller("projects")
@UseGuards(UserJwtGard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @CurrentUser() user: any) {
    return this.projectService.create(
      createProjectDto,
      user?.email,
      user?.isSuperUser
    );
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    console.log("%c Line:21 🥖", "color:#b03734", user);
    return this.projectService.findAll(user?.isSuperUser);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @CurrentUser() user: any) {
    return this.projectService.findOne(id, user.isSuperUser);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: any
  ) {
    return this.projectService.update(
      id,
      updateProjectDto,
      user.email,
      user.isSuperUser
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectService.remove(id);
  }
}
