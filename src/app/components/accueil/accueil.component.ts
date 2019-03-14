import { Component, OnInit, Input } from '@angular/core';
import { TacheService } from 'src/app/shared/services/tache-service.service';
import * as moment from 'moment';
import { TacheInterface } from 'src/app/interfaces/tache';
import { TaskNotifierService } from 'src/app/shared/notifier/task-notifier.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public taches: Array<TacheInterface>;
  public tachesToday: Array<TacheInterface>;
  public tachesWeek: Array<TacheInterface>;
  public tachesOthers: Array<TacheInterface>;
  public tachesLate: Array<TacheInterface>;
  public today: moment.Moment = moment();
  public week: moment.Moment = moment().add(7, 'days');

  constructor(private notifier: TaskNotifierService, private tacheService: TacheService) {
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
          this.notifier.sendTask(tache);
        }
      }
      this.taches.sort((a, b) => {
        if(a.dateEcheance !== null && b.dateEcheance !== null) {
          return new Date(a.dateEcheance.toDate()).getTime() - new Date(b.dateEcheance.toDate()).getTime();
        } else {
          return 1;
        }
      });
    });

    this.notifier.taskShare.subscribe((task) => {
      if (task) {

        const deleteMode: boolean = task.hasOwnProperty('delete') && task.delete;
        const modifyMode: boolean = task.hasOwnProperty('modify') && task.modify;

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

          if(!this.taches[this.taches.findIndex(item => item.contenu === task.contenu)]) {
            this.taches.push(task);
          }


          this.taches.sort((a, b) => {
            if(a.dateEcheance !== null && b.dateEcheance !== null) {
              return new Date(a.dateEcheance.toDate()).getTime() - new Date(b.dateEcheance.toDate()).getTime();
            } else {
              return 1;
            }
          });

          let i: number = 0;
          this.tachesLate = this.taches.filter(tache => {
            if(tache.dateEcheance !== null) {
              if(tache.dateEcheance.format('DD-MM-YYYY') < this.today.format('DD-MM-YYYY') && i < 5) {
                i++;
                return tache.dateEcheance;
              }
            }
          });
          i = 0;
          this.tachesToday = this.taches.filter(tache => {
            if(tache.dateEcheance !== null) {
              if(tache.dateEcheance.format('DD-MM-YYYY') === this.today.format('DD-MM-YYYY') && i < 5) {
                i++;
                return tache.dateEcheance;
              }
            }
          });
          i = 0;
          this.tachesWeek = this.taches.filter(tache => {
            if(tache.dateEcheance !== null) {
              if((tache.dateEcheance.format('DD-MM-YYYY') > this.today.format('DD-MM-YYYY'))
              && (tache.dateEcheance.format('DD-MM-YYYY') <= this.week.format('DD-MM-YYYY'))
              && i < 5) {
                i++;
                return tache.dateEcheance;
              }
            }
          });
          i = 0;
          this.tachesOthers = this.taches.filter(tache => {
            console.log('Autres');
            if(tache.dateEcheance !== null) {
              if(tache.dateEcheance.format('DD-MM-YYYY') > this.week.format('DD-MM-YYYY') && i < 5) {
                i++;
                return tache.dateEcheance;
              }
            }
          });
        }
      }
    });
  }

}
