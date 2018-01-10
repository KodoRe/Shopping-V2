import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmDialogService {
  confirmed: boolean;
  constructor() { }

  markConfirmed() {
  this.confirmed = true;
  }
  markCanceled() {
  this.confirmed = false;
  }
  dialogConfirm() {
    return this.confirmed;
  }
}
