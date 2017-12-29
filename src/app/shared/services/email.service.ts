import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }

   sendEmail(email: string,name: string,subject: string,body: string) {
    let mailSent: boolean = false;
    const httpParams = new HttpParams()
    .set('ToMail', email)
    .set('ToName', name)
    .set('EmailSubject', subject)
    .set('EmailBody', body);   
       return this.http.post("http://localhost/EmailService.asmx/SendEmail",httpParams);
}
}
