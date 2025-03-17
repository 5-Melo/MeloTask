export interface Status {
    id: string;
    name: string;
    color: string;
    projectId: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    title: string;
    description: string;
    statusId: string;
    labelIds: string[];
    dependencyIds: string[];
    dueDate: string;
    startDate: string;
    endDate: string;
    estimatedHours: number;
    actualHours: number;
    projectId: string;
}

export interface DragItem {
    type: 'TASK';
    id: string;
    statusId: string;
    index?: number;
} 