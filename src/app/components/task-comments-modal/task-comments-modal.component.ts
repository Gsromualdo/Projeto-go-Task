import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icomment } from '../../interface/comment.interface';
import { generateUniqueIdWithTimeStamp } from '../../utils/generate-unique-id-with-timestamp';
import { Itask } from '../../interface/task.interface';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css',
})
export class TaskCommentsModalComponent {
  taskCommentsChanged = false;
  commentControl = new FormControl('', [Validators.required]);
  // referenciar o input do comentário
  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>;

  readonly _task: Itask = inject(DIALOG_DATA);
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);

  onAddComment() {
    const newComment: Icomment = {
      id: generateUniqueIdWithTimeStamp(),
      description: this.commentControl.value ? this.commentControl.value : '',
    };

    //addcionar o novo comentario na lista de comentario da tarefa
    this._task.comments.unshift(newComment);

    // resetar form control
    this.commentControl.reset();

    //atualizar a flag/prop se houve alterações nos comentario
    this.taskCommentsChanged = true;

    // foco no elemento de input
    this.commentInputRef.nativeElement.focus();
  }

  onRemoveComment(commentId: string) {
    // filtrando todo comentario de tudo que é diferente do comentário recebido como parâmetro
    this._task.comments = this._task.comments.filter(comment => comment.id !== commentId);

    //atualizar a flag
    this.taskCommentsChanged = true;
  }

  onCloseModal() {
    this._dialogRef.close(this.taskCommentsChanged);
  }
}
