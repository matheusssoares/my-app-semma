import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'INÍCIO',
      icon: 'home-outline',
    },
    {
      title: 'DENÚNCIAS',
      icon: 'clipboard-outline',
    },
    {
      title: 'SOLICITAÇÕES',
      icon: 'volume-up-outline',
    },
    {
      title: 'FISCALIZAÇÕES',
      icon: 'search-outline',
    },
    {
      title: 'SERVIÇOS',
      icon: { icon: 'paper-plane-outline', pack: 'eva' },
    },
    {
      title: 'NOTÍCIAS',
      icon: { icon: 'message-square-outline', pack: 'eva' },
    },
    {
      title: 'CARGOS',
      icon: 'lock-outline',
    },
    {
      title: 'FUNCIONÁRIOS',
      icon: 'people-outline',
    },
    {
      title: 'USUÁRIOS',
      icon: 'person-outline',
    },
    {
      title: 'RELATÓRIOS',
      icon: 'pie-chart-outline',
    },
    {
      title: 'DESCONECTAR',
      icon: 'log-out-outline'
    },
  ];
  
  constructor(
    private menu: NbMenuService,
    private global: GlobalService
  ) { 
    this.menu.onItemClick().subscribe((data: any) => {
      this.navigate(data.item.title);
    })
  }

  ngOnInit(): void {

  }

  navigate(route: string) {
   if(route == 'DENÚNCIAS') {
     this.global.router.navigateByUrl('admin/denuncias');
   } else if (route == 'SOLICITAÇÕES') {
    this.global.router.navigateByUrl('admin/solicitacoes');
   } else if (route == 'FISCALIZAÇÕES'){
    this.global.router.navigateByUrl('admin/fiscalizacoes');
   } else if (route == 'SERVIÇOS') {
    this.global.router.navigateByUrl('admin/servicos');
   } else if (route == 'CARGOS') {
    this.global.router.navigateByUrl('admin/cargos');
   } else if (route == 'FUNCIONÁRIOS') {
    this.global.router.navigateByUrl('admin/funcionarios');
   } else if (route == 'USUÁRIOS') {
    this.global.router.navigateByUrl('admin/usuarios');
   } else if (route == 'RELATÓRIOS') {
    this.global.router.navigateByUrl('admin/relatorios');
   } else if (route == 'DESCONECTAR') {
    alert('sair');
   }
    
  }

}
