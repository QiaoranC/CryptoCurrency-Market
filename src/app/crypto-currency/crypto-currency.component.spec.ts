import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCurrencyComponent } from './crypto-currency.component';

describe('CryptoCurrencyComponent', () => {
  let component: CryptoCurrencyComponent;
  let fixture: ComponentFixture<CryptoCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
