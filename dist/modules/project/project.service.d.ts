import { Model } from "mongoose";
import { Project } from "../../database/schemas/project.schema";
import { Column } from "../../database/schemas/column.schema";
import { Task } from "../../database/schemas/task.schema";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
export declare class ProjectService {
    private projectModel;
    private columnModel;
    private taskModel;
    constructor(projectModel: Model<Project>, columnModel: Model<Column>, taskModel: Model<Task>);
    create(createProjectDto: CreateProjectDto, userEmail: string, isSuperUser: boolean): Promise<any>;
    findAll(isSuperUser: boolean): Promise<any[]>;
    findOne(id: string, isSuperUser: boolean): Promise<any>;
    update(id: string, updateProjectDto: UpdateProjectDto, userEmail: string, isSuperUser: boolean): Promise<any>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private formatProject;
    private formatColumn;
    private formatTask;
}
