import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { ControllerService } from 'src/app/services/controller.service';
import { Rifa } from 'src/app/utils/rifa.model';

@Component({
  selector: 'app-cadastrar-rifas',
  templateUrl: './cadastrar-rifas.component.html',
  styleUrls: ['./cadastrar-rifas.component.scss']
})
export class CadastrarRifasComponent implements OnInit {
  public form: any = new FormGroup({

  });
  uploadedFiles: any[] = [];
  date = Date;
  maxNums = [
    {
      label: '100 Números - (00 à 99)',
      value: 100
    },
    {
      label: '200 Números - (00 à 199)',
      value: 200
    },
    {
      label: '300 Números - (00 à 299)',
      value: 300
    },
    {
      label: '400 Números - (00 à 399)',
      value: 400
    },
    {
      label: '500 Números - (00 à 499)',
      value: 500
    },
    {
      label: '600 Números - (00 à 599)',
      value: 600
    },
    {
      label: '700 Números - (00 à 699)',
      value: 700
    },
    {
      label: '800 Números - (00 à 799)',
      value: 800
    },
    {
      label: '900 Números - (00 à 899)',
      value: 900
    },
    {
      label: '1.000 Números - (00 à 999)',
      value: 1000
    },
    {
      label: '2.000 Números - (00 à 1.999)',
      value: 2000
    },
    {
      label: '3.000 Números - (00 à 2.999)',
      value: 3000
    },
    {
      label: '4.000 Números - (00 à 3.999)',
      value: 4000
    },
    {
      label: '5.000 Números - (00 à 4.999)',
      value: 5000
    },
    {
      label: '10.000 Números - (00 à 9.999)',
      value: 10000
    },
  ]

  tipoSorteio = [
    {
      label: 'Sorteador Online'
    },
    {
      label: 'Loteria Federal'
    },
    {
      label: 'Deu no Poste'
    },
    {
      label: 'Indicador',
    },
    {
      label: 'Sistema Interno',
    }


  ];

  urlPath: any = '';

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private config: PrimeNGConfig,
    private controllerService: ControllerService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    await this.montarForm();
  }

  async montarForm() {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      tipoSorteio: ['', [Validators.required]],
      descricao: [''],
      foto: [''],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      qtdeNumPorBilhete: [4, [Validators.required]],
      precoBilhete: ['', [Validators.required]],
      numMaxBilhete: [0, [Validators.required]],
      limiteExpiracao: [],
      percentualCambista: [30, [Validators.required]],
      numMinBilhete: [75, [Validators.required]],
      linkWhatsApp: ['']
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
    if(!this.uploadedFiles[0]) {
      return;
     } else {
      try {
        this.spinner.show();
        this.urlPath = await this.controllerService.uploadFiles(this.uploadedFiles[0]);
        const formulario: Rifa = {
         cambista: '',
         dataFim: this.form.value.dataFim,
         dataInicio: this.form.value.dataInicio,
         descricao: this.form.value.descricao,
         numBilhetesRestante: this.form.value.numMaxBilhete.value / this.form.value.qtdeNumPorBilhete,
         numBilhetesVendidos: 0,
         numMaxBilhete: this.form.value.numMaxBilhete,
         numMinBilhete: this.form.value.numMinBilhete,
         participantes: null,
         percentualCambista: this.form.value.percentualCambista,
         precoBilhete: this.form.value.precoBilhete,
         qtdeNumPorBilhete: this.form.value.qtdeNumPorBilhete,
         status: 1,
         tempoExpiracao: this.form.value.limiteExpiracao,
         titulo: this.form.value.titulo,
         vencedor: null,
         foto: this.urlPath,
         key: this.controllerService.generateKey(),
         generateBilhete: false
       }

       try {
         await this.controllerService.create('rifas', formulario, formulario.key).then(() => {
           this.spinner.hide();
           this.closeModal();
         })

       } catch (err) {
         this.spinner.hide();
         console.warn(err);

       }

       } catch (err) {
        console.warn(err);

       }
     }

  }

  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
