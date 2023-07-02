import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarDenunciasComponent } from '../cadastrar-denuncias/cadastrar-denuncias.component';
import { CadastrarUsuariosComponent } from '../cadastrar-usuarios/cadastrar-usuarios.component';
import { CadastrarRifasComponent } from '../cadastrar-rifas/cadastrar-rifas.component';
import { CadastrarColaboradoresComponent } from '../cadastrar-colaboradores/cadastrar-colaboradores.component';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent implements OnInit {
  @Input() title: string = '';
  @Input() button: string = '';
  @Input() action: string = '';

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(action: string) {
    switch (action) {
      case 'denuncias':
        this.dialog.open(CadastrarDenunciasComponent, {
          height: '600px',
          width: '785px',
        })
        break;

        case 'usuarios':
          this.dialog.open(CadastrarUsuariosComponent, {
            height: '360px',
            width: '670px',
          })
          break;

        case 'rifas':
          this.dialog.open(CadastrarRifasComponent, {
            height: '800px',
            width: '885px'
          })
          break;

        case 'colaboradores':
          this.dialog.open(CadastrarColaboradoresComponent, {
            height: '860px',
            width: '700px'
          })
    }

  }

}
