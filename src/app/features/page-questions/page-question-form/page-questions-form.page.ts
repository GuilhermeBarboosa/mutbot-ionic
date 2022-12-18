import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { Tag } from 'src/app/shared/interfaces/tag';
import { QuestionRequest } from 'src/app/shared/request/QuestionResquest';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/messages.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-page-questions-form',
  templateUrl: './page-questions-form.page.html',
  styleUrls: ['./page-questions-form.page.scss'],
})
export class PageQuestionsForm implements OnInit {

  form: FormGroup;
  tags: Tag[] = [];
 
  private unsubscribeNotifier = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private tag: TagService,
    private messageService: MessageService,
    private questionService: QuestionService,
    private authService: AuthService) { }

    ngOnInit() {console.log('opaaa')
      this.createForm();
      this.loadTag();
    }

    loadTag() {
      this.tag.loadAll().pipe(
        takeUntil(this.unsubscribeNotifier),
      ).subscribe({
        next: data => {       
            this.tags = (data.data);        
        },
        error: () =>this.messageService.error('Falha ao carregar Tag!')
      });
    }
  
    ngOnDestroy(): void {
      this.unsubscribeNotifier.next();
      this.unsubscribeNotifier.complete();
    }
  
    public createForm(): void {
      this.form = this.formBuilder.group({
        question: ['', [Validators.required]],
        tag: ['', [Validators.required]],
      });
    }

    showSelectValue(selected) {
      this.form.get('tag').setValue(selected.value)
      console.log(selected)
    }
  
    cadastrar() : void {console.log(this.form.value)
      let request: QuestionRequest = {question: this.form.get('question').value, authorId: this.authService.userLoggedId, tagId: this.form.get('tag').value,}
      console.log(request)
      this.questionService.create(request).pipe(
        takeUntil(this.unsubscribeNotifier)
      ).subscribe({
        next: register => {
          this.messageService.sucess('Cadastro efetuado com sucesso!');
          this.modalCtrl.dismiss();
        },
        error: (error) => this.messageService.error('Falha no servidor entre em contato com administrador do sistema!')
      });
    }

    dismiss() {
      this.modalCtrl.dismiss();
    }

}
