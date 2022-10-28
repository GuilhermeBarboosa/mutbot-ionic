import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsRoutes } from './questions.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(QuestionsRoutes)],
})
export class QuestionsModule {}
