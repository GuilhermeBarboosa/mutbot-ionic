import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageQuestionsPageRoutingModule } from './page-questions-routing.module';

import { PageQuestionsPage } from './page-question-list/page-questions.page';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { CardQuestionsComponent } from 'src/app/shared/components/cards-questions/cards-questions.component';
import { CardQuestionsListComponent } from 'src/app/shared/components/card-question-list/card-question-list.component';
import { PageQuestionsForm } from './page-question-form/page-questions-form.page';
import { SharedModule } from 'src/app/shared/shared.module';
;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageQuestionsPageRoutingModule,
    SharedModule
  ],
  declarations: [PageQuestionsPage, NavbarComponent, CardQuestionsComponent, CardQuestionsListComponent, PageQuestionsForm],
})
export class PageQuestionsPageModule {}
