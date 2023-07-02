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
      title: 'RIFAS/SORTEIOS',
      icon: 'clipboard-outline',
    },
    {
      title: 'COLABORADORES',
      icon: 'person-done-outline',
    },
    {
      title: 'CLIENTES',
      icon: 'smiling-face-outline',
    },
    {
      title: 'CONFIGURAÇÕES',
      icon: { icon: 'settings-outline', pack: 'eva' },
    },
    {
      title: 'SUPORTE',
      icon: { icon: 'message-square-outline', pack: 'eva' },
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
   if(route == 'RIFAS/SORTEIOS') {
     this.global.router.navigateByUrl('admin/rifas');
   } else if (route == 'COLABORADORES') {
    this.global.router.navigateByUrl('admin/colaboradores');
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
