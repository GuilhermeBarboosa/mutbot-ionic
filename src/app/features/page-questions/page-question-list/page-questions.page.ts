import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { CardQuestionsListComponent } from 'src/app/shared/components/card-question-list/card-question-list.component';
import { ListParams } from 'src/app/shared/interfaces/list-params';
import { Question } from 'src/app/shared/interfaces/question';
import { Tag } from 'src/app/shared/interfaces/tag';
import { MessageService } from 'src/app/shared/services/messages.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { TagService } from 'src/app/shared/services/tag.service';
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

  tags: Tag[] = [];
  tagSelected: number

  pageIndex: number = 0;

  constructor(private modalCtrl: ModalController, private questionService: QuestionService, private messageService: MessageService, private tag: TagService,) {
  }
  items = [];
  ngOnInit() {
    this.loadQuestions(0);
    this.loadTag();
  }

  loadQuestions(index: number): void {
    this.params.pageIndex = index;
    console.log(index)
   
    this.questionService.load(this.params, this.tagSelected).pipe(
      takeUntil(this.unsubscribeNotifier),
    ).subscribe({
      next: data => {       
          this.questionArray = this.questionArray.concat(data.data);        
      },
      error: () =>this.messageService.error('Falha ao carregar Questões!')
    });
  }

  showSelectValue(selected) {
    this.pageIndex = 0;
    this.tagSelected = selected.value;
    this.questionArray = [];
    this.loadQuestions(this.pageIndex);
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
        this.questionArray = [];
        this.pageIndex = 0;
        this.loadQuestions(this.pageIndex);
      })
    return await modal.present();
  }

}
