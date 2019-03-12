import { Component, OnInit, Input, Inject } from '@angular/core';
import { ProjetInterface } from 'src/app/interfaces/projet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-projet-dialog',
  templateUrl: './projet-dialog.component.html',
  styleUrls: ['./projet-dialog.component.scss']
})
export class ProjetDialogComponent implements OnInit {

 public projets: Array<ProjetInterface>;
 myControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<ProjetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {this.projets = new Array<ProjetInterface>();
}

ngOnInit() {


  this.projets.push(
    {
        id: 1,
        libelle: 'sport'
      }
    ,
    {
        id: 2,
        libelle: 'cacaprout'
    }
 )};

  onNoClick(): void {
    this.dialogRef.close();
  }

}
