import { Component, OnInit, Input, Inject } from '@angular/core';
import { ProjetInterface } from 'src/app/interfaces/projet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Options } from 'selenium-webdriver/opera';

@Component({
  selector: 'app-projet-dialog',
  templateUrl: './projet-dialog.component.html',
  styleUrls: ['./projet-dialog.component.scss']
})
export class ProjetDialogComponent implements OnInit {

  public projets: Array<ProjetInterface>;
  public projetSelect: string = null;
  myControl = new FormControl();
  options: Array<string>;
  filteredOptions: Observable<string[]>;

  constructor(public dialogRef: MatDialogRef<ProjetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projets = new Array<ProjetInterface>();
    this.options = new Array<string>();
  }

  ngOnInit() {

    this.projetSelect = this.data.select;
    this.projets = this.data.projets;

    for (const libelles of this.projets) {
      console.log(libelles.libelle);
      this.options.push(libelles.libelle);
    }

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        map(value => this._filter(value))
      );

    if(this.projetSelect != null) {
      this.myControl.setValue(this.projetSelect);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
