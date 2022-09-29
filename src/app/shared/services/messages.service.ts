import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
  })

  export class MessageService {

    constructor(private toast: ToastController) { }

    async sucess(message: string) {
        (await this.toast.create({ message: message, duration: 3000, color: 'success'})).present();    
    }

    async error(message: string) {
        (await this.toast.create({ message: message, duration: 3000, color: 'danger'})).present();    
    }

    async warning(message: string) {
        (await this.toast.create({ message: message, duration: 3000, color: 'warning'})).present();    
    }
      
  }