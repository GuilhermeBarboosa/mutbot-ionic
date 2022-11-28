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
  
  private unsubscribeNotifier = new Subject<void>();
  question: Question
  responseArray = [];
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
  }

  ngOnInit() {
    this.loadResponses(0);
  }


  loadResponses(index: number): void {
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
  

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onIonInfinite(ev) {
    this.pageIndex = (this.pageIndex + 1);
    this.loadResponses(this.pageIndex);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async openModalResponse() {
    const modal = await this.modalCtrl.create({
      component: CardResponseForm, componentProps: { question: this.question}
    });

    modal.onDidDismiss()
      .then(()=> {
        this.pageIndex = 0;
        this.responseArray = [];
        this.loadResponses(this.pageIndex);
      })
    return await modal.present();
  }
}
