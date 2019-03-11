import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import * as moment from 'moment';
import { TaskNotifierService } from 'src/app/shared/notifier/task-notifier.service';
import { TextAreaValueDirective } from 'src/app/shared/directives/text-area-value.directive';
import { TacheInterface } from 'src/app/interfaces/tache';
import { MatDialog } from '@angular/material';
import { ProjetDialogComponent } from '../projet-dialog/projet-dialog.component';
import { ProjetInterface } from 'src/app/interfaces/projet';
import { TacheDialogComponent } from '../tache-dialog/tache-dialog.component';


@Component({
  selector: 'app-ajout-tache',
  templateUrl: './ajout-tache.component.html',
  styleUrls: ['./ajout-tache.component.scss']
})

export class AjoutTacheComponent implements OnInit {

  @ViewChildren(TextAreaValueDirective) dirs;

  public isDisabled: boolean = true;
  public buttonIsClicked: boolean = false;
  public deleteValue: boolean = false;
  public tachePrio: number = 0;
  public tacheDate: moment.Moment;

  @Input() tache: TacheInterface;
  @Input() projet: ProjetInterface;

  constructor(private notifier: TaskNotifierService, public dialog: MatDialog) { }

  ngOnInit() {
    this.tache = {
      id: null,
      contenu: '',
      dateEcheance: null,
      priorite: 0,
      projet: {
        id: null,
        libelle: ''
      }
    };

    this.notifier.taskModifyShare.subscribe((task) => {
      if (task) {
        if (task.hasOwnProperty('modify') && task.modify) {
          this.tache = {
            id: null,
            contenu: task.contenu,
            dateEcheance: null ,
            priorite: task.tachePrio,
            projet: {
              id: null,
              libelle: ''
            }
          };
          this.isActived();
        }
      }
    });
  }

  public isActived(): void {
    this.isDisabled = false;

    if(this.buttonIsClicked) {
      this.isDisabled = true;
      this.buttonIsClicked = false;
      this.deleteValue = false;
      this.dirs.first.changeTextArea();
    }
  }

  public isStopped(): void {
    this.isDisabled = true;
  }

  public selectPriorite(priorite: number): void {
    this.tachePrio = priorite;
    console.log('priorite'+priorite);
  }
  public addTache(value: string): void {
    this.notifier.sendTask(
      {
      id: 99,
      contenu: value,
      dateEcheance: moment(),
      priorite: this.tachePrio,
        projet: {
          id: 1,
          libelle: 'sport'
        }
      });
    this.buttonIsClicked = true;
    this.deleteValue = true;
  }




  openDialog(): void {

    const dialogRef = this.dialog.open(ProjetDialogComponent, {
      width: '200px',
      data: {projet: this.projet}
    });
  }
}
