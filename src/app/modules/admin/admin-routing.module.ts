import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarDenunciasComponent } from 'src/app/components/cadastrar-denuncias/cadastrar-denuncias.component';
import { CadastrarUsuariosComponent } from 'src/app/components/cadastrar-usuarios/cadastrar-usuarios.component';
import { EditarUsuarioComponent } from 'src/app/components/editar-usuario/editar-usuario.component';
import { HeaderSectionComponent } from 'src/app/components/header-section/header-section.component';
import { AdminComponent } from 'src/app/views/admin/admin.component';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';
import { DenunciasComponent } from 'src/app/views/denuncias/denuncias.component';
import { UsuariosComponent } from 'src/app/views/usuarios/usuarios.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RifasComponent } from 'src/app/views/rifas/rifas.component';
import { CadastrarRifasComponent } from 'src/app/components/cadastrar-rifas/cadastrar-rifas.component';
import { DetalhesRifasComponent } from 'src/app/views/detalhes-rifas/detalhes-rifas.component';
import { ColaboradoresComponent } from 'src/app/views/colaboradores/colaboradores.component';
import { CadastrarColaboradoresComponent } from 'src/app/components/cadastrar-colaboradores/cadastrar-colaboradores.component';

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
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'rifas',
        component: RifasComponent
      },
      {
        path: 'rifas/:key',
        component: DetalhesRifasComponent
      },
      {
        path: 'colaboradores',
        component: ColaboradoresComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    DenunciasComponent,
    HeaderSectionComponent,
    CadastrarDenunciasComponent,
    UsuariosComponent,
    CadastrarUsuariosComponent,
    EditarUsuarioComponent,
    RifasComponent,
    CadastrarRifasComponent,
    DetalhesRifasComponent,
    ColaboradoresComponent,
    CadastrarColaboradoresComponent
  ],
  imports: [RouterModule.forChild(routes), SharedModule, MaterialModule],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
