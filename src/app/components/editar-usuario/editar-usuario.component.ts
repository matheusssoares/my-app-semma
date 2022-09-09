import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/utils/validatorPassword';
import { ControllerService } from 'src/app/services/controller.service';
import { EventSubscriberService } from 'src/app/services/event-subscriber.service';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private controllerService: ControllerService,
    private eventSub: EventSubscriberService,
    private global: GlobalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.formBuilder.group({
      nome: [this.data.usuario.nome, [Validators.required, Validators.minLength(6)]],
      email: [this.data.usuario.email, [Validators.required, Validators.email]],
      password: [this.data.usuario.password, [Validators.required, Validators.minLength(6)]],
      confirm_password: [this.data.usuario.password, [Validators.required, Validators.minLength(6)]]
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
    delete this.form.value.confirm_password;
    delete this.form.value.email;
    delete this.form.value.password;
    let name: string = this.form.value.nome.toLowerCase();
    this.form.value.nome = name.toUpperCase();
    const update_usuario = await this.controllerService.updateData('usuarios', this.form.value, this.data.usuario.key);

    if(update_usuario == 'success') {
      this.spinner.hide();
      this.closeModal();
      this.eventSub.setEvent('success_toast_update');
      this.eventSub.setEvent('update_usuario');
    }
   } catch (err) {
    this.global.showSweet('Opsss!', 'Tivemos um problema interno, favor tente mais tarde.', 'error');
   }
  }

  closeModal() {
    this.dialog.closeAll();

  }

}
