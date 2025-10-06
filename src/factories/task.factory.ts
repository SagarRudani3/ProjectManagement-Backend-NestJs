import { Types } from 'mongoose';

export interface TaskData {
  title: string;
  description?: string;
  columnId: Types.ObjectId;
  projectId: Types.ObjectId;
  order: number;
  createdBy: string;
  updatedBy: string;
}

export class TaskFactory {
  static createTask(data: Partial<TaskData>): TaskData {
    return {
      title: data.title || 'Untitled Task',
      description: data.description || '',
      columnId: data.columnId,
      projectId: data.projectId,
      order: data.order || 0,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy || data.createdBy,
    };
  }

  static createTaskFromTemplate(
    template: string,
    columnId: Types.ObjectId,
    projectId: Types.ObjectId,
    order: number,
    userEmail: string,
  ): TaskData {
    const templates = {
      bug: {
        title: 'Bug Report',
        description: 'Describe the bug and steps to reproduce',
      },
      feature: {
        title: 'Feature Request',
        description: 'Describe the feature and expected behavior',
      },
      task: {
        title: 'Task',
        description: 'Describe the task to be completed',
      },
    };

    const templateData = templates[template] || templates.task;

    return this.createTask({
      ...templateData,
      columnId,
      projectId,
      order,
      createdBy: userEmail,
      updatedBy: userEmail,
    });
  }
}
