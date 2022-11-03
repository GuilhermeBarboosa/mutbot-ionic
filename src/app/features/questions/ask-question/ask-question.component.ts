import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements OnInit {
  askQuestionForm: FormGroup = Object.create(null);

  constructor() {}

  ngOnInit() {
    this.createForm;
  }

  createForm(): void {
    this.askQuestionForm = new FormGroup({
      questionTitle: new FormControl(
        {
          value: null,
        },
        [Validators.required]
      ),
      questionContent: new FormControl(
        {
          value: null,
        },
        [Validators.required]
      ),
    });
  }

  onSubmit(): void {
    console.log('entro');
  }
}
