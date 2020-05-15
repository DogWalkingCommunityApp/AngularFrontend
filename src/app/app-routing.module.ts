import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import {PasswortVergessenComponent} from './passwort-vergessen/passwort-vergessen.component';
import { RegistrationComponent } from './registration/registration.component';
import { DogIndexCardComponent } from './dog-index-card/dog-index-card.component';
import { AddDogFormComponent } from './add-dog-form/add-dog-form.component';
import { ProfileComponent} from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';
import {StrangersProfileComponent} from './strangers-profile/strangers-profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'strangersProfile', component: StrangersProfileComponent},
  { path: 'passwortVergessen', component: PasswortVergessenComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'dogIndexCard', component: DogIndexCardComponent },
  { path: 'addDogForm', component: AddDogFormComponent },
  { path: 'modal', component: ModalComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
