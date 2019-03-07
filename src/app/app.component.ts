import { Component } from '@angular/core';
import { TacheInterface } from './interfaces/tache';
import { TachesListComponent } from './components/taches-list/taches-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toDoList';
  tacheAdd: TacheInterface;
  tacheCompo: TachesListComponent;

  constructor() {
  }
}
