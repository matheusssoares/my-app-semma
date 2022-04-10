import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDenunciasComponent } from './cadastrar-denuncias.component';

describe('CadastrarDenunciasComponent', () => {
  let component: CadastrarDenunciasComponent;
  let fixture: ComponentFixture<CadastrarDenunciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarDenunciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarDenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
