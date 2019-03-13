import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegistrationComponentComponent } from 'src/app/registration-component/registration-component.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/shared/connexion/auth-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public dialog: MatDialog, private httpClient: HttpClient, private authService: AuthService, private router: Router) { }

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

    dialogRef.afterClosed().subscribe(result => {
      if(result.log && result.pwd) {
        this.connection(result.log, result.pwd);
      }
    });
  }

  public connection(login: string, password: string): void {
    this._connect(login, password).subscribe(result => {
          if(result.access_token) {
            this.authService.setToken(result.access_token);
            this.router.navigate(['../today']);
          }
    });
  }

  private _connect(login: string, pwd: string): Observable<any> {
    const uri: string = 'http://localhost:8000/oauth/token';

    const headers = new HttpHeaders()
      .set('Authorization', 'Basic Zm9ybWF0aW9uOnNlY3JldA==')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .set('username', login)
      .set('password', pwd)
      .set('grant_type', 'password')
      .set('scope', 'read write');

    return this.httpClient.post<any>(
      uri,
      body.toString(),
      {headers}
    );
  }
}
