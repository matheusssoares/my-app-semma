import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ControllerService } from 'src/app/services/controller.service';
import { Rifa } from 'src/app/utils/rifa.model';

@Component({
  selector: 'app-rifas',
  templateUrl: './rifas.component.html',
  styleUrls: ['./rifas.component.scss']
})
export class RifasComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  results: any = [];
  filtros = ['titulo','dataFim'];
  loading: boolean = true;
  visible: boolean = true;
  constructor(
    private messageService: MessageService,
    private controllerService: ControllerService,
    private routes: Router,
    private confirmationService: ConfirmationService
  ) { }

 async ngOnInit() {
    const results = (await this.controllerService.getDataAllRifas('rifas')).subscribe(data => {
      this.results = data;
      this.loading = false;
      this.show();
    });

    this.subscriptions.push(results);
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Aviso!', detail: 'Dados atualizados!' });
  }

  detalhes(result: Rifa) {
    this.routes.navigateByUrl(`admin/rifas/${result.key}`);

  }

  excluir(result: Rifa) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esta rifa?',
      header: 'Atenção!',
      icon: 'pi pi-info-circle',
      accept: async () => {
          try {
            /* APÓS DEVEMOS VOLTAR PARA DESABILITAR USUÁRIO DO AUTHSDK */
            const delete_user = await this.controllerService.delete('rifas', `${result.key}`);
            if(delete_user == 'success') {
              this.messageService.add({severity:'success', summary:'Informação!', detail:'Registro deletado.'});
              //this.eventSub.setEvent('success_toast');
              //this.eventSub.setEvent('update_usuario');
            }
          } catch (err) {
            console.error(err);

            //this.global.showSweet('Opsss!', 'Tivemos um problema interno, favor tente mais tarde.', 'error');
          }
      },
      reject: (type: any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                 // this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                 console.log('operação rejeitada');

              break;
              case ConfirmEventType.CANCEL:
                  //this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                  console.log('operação cancelada');
              break;
          }
      }

  });
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

}
