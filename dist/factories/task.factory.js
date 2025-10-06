"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFactory = void 0;
class TaskFactory {
    static createTask(data) {
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
    static createTaskFromTemplate(template, columnId, projectId, order, userEmail) {
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
exports.TaskFactory = TaskFactory;
//# sourceMappingURL=task.factory.js.map