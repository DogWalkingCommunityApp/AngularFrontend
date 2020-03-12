import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DogIndexCardComponent } from './dog-index-card.component';

describe('DogIndexCardComponent', () => {
  let component: DogIndexCardComponent;
  let fixture: ComponentFixture<DogIndexCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogIndexCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DogIndexCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
