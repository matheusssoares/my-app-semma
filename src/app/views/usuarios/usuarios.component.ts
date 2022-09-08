import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription, of } from 'rxjs';
import { ControllerService } from 'src/app/services/controller.service';
import { EventSubscriberService } from 'src/app/services/event-subscriber.service';
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
    private controllerService: ControllerService,
    private eventSub: EventSubscriberService,
    private messageService: MessageService
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
  }

  ngOnInit(): void {
    console.log('oninit');
    
    this.getData();
  }

  getData() {
      let tabela = this.controllerService.getDataByOrderFull('usuarios', 'nome', 'asc').subscribe((data) => {
        this.usuarios = data;
        this.subscriptions.push(tabela);
        this.loading = false;
        console.log('getdata');
       });   
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Parabéns!', detail:'Usuário cadastrado.'});
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe());
  }
  clear(table: Table) {
    table.clear();
}

}
