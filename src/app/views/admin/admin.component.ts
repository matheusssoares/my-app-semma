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
      title: 'MULTAS',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
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
   }
    
  }

}
