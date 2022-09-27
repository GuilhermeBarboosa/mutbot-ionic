import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CommomModulesModule } from "./modules/commom-modules.module";


const modules = [
    CommomModulesModule
  ];

  const components = [
   
  ];
  
  const pipes = [
  ];
  
  @NgModule({
    declarations: [
      ... components,
      ... pipes,
    ],
    imports: [
      CommonModule,
      ... modules
    ],
    exports: [
      ... modules,
      ... components,
      ... pipes,
    ],
    providers: [
      {
        provide: Window,
        useValue: window
      }
    ]
  })
  export class SharedModule { }
  