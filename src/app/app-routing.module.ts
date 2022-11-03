import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },

  {
    path: 'page',
    loadChildren: () =>
      import('./features/page-questions/page-questions.module').then(
        (m) => m.PageQuestionsPageModule
      ),
  },
  {
    path: 'flow',
    loadChildren: () =>
      import('./flow/flow.module').then((m) => m.FlowPageModule),
  },

  {
    path: 'questions',
    loadChildren: () =>
      import('./features/questions/questions.module').then(
        (m) => m.QuestionsModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
