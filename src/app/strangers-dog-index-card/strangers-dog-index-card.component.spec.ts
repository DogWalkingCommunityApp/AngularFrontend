import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StrangersDogIndexCardComponent } from './strangers-dog-index-card.component';

describe('StrangersDogIndexCardComponent', () => {
  let component: StrangersDogIndexCardComponent;
  let fixture: ComponentFixture<StrangersDogIndexCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrangersDogIndexCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StrangersDogIndexCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
