import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegistrationComponentComponent } from 'src/app/registration-component/registration-component.component';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialogInscription(): void {

    const dialogRef = this.dialog.open(RegistrationComponentComponent, {
      width: '500px',
      data: {}
    });
}

openDialogConnexion(): void {
  const dialogRef = this.dialog.open(LoginComponent, {
  width: '500px',
  data: {}
});
}
}
