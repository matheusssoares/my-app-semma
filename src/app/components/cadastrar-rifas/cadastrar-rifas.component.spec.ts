import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarRifasComponent } from './cadastrar-rifas.component';

describe('CadastrarRifasComponent', () => {
  let component: CadastrarRifasComponent;
  let fixture: ComponentFixture<CadastrarRifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarRifasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarRifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
