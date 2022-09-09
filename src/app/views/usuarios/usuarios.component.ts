import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EditarUsuarioComponent } from 'src/app/components/editar-usuario/editar-usuario.component';
import { AuthService } from 'src/app/services/auth.service';
import { ControllerService } from 'src/app/services/controller.service';
import { EventSubscriberService } from 'src/app/services/event-subscriber.service';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  usuarios: any[] = [];
  loading: boolean = true;
  selectedData:any;
  constructor(
    private authService: AuthService,
    private controllerService: ControllerService,
    private eventSub: EventSubscriberService,
    private global: GlobalService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) {
    this.getSubscribe();
  }

  getSubscribe() {
    const sub = this.eventSub.getEvent().subscribe((data) => {
      if(data == 'success_toast') {
        this.addSingle();
      }
    });

    this.subscriptions.push(sub);

    const sub2 = this.eventSub.getEvent().subscribe((data) => {
      if(data == 'update_usuario') {
        this.getData();
      }
    });

    this.subscriptions.push(sub2);

    const sub3 = this.eventSub.getEvent().subscribe((data) => {
      if(data == 'success_toast_update') {
        this.addSingleUpdate();
      }
    });

    this.subscriptions.push(sub3);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
      let tabela = this.controllerService.getDataByOrderFull('usuarios', 'nome', 'asc').subscribe((data) => {
        this.usuarios = data;
        this.subscriptions.push(tabela);
        this.loading = false;
       });
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Parabéns!', detail:'Usuário cadastrado.'});
  }

  addSingleUpdate() {
    this.messageService.add({severity:'info', summary:'Parabéns!', detail:'Registro atualizado.'});
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe());
  }

  editar(usuario: any) {
    this.dialog.open(EditarUsuarioComponent, {
      height: '360px',
      width: '670px',
      data: {
        usuario: usuario
      }
    })
  }

  excluir(usuario: any) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir este registro?',
      header: 'Atenção!',
      icon: 'pi pi-info-circle',
      accept: async () => {
          try {
            /* APÓS DEVEMOS VOLTAR PARA DESABILITAR USUÁRIO DO AUTHSDK */
            const delete_user = await this.controllerService.delete('usuarios', usuario.key);
            if(delete_user == 'success') {
              this.messageService.add({severity:'success', summary:'Parabéns!', detail:'Registro deletado.'});
              //this.eventSub.setEvent('success_toast');
              this.eventSub.setEvent('update_usuario');
            }
          } catch (err) {
            this.global.showSweet('Opsss!', 'Tivemos um problema interno, favor tente mais tarde.', 'error');
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

}
