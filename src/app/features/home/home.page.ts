import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  form: FormGroup;
  private unsubscribeNotifier = new Subject<void>();
  
  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private authService: AuthService) {}
 

  ngOnInit() :void {
    this.createForm();
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

  login(): void {
    this.authService.login(this.form.get('userName').value, this.form.get('password').value).pipe(
      takeUntil(this.unsubscribeNotifier),
    ).subscribe({
      next: (data) => {console.log(data)
        this.messageService.sucess('Login efetuado com sucesso!');
        this.navCtrl.navigateForward('page');
      },
      error: () => {
        this.messageService.error('Falha no servidor entre em contato com administrador do sistema!')
        this.authService.logout();
      }
    });
  }


  abrirTela(){
    //Vai abrir a tela desejada, onde a mesma deve ser importada, assim, vou achamar a cadastroContaPage
    this.navCtrl.navigateForward('register');

  }

}
