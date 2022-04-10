import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from 'src/app/views/login/login.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forChild(routes), SharedModule, MaterialModule],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
