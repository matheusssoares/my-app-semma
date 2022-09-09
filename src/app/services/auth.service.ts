import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { take, tap } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public globalService: GlobalService,
    private spinner: NgxSpinnerService
  ) { }

  async login(form: any) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(form.email, form.pass).then(() => {
        resolve(true);
      }).catch(async (err) => {
        this.spinner.hide();
        switch ((err.code)) {
          case 'auth/user-not-found':
            await this.globalService.showSweet('Opsss!', 'Usuário não encontrado em nossa base de dados.', 'error');
            break;

          case 'auth/invalid-email':
            await this.globalService.showSweet('Opsss!', 'E-mail inválido, por favor digite corretamente.', 'error');
            break;

          case 'auth/user-disabled':
            await this.globalService.showSweet('Opsss!', 'Usuário está bloqueado.', 'error');
            break;

          case 'auth/wrong-password':
            await this.globalService.showSweet('Opsss!', 'Senha não confere com a cadastrada em nossa base de dados.', 'error');
            break;
        }
      })
    })
  }

  isLogged() {
    return new Promise((resolve, reject) => {
      this.auth.authState.pipe(tap(), take(1)).subscribe((data: any) => {
        if (data) {
          resolve(true);
        } else {
          reject(false);
        }
      })
    })
  }

  disableUser(uid: string) {
   /*  return new Promise((resolve, reject) => {
      this.auth.updateCurrentUser(user)
    }) */
  }
}
