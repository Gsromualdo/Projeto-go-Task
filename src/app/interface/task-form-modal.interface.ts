import { ITaskFormControls } from "./task-formal-controls.interface";

export interface ITaskFormModelData {
  mode: 'create' | 'edit';
  formValues: ITaskFormControls;

}