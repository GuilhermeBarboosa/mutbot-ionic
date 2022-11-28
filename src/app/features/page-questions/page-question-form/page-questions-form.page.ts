import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { QuestionRequest } from 'src/app/shared/request/QuestionResquest';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/messages.service';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  selector: 'app-page-questions-form',
  templateUrl: './page-questions-form.page.html',
  styleUrls: ['./page-questions-form.page.scss'],
})
export class PageQuestionsForm implements OnInit {

  form: FormGroup;
 
  private unsubscribeNotifier = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private messageService: MessageService,
    private questionService: QuestionService,
    private authService: AuthService) { }

    ngOnInit() {console.log('opaaa')
      this.createForm();
    }
  
    ngOnDestroy(): void {
      this.unsubscribeNotifier.next();
      this.unsubscribeNotifier.complete();
    }
  
    public createForm(): void {
      this.form = this.formBuilder.group({
        question: ['', [Validators.required]],
      });
    }
  
    cadastrar() : void {console.log(this.form.value)
      let request: QuestionRequest = {question: this.form.get('question').value, authorId: this.authService.userLoggedId}
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
