import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterForm } from './registerForm/register-form';



const routes: Routes = [
  {
    path: '',
    component: RegisterForm
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
