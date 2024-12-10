export type StatusType = 'completed' | 'incomplete';

export interface ITask {
  id: string;
  description?: string;
  name: string;
  categories: string[];
  status: StatusType;
}
