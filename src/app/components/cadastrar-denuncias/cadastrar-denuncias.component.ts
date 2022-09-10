import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt-BR';
import { NgxSpinnerService } from 'ngx-spinner';
import { ControllerService } from 'src/app/services/controller.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-cadastrar-denuncias',
  templateUrl: './cadastrar-denuncias.component.html',
  styleUrls: ['./cadastrar-denuncias.component.scss']
})
export class CadastrarDenunciasComponent implements OnInit {
  form = new FormGroup({});
  denuncia_em = format(new Date(), 'dd/MM/yyyy', { locale: pt });
  html = '';
  editor: any;
  usuario: any;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    public dialog: MatDialog,
    public controller: ControllerService,
    private formBuilder: FormBuilder,
    private global: GlobalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.editor = new Editor();
    this.emulaForm();

    //this.controller.generateNumberProtocol('denuncias');
  }

  emulaForm() {

    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(6)]],
      apelido: ['',],
      rg: ['',],
      cpf: ['',],
      contato: ['',],
      endereco: ['',],
      data_denuncia: [`${this.denuncia_em}`, [Validators.required]],
      prioridade: ['ALTA', [Validators.required]],
      servidor_responsavel: ['MATHEUS SOARES', [Validators.required, Validators.minLength(6)]],
      descricao_denuncia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  isAnonimo(event: any) {
    if (event.checked) {
      this.form.get('nome')?.setValue('ANÔNIMO');
      this.form.get('apelido')?.setValue('NÃO IDENTIFICADO');
      this.form.get('rg')?.setValue('0000000');
      this.form.get('cpf')?.setValue('00000000000');
      this.form.get('contato')?.setValue('00000000000');
    } else {
      this.emulaForm();
    }

  }

  async submit() {
    this.spinner.show();

    setTimeout(async () => {
      try {
        const protocolo = await this.controller.generateNumberProtocol('denuncias');
        this.form.value.protocolo = protocolo;
        this.form.value.create_in = new Date();
        this.form.value.status = 1; //1 aguardando, 2 fiscalizando, 3 finalizada;
        const validation = await this.controller.create('denuncias', this.form.value, false)
        this.spinner.hide();
        if (validation) {
          /* await this.global.showSweet('Parabéns!', 'Sua denúncia foi cadastrada com sucesso!', 'success').then(() => {
            this.closeModal();
          }) */
          this.closeModal();
         // await this.global.showSToast('success', 'Parabéns!', 'Sua denúncia foi cadastrada com sucesso!');

        }

      } catch (err) {
        this.spinner.hide();
        this.global.showSweet('Opssss!', 'Tivemos um problema interno, favor tente mais tarde.', 'error');
      }
    }, 2000)

    //console.log(this.form.value);

  }

}
