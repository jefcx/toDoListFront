import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-ajout-tache',
  templateUrl: './ajout-tache.component.html',
  styleUrls: ['./ajout-tache.component.scss']
})
export class AjoutTacheComponent implements OnInit {

  public isDisabled: boolean = true;

  @Output() tache: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public isActived(): void {
    this.isDisabled = false;
  }

  public isStopped(): void {
    this.isDisabled = true;
  }

  public addTache(value: string): void {
    console.log(value);
    this.tache.emit(
      {
        id: 99,
        contenu: value,
        dateEcheance: moment(),
        priorite: 0,
          projet: {
            id: 1,
            libelle: 'sport'
          }
      }
    );
  }

}
