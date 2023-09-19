import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRutaComponent } from './index.component';

describe('IndexRutaComponent', () => {
  let component: IndexRutaComponent;
  let fixture: ComponentFixture<IndexRutaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexRutaComponent]
    });
    fixture = TestBed.createComponent(IndexRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
