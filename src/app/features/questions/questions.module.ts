import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsRoutes } from './questions.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(QuestionsRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class QuestionsModule {}
