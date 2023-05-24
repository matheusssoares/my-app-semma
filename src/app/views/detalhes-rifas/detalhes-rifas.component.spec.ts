import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesRifasComponent } from './detalhes-rifas.component';

describe('DetalhesRifasComponent', () => {
  let component: DetalhesRifasComponent;
  let fixture: ComponentFixture<DetalhesRifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesRifasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesRifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
