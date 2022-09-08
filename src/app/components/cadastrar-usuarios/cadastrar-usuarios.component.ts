import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ControllerService } from 'src/app/services/controller.service';
import { EventSubscriberService } from 'src/app/services/event-subscriber.service';
import { GlobalService } from 'src/app/services/global.service';
import { ConfirmedValidator } from 'src/app/utils/validatorPassword';

@Component({
  selector: 'app-cadastrar-usuarios',
  templateUrl: './cadastrar-usuarios.component.html',
  styleUrls: ['./cadastrar-usuarios.component.scss']
})
export class CadastrarUsuariosComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  campo: string = "password";
  campoConfirm: string = "password";
  constructor(
    public dialog: MatDialog,
    public controller: ControllerService,
    private eventSub: EventSubscriberService,
    private formBuilder: FormBuilder,
    private global: GlobalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  get f(){
    return this.form.controls;
  }

  async submit() {
    this.spinner.show();
      try {
        this.form.value.create_in = new Date();
        let name: string = this.form.value.nome.toLowerCase();
        this.form.value.nome = name.toUpperCase();
        const authService:any = await this.controller.createAccount(this.form.value.email, this.form.value.password);
        if(authService.message == 'success') {
          delete this.form.value.confirm_password;
          this.form.value.key = authService.key;
          this.form.value.status = true;
          this.form.value.perfil = 'ADMINISTRADOR';
          const validation = await this.controller.create('usuarios', this.form.value, this.form.value.key)
          this.spinner.hide();
          if (validation) {
            this.closeModal();            
            //await this.global.showSToast('success', 'Parabéns!', 'Usuário cadastrado.');
            this.eventSub.setEvent('success_toast');
            this.eventSub.setEvent('update_usuario');
          }
        }

      } catch (err) {
        console.log('error =>', err);
        
        this.spinner.hide();
        if(err == 'auth/email-already-in-use') {
          this.global.showSweet('Opsss!', 'Este e-mail já está vinculado em outra conta, tente outro.', 'error');
        } else if (err == 'auth/invalid-email') {
          this.global.showSweet('Opsss!', 'E-mail inválido, tente outro.', 'error');
        } else {
          this.global.showSweet('Opsss!', 'Tivemos um problema interno, favor tente mais tarde.', 'error');
        }
      }
  }

  async closeModal() {
    this.dialog.closeAll();
  }

  displaySenha(campo: string) {
    this.campo = campo === 'password' ? 'text' : 'password';
  }

  displayConfirm(campo2: string) {
    this.campoConfirm = campo2 === 'password' ? 'text' : 'password';
  }
}
