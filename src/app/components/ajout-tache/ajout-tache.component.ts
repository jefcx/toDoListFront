import { Component, OnInit, ViewChildren } from '@angular/core';
import * as moment from 'moment';
import { TaskNotifierService } from 'src/app/shared/notifier/task-notifier.service';
import { TextAreaValueDirective } from 'src/app/shared/directives/text-area-value.directive';
import { TacheInterface } from 'src/app/interfaces/tache';


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

  public tache: TacheInterface;

  constructor(private notifier: TaskNotifierService) { }

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
            dateEcheance: null,
            priorite: 0,
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

  public addTache(value: string): void {
    this.notifier.sendTask(
      {
      id: 99,
      contenu: value,
      dateEcheance: moment(),
      priorite: 0,
        projet: {
          id: 1,
          libelle: 'sport'
        }
      });
    this.buttonIsClicked = true;
    this.deleteValue = true;
  }

  public selectPriorite(priorite: number): void {
    this.tachePrio = priorite;
    console.log('priorite'+priorite);
  }

}
