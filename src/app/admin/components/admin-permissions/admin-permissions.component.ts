import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { DataTableResource } from '../../../modules/angular-4-data-table';
import { DialogsService } from 'shared/services/dialogs.service';


@Component({
  selector: 'app-admin-permissions',
  templateUrl: './admin-permissions.component.html',
  styleUrls: ['./admin-permissions.component.css']
})
export class AdminPermissionsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  tableResource: DataTableResource<AppUser>;
  users: AppUser[];
  items: AppUser[] = [];
  itemCount: number; 
  result: boolean;

  constructor(private userService: UserService,private dialogsService: DialogsService) { 
    this.subscription = this.userService.getAll()
    .subscribe(users => {
      this.users = users;   
      this.initializeTable(users);
    });
  }

  private initializeTable(users: AppUser[]) {
    this.tableResource = new DataTableResource(users);
    this.tableResource.query({ offset: 0 })
      .then(items => {
        this.items = items
      });
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  filter(query: string) { 
    let filteredOrders = (query) ?
      this.users.filter(o => o.name.toLowerCase().includes(query.toLowerCase())) :
      this.users;

    this.initializeTable(filteredOrders);
  }
  showConfirm(e: any, user: AppUser) {
  e.preventDefault();
  this.dialogsService
  .confirm('', 'Are you sure you want to change admin permissions for this user?')
  .subscribe( res => {
  this.result = res;
  if (this.result) {
    this.userService.toggleAdmin(user.$key,!(user.isAdmin));
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {
  }

}
