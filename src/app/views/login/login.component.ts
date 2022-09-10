import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ControllerService } from 'src/app/services/controller.service';
import { EventSubscriberService } from 'src/app/services/event-subscriber.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});

  constructor(
    private controllerService: ControllerService,
    private eventSub: EventSubscriberService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    this.loginIsValid();
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    this.spinner.show();

    try {
      const buscar_usuario:any = await this.auth.login(this.form.value);
      if(buscar_usuario) {
        const validar:any = await this.controllerService.getDataById('usuarios', 'key', buscar_usuario);
        if (validar) {
          var data:any = validar[0];
          this.eventSub.setLocal('userData', data);
          this.spinner.hide();
          this.global.router.navigateByUrl('admin');
        }
      }

    } catch (err) {
      this.spinner.hide();
      console.log('deu erro ao logar');
    }


  }

  async loginIsValid() {
    try {
      const login = await this.auth.isLogged();
      if (login) {
        this.global.router.navigate(['admin/dashboard']);
      }
    } catch (err) {
      console.log('error é', err);

    }
  }

}
