import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-cadastrar-colaboradores',
  templateUrl: './cadastrar-colaboradores.component.html',
  styleUrls: ['./cadastrar-colaboradores.component.scss']
})
export class CadastrarColaboradoresComponent implements OnInit {

  public form: any = new FormGroup({

  });

  tipoChavePix = [
    {
      label: 'E-mail'
    },
    {
      label: 'Celular'
    },
    {
      label: 'CPF'
    },
    {
      label: 'Chave Aleatória'
    }
]

  sexo = [
    {
      label: 'Feminino'
    },
    {
      label: 'Masculino'
    },
    {
      label: 'Outro'
    }


  ];

  constructor(
    private formBuilder: FormBuilder,
    private config: PrimeNGConfig,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: [''],
      aniversario: [''],
      whatsapp:[''],
      endereco: [''],
      pix: [''],
      tipoChavePix: ['']
    })

    this.config.setTranslation({
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin:['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    })
  }

  async submit() {
  }

  closeModal() {
    this.dialog.closeAll();
  }


}
