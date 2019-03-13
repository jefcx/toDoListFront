import { TacheService } from './../../shared/services/tache-service.service';
import { TaskNotifierService } from './../../shared/notifier/task-notifier.service';
import { Component, OnInit, Input } from '@angular/core';
import { TacheInterface } from 'src/app/interfaces/tache';

import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

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

  public pageTitle: string;
  private dateNow: moment.Moment = moment().add(1, 'days');
  private dateSevenDays: moment.Moment = moment().add(7, 'days');
  public dateCompare: moment.Moment;
  public boiteReception: boolean = false;

  constructor(private notifier: TaskNotifierService, private route: ActivatedRoute, private tacheService: TacheService) {
    this.taches = new Array<TacheInterface>();
  }

  ngOnInit() {
    this.tacheService.getAllTaches().subscribe(taches => {
      if(taches) {
        for(let tache of taches) {
          if(tache.dateEcheance != null) {
            tache.dateEcheance = moment(tache.dateEcheance);
          }
          if(tache.projet.libelle == null) {
            tache.projet.libelle = "Boite de réception";
          }
          this.taches.sort((a, b) => {
            if(a.dateEcheance !== null && b.dateEcheance !== null) {
              return new Date(a.dateEcheance.toDate()).getTime() - new Date(b.dateEcheance.toDate()).getTime();
            } else {
              return 1;
            }
          });
          this.taches.push(tache);
        }
      }
    });

    this.pageTitle = this.route.snapshot.data['title'];

    if(this.pageTitle === 'Aujourd\'hui') {
      this.dateCompare = this.dateNow.clone();
    }
    if(this.pageTitle === '7 prochains jours') {
      this.dateCompare = this.dateSevenDays.clone();
    }
    if(this.pageTitle === 'Dashboard') {
      this.dateCompare = null;
      this.boiteReception = true;
    }

    this.taches.sort((a, b) => {
      if(a.dateEcheance !== null && b.dateEcheance !== null) {
        return new Date(a.dateEcheance.toDate()).getTime() - new Date(b.dateEcheance.toDate()).getTime();
      } else {
        return 1;
      }
    });

    this.notifier.taskShare.subscribe((task) => {
      if (task) {

        let deleteMode: boolean = task.hasOwnProperty('delete') && task.delete;
        let modifyMode: boolean = task.hasOwnProperty('modify') && task.modify;

        if (deleteMode) {
          this.taches.splice(this.taches.indexOf(task), 1);
        }
        if (modifyMode) {
          this.taches[this.taches.findIndex(item => item.id === task.id)].contenu = task.contenu;
          this.taches[this.taches.findIndex(item => item.id === task.id)].dateEcheance = task.dateEcheance;
          this.taches[this.taches.findIndex(item => item.id === task.id)].priorite = task.priorite;
          this.taches[this.taches.findIndex(item => item.id === task.id)].projet = task.projet;

          delete this.taches[this.taches.findIndex(item => item.id === task.id)].modify;
        }
        if(!deleteMode && !modifyMode) {

          this.taches.sort((a, b) => {
            if(a.dateEcheance !== null && b.dateEcheance !== null) {
              return new Date(a.dateEcheance.toDate()).getTime() - new Date(b.dateEcheance.toDate()).getTime();
            } else {
              return 1;
            }
          });
        }
      }
    });
  }

  /*public addTache(tache:TacheInterface):void{
    this.taches.push(tache);
  }*/

  public sortBy(): void{
    if(this.orderByValue === false) {
      this.taches.sort((a, b) => a.projet.libelle.localeCompare(b.projet.libelle));
      this.orderByValue = true;
      this.orderBy = 'Projet';
      return;
    }
    if(this.orderByValue === true) {
      this.taches.sort((a, b) => {
        if(a.dateEcheance !== null && b.dateEcheance !== null) {
          return new Date(a.dateEcheance.toDate()).getTime() - new Date(b.dateEcheance.toDate()).getTime();
        } else {
          return 1;
        }
      });
      this.orderByValue = false;
      this.orderBy = 'Date';
      return ;
    }
  }
}
