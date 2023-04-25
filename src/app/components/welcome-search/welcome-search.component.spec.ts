import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSearchComponent } from './welcome-search.component';

describe('WelcomeSearchComponent', () => {
  let component: WelcomeSearchComponent;
  let fixture: ComponentFixture<WelcomeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
