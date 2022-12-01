import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(platform: Platform,
    private router: Router,
    private authService: AuthService) {
    platform.ready().then(() => {
    });
  }

  ngOnInit() {
    if (this.authService.isLogged()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
