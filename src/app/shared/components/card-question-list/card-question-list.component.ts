import { Component, OnInit, Input } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, NavController, NavParams } from '@ionic/angular';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'card-questions-list',
  templateUrl: './card-question-list.component.html',
  styleUrls: ['./card-question-list.component.css']
})
export class CardQuestionsListComponent implements OnInit {
  
  question: Question

  item = ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ', 'aaaa', 'aaa'];
  constructor(private modalCtrl: ModalController, public navParams: NavParams) { 
    this.question = navParams.get('question');
    console.log(this.question)
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onIonInfinite(ev) {
    // this.pageIndex = (this.pageIndex + 1);
    // this.loadQuestions(this.pageIndex);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
