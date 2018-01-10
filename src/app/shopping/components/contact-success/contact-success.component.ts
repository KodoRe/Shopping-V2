import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'contact-success',
  templateUrl: './contact-success.component.html',
  styleUrls: ['./contact-success.component.css']
})
export class ContactSuccessComponent implements OnInit {

  constructor(private mdr: MatDialogRef<ContactSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    onNoClick(): void {
      this.mdr.close();
    }

    close() {
      this.mdr.close();      
    }
  ngOnInit() {
  }

}
