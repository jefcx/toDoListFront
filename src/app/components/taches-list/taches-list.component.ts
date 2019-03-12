import { TaskNotifierService } from './../../shared/notifier/task-notifier.service';
import { Component, OnInit, Input } from '@angular/core';
import { TacheInterface } from 'src/app/interfaces/tache';

import * as moment from 'moment';

@Component({
  selector: 'app-taches-list',
  templateUrl: './taches-list.component.html',
  styleUrls: ['./taches-list.component.scss']
})
export class TachesListComponent implements OnInit {

  @Input() tacheAdd: TacheInterface;

  public taches: Array<TacheInterface>;

  public orderBy: string = 'Date';
  private orderByValue: boolean = false;

  constructor(private notifier: TaskNotifierService) {

    this.taches = new Array<TacheInterface>();
  }

  ngOnInit() {


    this.taches.push(
      {
        id: 1,
        contenu: 'blabla',
        dateEcheance: moment('2019-06-06'),
        priorite: 0,
        projet: {
          id: 1,
          libelle: 'sport'
        }
      },
      {
        id: 2,
        contenu: 'ahah',
        dateEcheance: moment('2019-06-06'),
        priorite: 1,
        projet: {
          id: 2,
          libelle: 'cacaprout'
        }
        },
        {
          id: 3,
          contenu: 'bidoowap',
          dateEcheance: moment(),
          priorite: 2,
          projet: {
            id: 3,
            libelle: 'cuisine'
          }
      }
    );
    console.log(this.taches);
    this.taches.sort((a, b) => {
      return moment(a.dateEcheance).diff(moment(b.dateEcheance))
    });
    this.notifier.taskShare.subscribe((task) => {
      if (task) {

        let deleteMode: boolean = task.hasOwnProperty('delete') && task.delete;
        let modifyMode: boolean = task.hasOwnProperty('modify') && task.modify;

        if (deleteMode) {
          console.log('Suppression demandée ' + task.id);
          this.taches.splice(this.taches.indexOf(task), 1);
        }
        if (modifyMode) {
          console.log('Modification demandée ' + task.contenu);
          this.taches[this.taches.findIndex(item => item.id === task.id)].contenu = task.contenu;
          delete this.taches[this.taches.findIndex(item => item.id === task.id)].modify;
        }
        if(!deleteMode && !modifyMode) {
          console.log('Notification de tâche : ' + JSON.stringify(task));
          this.taches.push(task);
          this.taches.sort((a, b) => {
            return moment(a.dateEcheance).diff(moment(b.dateEcheance))
          });
        }
      }
    });
  }

  public addTache(tache:TacheInterface):void{
    this.taches.push(tache);
    console.log('tacheListComponent::addTache::' + this.taches.length);
    console.log(this.taches);
  }

  public sortBy(): void{
    if(this.orderByValue === false) {
      this.taches.sort((a, b) => a.projet.libelle.localeCompare(b.projet.libelle));
      this.orderByValue = true;
      this.orderBy = 'Projet';
      return;
    }
    if(this.orderByValue === true) {
      this.taches.sort((a, b) => {
        return moment(a.dateEcheance).diff(moment(b.dateEcheance))
      });
      this.orderByValue = false;
      this.orderBy = 'Date';
      return ;
    }
  }
}
