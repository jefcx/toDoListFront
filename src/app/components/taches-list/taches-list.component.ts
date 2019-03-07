import { TaskNotifierService } from './../../shared/notifier/task-notifier.service';
import { Component, OnInit, Input } from '@angular/core';
import { TacheInterface } from 'src/app/interfaces/tache';

import { Subscription } from 'rxjs';

import * as moment from 'moment';

@Component({
  selector: 'app-taches-list',
  templateUrl: './taches-list.component.html',
  styleUrls: ['./taches-list.component.scss']
})
export class TachesListComponent implements OnInit {

  @Input() tacheAdd: TacheInterface;

  public taches: Array<TacheInterface>;


  constructor(private notifier: TaskNotifierService) {
    this.taches = new Array<TacheInterface>();
  }

  ngOnInit() {


    this.taches.push(
      {
        id: 1,
        contenu: 'blabla',
        dateEcheance: moment(),
        priorite: 0,
        projet: {
          id: 1,
          libelle: 'sport'
        }
      },
      {
        id: 2,
        contenu: 'ahah',
        dateEcheance: moment(),
        priorite: 1,
        projet: {
          id: 2,
          libelle: 'cacaprout'
        }
        },
        {
          id: 3,
          contenu: 'ahah',
          dateEcheance: moment(),
          priorite: 2,
          projet: {
            id: 3,
            libelle: 'cacaprout'
          }
      }
    );
    console.log(this.taches);

    this.notifier.taskShare.subscribe((task) => {
      if (task) {
        console.log('Notification de tâche : ' + JSON.stringify(task));
        this.taches.push(task);
      }
    });

  }

  public addTache(tache:TacheInterface):void{
    this.taches.push(tache);
    console.log("tacheListComponent::addTache::" + this.taches.length);
    console.log(this.taches);
  }
}
