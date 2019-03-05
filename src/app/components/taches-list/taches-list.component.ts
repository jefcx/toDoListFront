import { Component, OnInit } from '@angular/core';
import { TacheInterface } from 'src/app/interfaces/tache';
import * as moment from 'moment';

@Component({
  selector: 'app-taches-list',
  templateUrl: './taches-list.component.html',
  styleUrls: ['./taches-list.component.scss']
})
export class TachesListComponent implements OnInit {

  public taches: Array<TacheInterface>;

  constructor() {
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
  }

}
