import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent]
    });
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the message correctly', () => {
    const testMessage = 'Test message';
    component.message = testMessage;
    fixture.detectChanges();

    const messageElement = fixture.nativeElement.querySelector('.card-text');
    expect(messageElement.textContent).toContain(testMessage);
  });
});
