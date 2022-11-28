import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { CardQuestionsListComponent } from 'src/app/shared/components/card-question-list/card-question-list.component';
import { ListParams } from 'src/app/shared/interfaces/list-params';
import { Question } from 'src/app/shared/interfaces/question';
import { MessageService } from 'src/app/shared/services/messages.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { PageQuestionsForm } from '../page-question-form/page-questions-form.page';

@Component({
  selector: 'app-page-questions',
  templateUrl: './page-questions.page.html',
  styleUrls: ['./page-questions.page.scss'],
})
export class PageQuestionsPage implements OnInit {
  
  private questionArray = [];
  private unsubscribeNotifier = new Subject<void>();
  params: ListParams = {
    pageable: true,
    pageIndex: 0,
    pageSize: 10,
    orderBy: 'question.createdDate'
  };

  pageIndex: number = 0;

  constructor(private modalCtrl: ModalController, private questionService: QuestionService, private messageService: MessageService) {
  }
  items = [];
  ngOnInit() {
    this.loadQuestions(0);
  }

  loadQuestions(index: number): void {
    this.params.pageIndex = index;
    console.log(index)
    this.questionService.load(this.params).pipe(
      takeUntil(this.unsubscribeNotifier),
    ).subscribe({
      next: data => {       
          this.questionArray = this.questionArray.concat(data.data);        
      },
      error: () =>this.messageService.error('Falha ao carregar Questões!')
    });
  }

 

  onIonInfinite(ev) {
    this.pageIndex = (this.pageIndex + 1);
    this.loadQuestions(this.pageIndex);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async openModalCreate() {
    const modal = await this.modalCtrl.create({
      component: PageQuestionsForm
    });
    
    modal.onDidDismiss()
      .then(()=> {
        this.pageIndex = 0;
        this.loadQuestions(this.pageIndex);
      })
    return await modal.present();
  }

}
