import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogService } from 'shared/services/confirm-dialog.service';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;

  constructor(private confirmDialogService: ConfirmDialogService,
    private mdr: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.title = this.data.title;
      this.message = this.data.message;
    }
    
    onNoClick(): void {
      this.mdr.close();
    }

    cancel() {
      this.confirmDialogService.markCanceled();
      this.mdr.close();      
    }

    confirmed() {
      this.confirmDialogService.markConfirmed();
      this.mdr.close();
    }
  ngOnInit() {
  }

}
