import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { finalize, Subject, takeUntil } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
})
export class RegisterForm implements OnInit, OnDestroy {

  form: FormGroup;
  private unsubscribeNotifier = new Subject<void>();

  constructor(
    public formBuilder: FormBuilder,
    public registerService: RegisterService) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmSenha: ['', [Validators.required]],
      term: ['', [Validators.required]],
    });
  }

  cadastrar() : void {console.log(this.form.value)
    this.registerService.create(this.form.value).pipe(
      takeUntil(this.unsubscribeNotifier)
    ).subscribe({
      next: register => {
        console.log('sucesso', register)
      },
      error: (error) => console.log(error, 'erro')
    });
  }

}
