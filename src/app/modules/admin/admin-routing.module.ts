import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarDenunciasComponent } from 'src/app/components/cadastrar-denuncias/cadastrar-denuncias.component';
import { HeaderSectionComponent } from 'src/app/components/header-section/header-section.component';
import { AdminComponent } from 'src/app/views/admin/admin.component';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';
import { DenunciasComponent } from 'src/app/views/denuncias/denuncias.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'denuncias',
        component: DenunciasComponent
      }
    ]   
  },
];

@NgModule({
  declarations: [AdminComponent, DenunciasComponent, HeaderSectionComponent, CadastrarDenunciasComponent],
  imports: [RouterModule.forChild(routes), SharedModule, MaterialModule],
  exports: [RouterModule],
})
export class AdminRoutingModule { }