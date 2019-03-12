import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TacheComponent } from './components/tache/tache.component';
import { TachesListComponent } from './components/taches-list/taches-list.component';
import { MatRadioModule, MatCardModule, MatGridListModule, MatIconModule,
  MatMenuModule, MatToolbarModule, MatButtonModule, MatDialogModule,
  MatListModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule,
  MatCheckboxModule, MatFormField, MatOptionModule, MatSelectModule, MatAutocompleteModule,
  MatInputModule, MatProgressSpinnerModule,MatButtonToggleModule } from '@angular/material';
import { TacheDialogComponent } from './components/tache-dialog/tache-dialog.component';
import { AjoutTacheComponent } from './components/ajout-tache/ajout-tache.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { TaskNotifierService } from './shared/notifier/task-notifier.service';
import { TextAreaValueDirective } from './shared/directives/text-area-value.directive';
import { MomentPipePipe } from './shared/pipes/moment-pipe.pipe';
import { ProjetDialogComponent } from './components/projet-dialog/projet-dialog.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './components/user/user.component';
import { TodayComponent } from './components/today/today.component';


@NgModule({
  declarations: [
    AppComponent,
    TacheComponent,
    TachesListComponent,
    TacheDialogComponent,
    AjoutTacheComponent,
    TextAreaValueDirective,
    MomentPipePipe,
    ProjetDialogComponent,
    RegistrationComponentComponent,
    AccueilComponent,
    LoginComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    ClickOutsideModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    RouterModule.forRoot([
        { path: '', redirectTo: '/', pathMatch: 'full' },
        { path: 'register', component: RegistrationComponentComponent },
        { path: 'login', component: LoginComponent },
      ]),
    ],

  providers: [TaskNotifierService],
  bootstrap: [AppComponent],
  entryComponents: [TacheDialogComponent, ProjetDialogComponent]
})
export class AppModule { }
