import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon, SweetAlertInput } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    public router: Router
  ) { }

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
