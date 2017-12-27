import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }

   sendEmail(email: string,name: string,subject: string,body: string) {
    //let headers = new HttpHeaders();
    //headers = headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept").set("Access-Control-Allow-Origin", "*");
    let mailSent: boolean = false;
    const httpParams = new HttpParams()
    .set('ToMail', email)
    .set('ToName', name)
    .set('EmailSubject', subject)
    .set('EmailBody', body);   
      //this.http.post("http://localhost:63751/EmailService.asmx/SendEmail", "ToMail="+email+",ToName="+name+",EmailSubject="+subject+",EmailBody="+body).subscribe(data => {
       return this.http.post("http://localhost/EmailService.asmx/SendEmail",httpParams);
}
}
