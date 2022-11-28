import { Component, OnInit, Input } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, NavController, NavParams } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ListParams } from '../../interfaces/list-params';
import { Question } from '../../interfaces/question';
import { MessageService } from '../../services/messages.service';
import { ResponseService } from '../../services/response.service';
import { CardResponseForm } from '../card-response-form/card-response-form.page';

@Component({
  selector: 'card-questions-list',
  templateUrl: './card-question-list.component.html',
  styleUrls: ['./card-question-list.component.css']
})
export class CardQuestionsListComponent implements OnInit {
  
  question: Question

  responseArray = [];

  private unsubscribeNotifier = new Subject<void>();
  params: ListParams = {
    pageable: true,
    pageIndex: 0,
    pageSize: 10,
    orderBy: 'response.createdDate'
  };

  pageIndex: number = 0;
  constructor(private modalCtrl: ModalController,
     public navParams: NavParams,
     private responseService: ResponseService,
     private messageService: MessageService) { 
    this.question = navParams.get('question');
    console.log(this.question)
  }

  ngOnInit() {
    this.loadResponse(0);
  }

  loadResponse(index) {
    this.params.pageIndex = index;
    console.log(index)
    this.responseService.load(this.params, this.question.id).pipe(
      takeUntil(this.unsubscribeNotifier),
    ).subscribe({
      next: data => {       
          this.responseArray = this.responseArray.concat(data.data);        
      },
      error: () =>this.messageService.error('Falha ao carregar Questões!')
    });
  }

  async openModalResponse() {
    const modal = await this.modalCtrl.create({
      component: CardResponseForm, componentProps: { question: this.question}
    });

    modal.onDidDismiss()
      .then(()=> {
        this.pageIndex = 0;
        this.responseArray = [];
        this.loadResponse(this.pageIndex);
      })
    return await modal.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onIonInfinite(ev) {
    this.pageIndex = (this.pageIndex + 1);
    this.loadResponse(this.pageIndex);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
