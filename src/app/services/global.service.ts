import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon, SweetAlertInput } from 'sweetalert2';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(
    private messageService: MessageService,
    public router: Router,
  ) { }

 async showSToast(status: string, title: string, message: string) {
 
    await this.messageService.add({ severity:status, summary:title, detail:message });
    //this.toastrService.show(message, title, {status: status, duration: 3000, icon: iconConfig, position: this.physicalPositions.TOP_RIGHT})
  }

  async showSweet(title: string, html: string, icon: SweetAlertIcon) {

    return await Swal.fire({
      heightAuto: false,
      html: html,
      title: title,
      icon: icon,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3847A0'
    });
    
  }
}
