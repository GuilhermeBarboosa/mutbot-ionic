import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Question } from '../../interfaces/question';
import { CardQuestionsListComponent } from '../card-question-list/card-question-list.component';

@Component({
  selector: 'app-cards-questions',
  templateUrl: './cards-questions.component.html',
  styleUrls: ['./cards-questions.component.css']
})
export class CardQuestionsComponent implements OnInit {

  @Input() question: Question;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.question);
  }

  async viewQuestion(question: Question) {console.log(question);
    const modal = await this.modalCtrl.create({
      component: CardQuestionsListComponent, componentProps: { question: question}
    });
    return await modal.present();
  }

}
