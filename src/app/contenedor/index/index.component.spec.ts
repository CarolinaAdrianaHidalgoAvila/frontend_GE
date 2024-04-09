import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexContenedorComponent } from './index.component';

describe('IndexContenedorComponent', () => {
  let component: IndexContenedorComponent;
  let fixture: ComponentFixture<IndexContenedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexContenedorComponent]
    });
    fixture = TestBed.createComponent(IndexContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
