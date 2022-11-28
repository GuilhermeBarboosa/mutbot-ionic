import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/shared/services/messages.service';
@Component({
  selector: 'app-register',
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
})
export class RegisterForm implements OnInit, OnDestroy {

  form: FormGroup;
  private unsubscribeNotifier = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private location: Location,
    private messageService: MessageService) { }

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
        this.messageService.sucess('Cadastro efetuado com sucesso!');
        this.location.back();
      },
      error: (error) => this.messageService.error('Falha no servidor entre em contato com administrador do sistema!')
    });
  }
}
