import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ToolbarItemComponent } from './components/toolbar-item/toolbar-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppLayoutComponent,
    ToolbarItemComponent,
    MainMenuComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class CoreModule {}
