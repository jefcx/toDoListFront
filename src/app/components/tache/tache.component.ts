import { TacheInterface } from './../../interfaces/tache';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { TacheDialogComponent } from '../tache-dialog/tache-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {

  @Input() tache: TacheInterface;


  constructor(public dialog: MatDialog) {}

     openDialog(): void {
      const dialogRef = this.dialog.open(TacheDialogComponent, {
        width: '200px',
      });
    }
  ngOnInit(): void {
  }
}
