import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarDenunciasComponent } from '../cadastrar-denuncias/cadastrar-denuncias.component';

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
    }

  }

}
