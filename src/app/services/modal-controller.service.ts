import { inject, Injectable } from "@angular/core";
import {Dialog} from "@angular/cdk/dialog";
import { TaskFormModalComponent } from "../components/task-form-modal/task-form-modal.component";
import { TaskCommentsModalComponent } from "../components/task-comments-modal/task-comments-modal.component";
import { ITaskFormControls } from "../interface/task-formal-controls.interface";
import { Itask } from "../interface/task.interface";
@Injectable({
    providedIn: 'root',
})

export class ModalControllerService {
    private readonly _dialog = inject(Dialog);
    private readonly modalSizeOptions = {
        maxWidth: '620px',
        width: '95%',
    };

    openNewTaskModal () {
         return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
            ...this.modalSizeOptions,
            disableClose:true,
            data: {
                mode: 'create',
                formValues: {
                    name: '',
                    description: '',
                }
            }
         });
    }

    openEditTaskModal (formValues: ITaskFormControls ) {
        return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
            ...this.modalSizeOptions,
            disableClose: true,
            data: {
                mode: 'edit',
                formValues,
            }
        });
    }

    openTaskCommentsModal (task: Itask) {
        return this._dialog.open(TaskCommentsModalComponent, {
            ...this.modalSizeOptions,
            disableClose: true,
            data: task,
        });
    }
}