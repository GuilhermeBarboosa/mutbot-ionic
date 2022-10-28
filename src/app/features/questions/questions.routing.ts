import { Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question/ask-question.component';

export const QuestionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ask',
        component: AskQuestionComponent,
      },
    ],
  },
];
