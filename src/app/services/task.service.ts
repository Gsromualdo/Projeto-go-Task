import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Itask } from '../interface/task.interface';
import { ITaskFormControls } from '../interface/task-formal-controls.interface';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { generateUniqueIdWithTimeStamp } from '../utils/generate-unique-id-with-timestamp';
import { TaskStatus } from '../types/tasks-status';
import { Icomment } from '../interface/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  //tarefas a fazer
  private todoTasks$ = new BehaviorSubject<Itask[]>(this.loadTaskFromLocalStorage(TaskStatusEnum.TODO)); // não sera consumida diretamente
  readonly todoTasks = this.todoTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskOnLocalStorage(TaskStatusEnum.TODO, tasks)),
  ); // componente irá se inscrever nesse observable
  //tarefas a fazendo
  private doingTasks$ = new BehaviorSubject<Itask[]>(this.loadTaskFromLocalStorage(TaskStatusEnum.DOING)); // não sera consumida diretamente
  readonly doingTasks = this.doingTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskOnLocalStorage(TaskStatusEnum.DOING, tasks)),
  ); // componente irá se inscrever nesse observable

  //tarefas a concluidas
  private doneTasks$ = new BehaviorSubject<Itask[]>(this.loadTaskFromLocalStorage(TaskStatusEnum.DONE)); // não sera consumida diretamente
  readonly doneTasks = this.doneTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskOnLocalStorage(TaskStatusEnum.DONE, tasks)),
  ); // componente irá se inscrever nesse observable

  addTask(taskInfos: ITaskFormControls) {
    const newTask: Itask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimeStamp(),
      comments: [],
    };

    const currentList = this.todoTasks$.value;

    this.todoTasks$.next([...currentList, newTask]);

    /*
        const upadatedList = [...currentList, newTask];
       this.todoTasks$.next(structuredClone(upadatedList))
         */
  }

  updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    taskNextStatus: TaskStatus,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);
    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      // atualizando o status da tarefa
      currentTask.status = taskNextStatus;

      // removendo a tarefa do status

      // pega o valor da lista e faz um filtro trazendo todos os itens que são diferentes do id da lista atual
      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id != taskId,
      );
      currentTaskList.next([...currentTaskListWithoutTask]);

      //adicionando a tarefa na nova lista

      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

  updateTaskNameAndDescription(
    TaskId: string,
    TaskCurrentStatus: TaskStatus,
    newTaskName: string,
    newTaskDescription: string,
  ) {
    const currentTaskList = this.getTaskListByStatus(TaskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === TaskId,
    ); // achando a tarefa atual pelo indice

    if (currentTaskIndex > -1) {
      const updatedTaskList = [...currentTaskList.value];

      //recebeu todos os parametros da tarefa do indice referenciado e atualizando apenas o nome e descrição
      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        name: newTaskName,
        description: newTaskDescription,
      };
      currentTaskList.next(updatedTaskList);
    }
  }
  updateTaskComments(
    TaskId: string,
    TaskCurrentStatus: TaskStatus,
    newTaskComments: Icomment[],
  ) {
    const currentTaskList = this.getTaskListByStatus(TaskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === TaskId,
    );

    if (currentTaskIndex > -1) {
      const updatedTaskList = [...currentTaskList.value];

      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        comments: [...newTaskComments],
      };
      currentTaskList.next(updatedTaskList);
    }
  }

  deleteTask(taskId: string, taskCurrentStatus: TaskStatus) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);

    const newTaskList = currentTaskList.value.filter(
      (task) => task.id !== taskId,
    );

    currentTaskList.next(newTaskList);
  }

  private loadTaskFromLocalStorage(key: string){
    try {
        const storedTasks = localStorage.getItem(key)
        return storedTasks ? JSON.parse(storedTasks) : [];
    } catch(error){
        console.error('Erro ao carregar tarefas do localstorage', error);
    }
  }
  private saveTaskOnLocalStorage(key: string, tasks: Itask[]) {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (error) {
      console.log('Erro ao salvar tarefas no localStorage', error);
    }
  }

  private getTaskListByStatus(taskStatus: TaskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTasks$,
      [TaskStatusEnum.DOING]: this.doingTasks$,
      [TaskStatusEnum.DONE]: this.doneTasks$,
    };

    return taskListObj[taskStatus];
  }
}
