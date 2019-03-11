import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import * as moment from 'moment';
import { TaskNotifierService } from 'src/app/shared/notifier/task-notifier.service';
import { TextAreaValueDirective } from 'src/app/shared/directives/text-area-value.directive';
import { TacheInterface } from 'src/app/interfaces/tache';
import { MatDialog } from '@angular/material';
import { ProjetDialogComponent } from '../projet-dialog/projet-dialog.component';
import { ProjetInterface } from 'src/app/interfaces/projet';
import { FormControl } from '@angular/forms';


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
  public pickerIsOpen: boolean = false;

  public date = new FormControl();

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
          this.date.setValue(moment(task.dateEcheance).toDate());
          this.tache = {
            id: task.id,
            contenu: task.contenu,
            dateEcheance: task.dateEcheance,
            priorite: task.priorite,
            projet: task.projet,
            modify: true
          };
          this.isActived(task.contenu);
        }
      }
    });
  }

  public isActived(newContenu?: string): void {
    this.isDisabled = false;

    if(this.buttonIsClicked) {
      this.isDisabled = true;
      this.buttonIsClicked = false;
      this.deleteValue = false;
      this.dirs.first.changeTextArea();
    }

    if(newContenu) {
      this.dirs.first.changeTextArea(newContenu);
    }
  }

  public isStopped(): void {
    if(!this.pickerIsOpen) {
      this.isDisabled = true;
    }
    this.pickerIsOpen = false;
  }

  public selectPriorite(priorite: number): void {
    this.tachePrio = priorite;
    console.log('priorite'+priorite);
  }
  public addTache(value: string): void {
    if(this.tache.modify) {
      console.log('contenu textarea envoi : ' + value);
      this.notifier.sendTask(
        {
        id: this.tache.id,
        contenu: value,
        dateEcheance: this.tache.dateEcheance,
        priorite: this.tache.priorite,
        projet: this.tache.projet,
        modify: true
        });

      delete this.tache.modify;
    } else {
        this.notifier.sendTask(
        {
        id: null,
        contenu: value,
        dateEcheance: moment(),
        priorite: this.tachePrio,
          projet: {
            id: 1,
            libelle: 'sport'
          }
        });
    }
    this.buttonIsClicked = true;
    this.deleteValue = true;
  }

  public pickerOpen(): void {
    this.pickerIsOpen = true;
  }



  openDialog(): void {

    const dialogRef = this.dialog.open(ProjetDialogComponent, {
      width: '200px',
      data: {projet: this.projet}
    });
  }
}
