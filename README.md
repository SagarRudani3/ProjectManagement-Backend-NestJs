# Project Management Backend - NestJS + MongoDB

A complete NestJS backend system for Kanban-style project management with real-time updates, authentication, and design patterns.

## Features

### Default Kanban Columns
Every project automatically gets 5 default columns:
1. **Proposed** - Ideas and proposals
2. **Todo** - Tasks ready to start
3. **Inprogress** - Tasks being worked on
4. **Done** - Completed tasks
5. **Deployed** - Released features

### Core Functionality
- Mock OTP authentication (any OTP works)
- JWT-based authorization
- Project and task management
- Real-time updates via Socket.IO
- Super-user mode for admin views
- Activity tracking
- Notification system with Strategy Pattern
- Task creation with Factory Pattern

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **TypeScript** - Type-safe development

## Design Patterns

### Factory Pattern (Task Creation)
Located in `src/factories/task.factory.ts`

**Purpose**: Standardizes task object creation

**Benefits**:
- Consistent task initialization
- Template-based task generation (bug, feature, task)
- Separates creation logic from business logic

**Usage**:
```typescript
TaskFactory.createTask(data);
TaskFactory.createTaskFromTemplate('bug', columnId, projectId, order, userEmail);
```

### Strategy Pattern (Notifications)
Located in `src/strategies/`

**Purpose**: Flexible notification delivery based on user status

**Strategies**:
- **UI Strategy**: Real-time WebSocket notifications for active users
- **Email Strategy**: Email notifications for offline users (mock)

**Benefits**:
- Easy to add new channels (SMS, Slack, etc.)
- Runtime strategy selection
- Open/Closed Principle compliance

## Database Choice: MongoDB

**Why MongoDB?**
1. **Flexible Schema**: Projects/tasks can have varying fields
2. **Nested Documents**: Natural fit for hierarchical data
3. **Rapid Development**: No migrations during development
4. **Scalability**: Horizontal scaling support
5. **JSON-native**: Perfect for JavaScript/TypeScript

## API Endpoints

### Authentication

#### POST /auth/login
Send OTP to email (mock - accepts any email)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

#### POST /auth/verify
Verify OTP (mock - accepts ANY OTP)
```bash
curl -X POST http://localhost:3000/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","otp":"123456"}'
```
Returns JWT token.

#### GET /auth/me
Get current user info (protected)
```bash
curl http://localhost:3000/auth/me \
  -H "Authorization: Bearer <token>"
```

### User Management

#### POST /user/toggle-super-user
Toggle super-user mode (password: `admin123`)
```bash
curl -X POST http://localhost:3000/user/toggle-super-user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"password":"admin123"}'
```

When ON: Shows `createdBy` and `updatedBy` fields in responses
When OFF: Hides user metadata

### Projects

#### POST /projects
Create project (automatically creates 5 default columns)
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"My Project","description":"Description"}'
```

#### GET /projects
Get all projects with columns
```bash
curl http://localhost:3000/projects \
  -H "Authorization: Bearer <token>"
```

#### GET /projects/:id
Get single project with columns and tasks
```bash
curl http://localhost:3000/projects/PROJECT_ID \
  -H "Authorization: Bearer <token>"
```

#### PATCH /projects/:id
Update project
```bash
curl -X PATCH http://localhost:3000/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Updated Name"}'
```

#### DELETE /projects/:id
Delete project (cascades to columns and tasks)
```bash
curl -X DELETE http://localhost:3000/projects/PROJECT_ID \
  -H "Authorization: Bearer <token>"
```

### Columns

#### POST /columns
Create custom column
```bash
curl -X POST http://localhost:3000/columns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Review","order":6,"projectId":"PROJECT_ID"}'
```

#### GET /columns?projectId=ID
Get columns for project
```bash
curl "http://localhost:3000/columns?projectId=PROJECT_ID" \
  -H "Authorization: Bearer <token>"
```

#### PATCH /columns/:id
Update column
```bash
curl -X PATCH http://localhost:3000/columns/COLUMN_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"In Review"}'
```

#### DELETE /columns/:id
Delete column
```bash
curl -X DELETE http://localhost:3000/columns/COLUMN_ID \
  -H "Authorization: Bearer <token>"
```

### Tasks

#### POST /tasks
Create task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title":"Fix login bug",
    "description":"Users cannot login",
    "columnId":"COLUMN_ID",
    "projectId":"PROJECT_ID"
  }'
```

#### GET /tasks?projectId=ID
Get all tasks for project
```bash
curl "http://localhost:3000/tasks?projectId=PROJECT_ID" \
  -H "Authorization: Bearer <token>"
```

#### GET /tasks?columnId=ID
Get tasks by column
```bash
curl "http://localhost:3000/tasks?columnId=COLUMN_ID" \
  -H "Authorization: Bearer <token>"
```

#### GET /tasks/:id
Get single task
```bash
curl http://localhost:3000/tasks/TASK_ID \
  -H "Authorization: Bearer <token>"
```

#### PATCH /tasks/:id
Update task
```bash
curl -X PATCH http://localhost:3000/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Updated title"}'
```

#### PATCH /tasks/:id/move
Move task to different column (triggers real-time event)
```bash
curl -X PATCH http://localhost:3000/tasks/TASK_ID/move \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"columnId":"NEW_COLUMN_ID","order":2}'
```

#### DELETE /tasks/:id
Delete task
```bash
curl -X DELETE http://localhost:3000/tasks/TASK_ID \
  -H "Authorization: Bearer <token>"
```

## Real-time Events (Socket.IO)

### Client Connection

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Join project room
socket.emit('join_project', 'PROJECT_ID');

// Leave project room
socket.emit('leave_project', 'PROJECT_ID');
```

### Server Events (Listen)

```javascript
// Task created
socket.on('task_created', (task) => {
  console.log('New task:', task);
});

// Task updated
socket.on('task_updated', (task) => {
  console.log('Task updated:', task);
});

// Task moved between columns
socket.on('task_moved', (task) => {
  console.log('Task moved:', task);
});

// General notification
socket.on('notification', (notification) => {
  console.log('Notification:', notification);
});
```

## Database Collections

### users
```javascript
{
  email: String (unique),
  isSuperUser: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### projects
```javascript
{
  name: String,
  description: String,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

### columns
```javascript
{
  name: String,
  order: Number,
  projectId: ObjectId (ref: Project),
  taskCount: Number,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

### tasks
```javascript
{
  title: String,
  description: String,
  columnId: ObjectId (ref: Column),
  projectId: ObjectId (ref: Project),
  order: Number,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

### activities
```javascript
{
  projectId: ObjectId (ref: Project),
  taskId: ObjectId (ref: Task),
  userId: String,
  action: String,
  timestamp: Date
}
```

## Environment Variables

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/project-management
JWT_SECRET=your-secret-key-change-in-production
PORT=3000
```

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development with hot reload
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## Project Structure

```
src/
├── modules/
│   ├── auth/                  # JWT authentication
│   │   ├── dto/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── auth.module.ts
│   ├── project/               # Project management
│   │   ├── dto/
│   │   ├── project.controller.ts
│   │   ├── project.service.ts
│   │   └── project.module.ts
│   ├── task/                  # Task management
│   │   ├── dto/
│   │   ├── task.controller.ts
│   │   ├── task.service.ts
│   │   └── task.module.ts
│   ├── column/                # Column management
│   │   ├── dto/
│   │   ├── column.controller.ts
│   │   ├── column.service.ts
│   │   └── column.module.ts
│   ├── user/                  # User management
│   │   ├── dto/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   └── notification/          # Notification system
│       ├── notification.service.ts
│       └── notification.module.ts
├── common/
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── decorators/
│       └── current-user.decorator.ts
├── strategies/                # Strategy Pattern
│   ├── notification-strategy.interface.ts
│   ├── ui-notification.strategy.ts
│   └── email-notification.strategy.ts
├── factories/                 # Factory Pattern
│   └── task.factory.ts
├── gateways/                  # WebSocket
│   ├── events.gateway.ts
│   └── events.module.ts
├── database/
│   └── schemas/               # Mongoose schemas
│       ├── user.schema.ts
│       ├── project.schema.ts
│       ├── column.schema.ts
│       ├── task.schema.ts
│       └── activity.schema.ts
├── main.ts                    # Bootstrap
└── app.module.ts              # Root module
```

## Complete Workflow Example

### 1. Authenticate
```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'

# Verify (any OTP works)
curl -X POST http://localhost:3000/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"999999"}'
```

Save the returned token.

### 2. Create Project (with default columns)
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Website Redesign","description":"Q1 2025 project"}'
```

Response includes project with 5 default columns.

### 3. Create Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title":"Design homepage mockup",
    "description":"Create Figma designs",
    "columnId":"<Proposed_column_id>",
    "projectId":"<project_id>"
  }'
```

### 4. Move Task
```bash
curl -X PATCH http://localhost:3000/tasks/<task_id>/move \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"columnId":"<Todo_column_id>"}'
```

Real-time event emitted to all connected clients.

### 5. Enable Super User Mode
```bash
curl -X POST http://localhost:3000/user/toggle-super-user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"password":"admin123"}'
```

Now all responses include `createdBy` and `updatedBy` fields.

## Key Features Explained

### Default Columns on Project Creation
When you create a project, 5 columns are automatically created:
- Proposed (order: 1)
- Todo (order: 2)
- Inprogress (order: 3)
- Done (order: 4)
- Deployed (order: 5)

### Task Count Tracking
Each column maintains a `taskCount` field that automatically increments/decrements when tasks are added or moved.

### Real-time Updates
When tasks are created, updated, or moved, Socket.IO events are emitted to all clients in the project room.

### Super User Mode
Toggle between normal and admin views:
- **OFF**: Clean API responses without user metadata
- **ON**: Full transparency with creator/updater information

## License

MIT
