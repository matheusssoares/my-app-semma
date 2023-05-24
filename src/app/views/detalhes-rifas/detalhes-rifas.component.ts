import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ControllerService } from 'src/app/services/controller.service';
import { Rifa } from 'src/app/utils/rifa.model';

@Component({
  selector: 'app-detalhes-rifas',
  templateUrl: './detalhes-rifas.component.html',
  styleUrls: ['./detalhes-rifas.component.scss']
})
export class DetalhesRifasComponent implements OnInit {
  keyBilhete: string = '';
  subscriptions: Array<Subscription> = [];
  result: any;
  isSelected = false;
  tickets: any = [];
  selectedTickets: any[] = [];
  displaySidebar: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private controllerService: ControllerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.tickets = this.generateTickets().map(ticket => ({ numbers: ticket, isSelected: false }));;
    console.log(this.tickets);

    this.route.params.subscribe(params => {
      const id = params['key'];
     this.keyBilhete = id;
     this.buscarBilhete(this.keyBilhete);
    });
  }

  async buscarBilhete(keyBilhete: string) {
    const sub = this.controllerService.getDataById('rifas', 'key', keyBilhete).then((data: any) => {
     this.result = data[0];
     console.log(this.result);

    })

    ///this.subscriptions.push(sub);
  }

  voltar() {
    this.location.back();
  }

  toggleSelection(ticket: any, i:any): void {
    ticket.isSelected = !ticket.isSelected;
    ticket.indice = i;
    const index = this.selectedTickets.indexOf(ticket);
    if (index === -1) {
      this.selectedTickets.push(ticket); // Adiciona o ticket se ele não estiver no array
    } else {
      this.selectedTickets.splice(index, 1); // Remove o ticket se ele já estiver no array
    }

    if(this.selectedTickets.length) {
      this.displaySidebar = true;
    } else {
      this.displaySidebar = false;
    }
  }

  generateTickets(): number[][] {
    const tickets: number[][] = [];
    let count = 0;

    while (count <= 99) {
      const ticket: number[] = [];
      for (let i = 0; i < 4; i++) {
        ticket.push(count++);
      }
      tickets.push(ticket);
    }

    return tickets.slice(0, 25);
  }

  verArray() {
    console.log(this.selectedTickets);

  }

  getValueTickes() {
    var ret = this.result.precoBilhete * this.selectedTickets.length;
    return `R$ ${ret.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

}
