import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageQuestionsPageRoutingModule } from './page-questions-routing.module';

import { PageQuestionsPage } from './page-questions.page';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageQuestionsPageRoutingModule,
  ],
  declarations: [PageQuestionsPage, NavbarComponent],
})
export class PageQuestionsPageModule {}