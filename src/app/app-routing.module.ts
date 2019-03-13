import { AccueilComponent } from './components/accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TachesListComponent } from './components/taches-list/taches-list.component';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path:'accueil',
    component : AccueilComponent,
    data: { title: 'Accueil'}
  },
  {
    path:'boite',
    component :  TachesListComponent,
    data: { title: 'Boite de réception'}
  },
  {
    path: 'today',
    component : TachesListComponent,
    data: { title: 'Aujourd\'hui'}
  },
  {
    path:'week',
    component :  TachesListComponent,
    data: { title: '7 prochains jours'}
  },
  {
    path:'dashboard',
    component :  TachesListComponent,
    data: { title: 'Dashboard'}
  },
  {
    path:'connexion',
    component : LoginComponent,
    data: { title: 'Connexion'}
  },
  {
    path:'user',
    component : UserComponent,
    data: { title: 'User'}
  },
  {
    path:'',
    redirectTo : 'user', //TODO remettre 'user'
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
