import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageQuestionsPage } from './page-question-list/page-questions.page';

const routes: Routes = [
  {
    path: '',
    component: PageQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageQuestionsPageRoutingModule {}
