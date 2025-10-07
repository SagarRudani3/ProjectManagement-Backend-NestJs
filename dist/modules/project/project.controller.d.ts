import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto, user: any): Promise<any>;
    findAll(user: any): Promise<any[]>;
    findOne(id: string, user: any): Promise<any>;
    update(id: string, updateProjectDto: UpdateProjectDto, user: any): Promise<any>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
