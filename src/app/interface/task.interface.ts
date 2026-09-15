import { Icomment } from "../interface/comment.interface";
import { TaskStatus } from "../types/tasks-status";

export interface Itask {
    id: string,
    name: string,
    description: string,
    comments: Icomment[];
    status: TaskStatus;
}