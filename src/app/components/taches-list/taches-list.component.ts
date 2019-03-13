import { AuthService } from 'src/app/shared/connexion/auth-service.service';
import { TacheService } from './../../shared/services/tache-service.service';
import { TaskNotifierService } from './../../shared/notifier/task-notifier.service';
import { Component, OnInit, Input } from '@angular/core';
import { TacheInterface } from 'src/app/interfaces/tache';

import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-taches-list',
  templateUrl: './taches-list.component.html',
  styleUrls: ['./taches-list.component.scss']
})
export class TachesListComponent implements OnInit {

  @Input() tacheAdd: TacheInterface;

  public taches: Array<TacheInterface>;

  public orderBy = 'Date';
  private orderByValue = false;

  public pageTitle: string;
  private dateNow: moment.Moment = moment().add(1, 'days');
  private dateSevenDays: moment.Moment = moment().add(7, 'days');
  public dateCompare: moment.Moment;

// tslint:disable-next-line: max-line-length
  constructor(private notifier: TaskNotifierService, private route: ActivatedRoute,
              private router: Router, private tacheService: TacheService, private authService: AuthService) {
    this.taches = new Array<TacheInterface>();
  }

  ngOnInit() {

    this.tacheService.getAllTaches().subscribe(taches => {
      console.log('coucou' + JSON.stringify(taches));
      for (const tache of taches) {
        if (tache.dateEcheance != null) {
          tache.dateEcheance = moment(tache.dateEcheance);
        }
        this.taches.push(tache);
      }
    });

    this.pageTitle = this.route.snapshot.data.title;

    if (this.pageTitle === 'Aujourd\'hui') {
      this.dateCompare = this.dateNow.clone();
    }
    if (this.pageTitle === '7 prochains jours') {
      this.dateCompare = this.dateSevenDays.clone();
    }

    /*this.taches.push(
      {
        id: 1,
        contenu: 'blabla',
        dateEcheance: moment('2019-03-12'),
        priorite: 0,
        projet: {
          id: 1,
          libelle: 'sport'
        }
      },
      {
        id: 2,
        contenu: 'ahah',
        dateEcheance: moment('2019-03-15'),
        priorite: 1,
        projet: {
          id: 2,
          libelle: 'cacaprout'
        }
        },
        {
          id: 3,
          contenu: 'bidoowap',
          dateEcheance: moment('2019-03-12'),
          priorite: 2,
          projet: {
            id: 3,
            libelle: 'cuisine'
          }
      }
    );*/
    // console.log(this.taches[0].dateEcheance.format('DD-MM-YYYY HH:mm:ss'));
    this.taches.sort((a, b) => {
      return moment(a.dateEcheance).diff(moment(b.dateEcheance));
    });
    this.notifier.taskShare.subscribe((task) => {
      if (task) {

        const deleteMode: boolean = task.hasOwnProperty('delete') && task.delete;
        const modifyMode: boolean = task.hasOwnProperty('modify') && task.modify;

        if (deleteMode) {
          console.log('Suppression demandée ' + task.id);
          this.taches.splice(this.taches.indexOf(task), 1);
        }
        if (modifyMode) {
          console.log('Modification demandée ' + task.dateEcheance.toDate());
          this.taches[this.taches.findIndex(item => item.id === task.id)].contenu = task.contenu;
          this.taches[this.taches.findIndex(item => item.id === task.id)].dateEcheance = task.dateEcheance;
          this.taches[this.taches.findIndex(item => item.id === task.id)].priorite = task.priorite;
          this.taches[this.taches.findIndex(item => item.id === task.id)].projet = task.projet;
          delete this.taches[this.taches.findIndex(item => item.id === task.id)].modify;
        }
        if (!deleteMode && !modifyMode) {
          console.log('Notification de tâche : ' + JSON.stringify(task));
          this.taches.push(task);
          this.taches.sort((a, b) => {
            return moment(a.dateEcheance).diff(moment(b.dateEcheance));
          });
          // TODO idUtilisateur

        }
      }
    });
  }

  public addTache(tache: TacheInterface): void {
    this.taches.push(tache);
    console.log('tacheListComponent::addTache::' + this.taches.length);
    console.log(this.taches);
  }

  public sortBy(): void {
    if (this.orderByValue === false) {
      this.taches.sort((a, b) => a.projet.libelle.localeCompare(b.projet.libelle));
      this.orderByValue = true;
      this.orderBy = 'Projet';
      return;
    }
    if (this.orderByValue === true) {
      this.taches.sort((a, b) => {
        return moment(a.dateEcheance).diff(moment(b.dateEcheance));
      });
      this.orderByValue = false;
      this.orderBy = 'Date';
      return ;
    }
  }
public disconnect(): void {

      this.authService.removeToken('user');
      this.router.navigate(['../user']);
    }

}
