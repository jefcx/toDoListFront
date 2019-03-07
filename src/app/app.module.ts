import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TacheComponent } from './components/tache/tache.component';
import { TachesListComponent } from './components/taches-list/taches-list.component';
import { MatRadioModule, MatCardModule, MatGridListModule, MatIconModule,
  MatMenuModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatListModule, MAT_DIALOG_DATA, MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { TacheDialogComponent } from './components/tache-dialog/tache-dialog.component';
import { AjoutTacheComponent } from './components/ajout-tache/ajout-tache.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { TaskNotifierService } from './shared/notifier/task-notifier.service';

@NgModule({
  declarations: [
    AppComponent,
    TacheComponent,
    TachesListComponent,
    TacheDialogComponent,
    AjoutTacheComponent
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
    MatCheckboxModule
  ],
  providers: [TaskNotifierService],
  bootstrap: [AppComponent],
  entryComponents: [TacheDialogComponent]
})
export class AppModule { }
