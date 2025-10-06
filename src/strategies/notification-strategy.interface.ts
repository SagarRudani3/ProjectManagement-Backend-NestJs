export interface NotificationPayload {
  userId: string;
  message: string;
  type: 'task_created' | 'task_updated' | 'task_moved';
  metadata?: any;
}

export interface INotificationStrategy {
  send(payload: NotificationPayload): Promise<void>;
}
