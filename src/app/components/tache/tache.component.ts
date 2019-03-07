import { TacheInterface } from './../../interfaces/tache';
import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TacheDialogComponent } from '../tache-dialog/tache-dialog.component';
import { TaskNotifierService } from 'src/app/shared/notifier/task-notifier.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {

  @Input() tache: TacheInterface;
  @Input() checked: boolean = false;

  constructor(public dialog: MatDialog, private notifier: TaskNotifierService) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    this.checked = true;

    const dialogRef = this.dialog.open(TacheDialogComponent, {
      width: '200px',
      data: {id: this.tache.id}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.checked = false;

      if(result.action == 0) {
        console.log('Bouton terminer');

      }
      if(result.action == 1) {
        console.log('Bouton modifier');
      }
      if(result.action == 2) {
        console.log(this.tache.id);
        this.tache.delete = true;
        this.notifier.sendTask(this.tache);
      }
    });
  }
}
