import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginProvider: string;
  constructor(
    private auth: AuthService,
    private mdr: MatDialogRef<LoginComponent>
  ) {
     
  }

  login(loginProvider: string) { 
    this.auth.login(loginProvider);
    this.mdr.close();
  }
}
