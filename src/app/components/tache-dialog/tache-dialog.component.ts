import { TacheComponent } from './../tache/tache.component';
import { TacheInterface } from 'src/app/interfaces/tache';
import { Component, OnInit, Inject, ViewChildren, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-tache-dialog',
  templateUrl: './tache-dialog.component.html',
  styleUrls: ['./tache-dialog.component.scss']
})
export class TacheDialogComponent implements OnInit {


  public taches: Array<TacheInterface>;

  constructor(public dialogRef: MatDialogRef<TacheDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {this.taches = new Array<TacheInterface>();
    }


  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
