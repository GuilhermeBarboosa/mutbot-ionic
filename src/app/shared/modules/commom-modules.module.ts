import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask'
import { NgxCurrencyModule } from "ngx-currency";

const modules = [
  FormsModule,
  ReactiveFormsModule,
  NgxCurrencyModule
];

@NgModule({
  declarations: [],
  imports: [
    ... modules,
    NgxMaskModule.forRoot()
  ],
  exports: [
    ... modules,
    NgxMaskModule
  ]
})
export class CommomModulesModule {}
