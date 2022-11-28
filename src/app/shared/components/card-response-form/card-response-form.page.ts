import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfiniteScrollCustomEvent, ModalController, NavParams } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { QuestionRequest } from 'src/app/shared/request/QuestionResquest';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/messages.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { Question } from '../../interfaces/question';
import { ResponseRequest } from '../../request/ResponseRequest';
import { ResponseService } from '../../services/response.service';

@Component({
  selector: 'card-response-form',
  templateUrl: './card-response-form.page.html',
  styleUrls: ['./card-response-form.page.scss'],
})
export class CardResponseForm implements OnInit {

  form: FormGroup;
  question: Question
 
  private unsubscribeNotifier = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private messageService: MessageService,
    private responseService: ResponseService,
    public  navParams: NavParams,
    private authService: AuthService) {
      console.log(navParams.get('question'))
      this.question = navParams.get('question');
     }

    ngOnInit() {console.log('opaaa')
      this.createForm();
    }
  
    ngOnDestroy(): void {
      this.unsubscribeNotifier.next();
      this.unsubscribeNotifier.complete();
    }
  
    public createForm(): void {
      this.form = this.formBuilder.group({
        response: ['', [Validators.required]],
      });
    }
  
    cadastrar() : void {console.log(this.form.value,  this.question)
      let request: ResponseRequest = {response: this.form.get('response').value, authorId: this.authService.userLoggedId, questionId: this.question['id']}
      this.responseService.create(request).pipe(
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
