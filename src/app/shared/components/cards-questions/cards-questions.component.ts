import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-questions',
  templateUrl: './cards-questions.component.html',
  styleUrls: ['./cards-questions.component.css'],
})
export class CardsQuestionsComponent implements OnInit {
  @Input() valor = 0;

  plusLike() {
    this.valor++;
    this.likeColor(this.valor);
  }

  lessLike() {
    this.valor--;
    this.likeColor(this.valor);
  }

  likeColor(valor: number): void {
    if (valor <= 0) {
      console.log(valor);
    }
  }

  constructor() {}

  ngOnInit() {}
}
