import { TacheService } from './../../shared/services/tache-service.service';
import { TacheInterface } from './../../interfaces/tache';
import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TacheDialogComponent } from '../tache-dialog/tache-dialog.component';
import { TaskNotifierService } from 'src/app/shared/notifier/task-notifier.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {

  @Input() tache: TacheInterface;
  @Input() checked: boolean = false;

  public currentDate: moment.Moment = moment().subtract(1, 'days');
  public isLate: string;

  constructor(public dialog: MatDialog, private notifier: TaskNotifierService, private tacheService: TacheService) {}

  ngOnInit(): void {
    if(this.tache.dateEcheance !== null) {
      const dateEcheance = this.tache.dateEcheance.clone();
      if(dateEcheance.isBefore(this.currentDate)) {
        this.isLate = 'isLate';
      }
    }
  }

  openDialog(): void {
    this.checked = true;

    const dialogRef = this.dialog.open(TacheDialogComponent, {
      width: '200px',
      data: {id: this.tache.id}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.checked = false;

      if(result != null && result.action == 0) {
        console.log('Bouton terminer');

        this.tacheService.valideTache(this.tache.id).subscribe(result => {
          this.tache.delete = true;
          this.notifier.sendTask(this.tache);
        });

      }
      if(result != null && result.action == 1) {
        console.log('Bouton modifier: ' + this.tache.contenu);
        this.tache.modify = true;
        this.notifier.sendModifyTask(this.tache);
      }
      if(result != null && result.action == 2) {
        console.log(this.tache.id);

        this.tacheService.deleteTache(this.tache.id).subscribe(result => {
          this.tache.delete = true;
          this.notifier.sendTask(this.tache);
        });
      }
    });
  }
}
