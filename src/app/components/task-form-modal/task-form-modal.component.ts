import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ITaskFormModelData } from '../../interface/task-form-modal.interface';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { ITaskFormControls } from '../../interface/task-formal-controls.interface';
@Component({
  selector: 'app-task-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.css'
})
export class TaskFormModalComponent {
  readonly _data: ITaskFormModelData = inject(DIALOG_DATA); // token injection, criado na classe do component
  readonly _dialogRef = inject(DialogRef);
  taskForm: FormGroup = new FormGroup({
    name: new FormControl(this._data.formValues.name, [Validators.required, Validators.minLength(10)]),
    description: new FormControl(this._data.formValues.description, [Validators.required, Validators.minLength(10)])
  });

  

  onFormSubmit() {
    this.closeModal(this.taskForm.value);
}

closeModal(formValues: ITaskFormControls | undefined = undefined) {
  this._dialogRef.close(formValues); 
}

  
}
