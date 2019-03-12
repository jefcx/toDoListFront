import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import * as moment from 'moment';
import { TaskNotifierService } from 'src/app/shared/notifier/task-notifier.service';
import { TextAreaValueDirective } from 'src/app/shared/directives/text-area-value.directive';
import { TacheInterface } from 'src/app/interfaces/tache';
import { MatDialog } from '@angular/material';
import { ProjetDialogComponent } from '../projet-dialog/projet-dialog.component';
import { ProjetInterface } from 'src/app/interfaces/projet';
import { FormControl } from '@angular/forms';
import { $ } from 'protractor';


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
  public projetIsOpen: boolean = false;

  public projetSelect: string = null;

  public date = new FormControl();

  @Input() tache: TacheInterface;
  @Input() projet: ProjetInterface;

  public projets: Array<ProjetInterface> = new Array<ProjetInterface>();

  constructor(private notifier: TaskNotifierService, public dialog: MatDialog) { }

  ngOnInit() {

    this.projets.push(
      {
        id: 1,
        libelle: 'sport'
      },
      {
        id: 2,
        libelle: 'cacaprout'
      },
      {
        id: 3,
        libelle: 'cuisine'
      });

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
          this.projetSelect = task.projet.libelle;
        }
      }
    });

    this.notifier.taskShare.subscribe((task) => {
      if (task) {

        let doublonItem: boolean = false;

        for (let projet of this.projets) {
          if (projet.libelle === task.projet.libelle) {
            doublonItem = true;
          }
        }

        if(!doublonItem) {
          this.projets.push(task.projet);
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
    if(!this.pickerIsOpen && !this.projetIsOpen) {
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

      if(this.tache.projet.libelle !== this.projetSelect) {
        this.tache.projet.id = null;
        this.tache.projet.libelle = this.projetSelect;
      }

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

      let dateTemp: moment.Moment = null;

      if(this.date.value) {
        dateTemp = moment(this.date.value);
      }

      this.notifier.sendTask(
        {
        id: null,
        contenu: value,
        dateEcheance: dateTemp,
        priorite: this.tachePrio,
        projet: {
          libelle: this.projetSelect
        }
        });
    }
    this.buttonIsClicked = true;
    this.deleteValue = true;
  }

  public pickerOpen(): void {
    this.pickerIsOpen = true;
  }

  public projetOpen(): void {
    this.projetIsOpen = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProjetDialogComponent, {
      width: '250px',
      data: {projets: this.projets, select: this.projetSelect}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.projetIsOpen = false;
      if(result && result.input != null) {
        this.projetSelect = result.input;
      }
    });
  }
}
