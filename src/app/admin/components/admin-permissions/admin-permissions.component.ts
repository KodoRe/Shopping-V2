import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { DataTableResource } from '../../../modules/angular-4-data-table';
import { DialogsService } from 'shared/services/dialogs.service';
import { AuthService } from 'shared/services/auth.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-admin-permissions',
  templateUrl: './admin-permissions.component.html',
  styleUrls: ['./admin-permissions.component.css']
})
export class AdminPermissionsComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  subscription: Subscription;
  tableResource: DataTableResource<AppUser>;
  userId: string; //this is the logged admin userId used to disable own checkbox in admin permissions table.
  users: AppUser[];
  items: AppUser[] = [];
  itemCount: number; 
  result: boolean;
  public loading = false;

  constructor(
     private authService: AuthService,
     private userService: UserService ,
     private dialogsService: DialogsService,
     private snackBar: MatSnackBar
    ) { 
    this.loading = true;
    this.userSubscription = this.authService.appUser$.subscribe(au => {
      this.userId = au.$key;
    })
    this.subscription = this.userService.getAll()
    .subscribe(users => {
      this.users = users;   
      this.users.forEach(u => { //This loop make sure that sorting will work good even if the user don't have the isAdmin in firebase.
        if (u.isAdmin == null)
          u.isAdmin = false;
      })
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
    this.loading = false;
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

  showConfirm(e: any, user: AppUser, checkBoxPermission: boolean) {
     e.preventDefault();
     
     if (this.userId == user.$key) //Nothing Happens if admin click on his own admin permission. 
     {
      this.snackBar.open("You cant modify your own permissions","", {  duration: 3000 });
      return;
     }

     this.dialogsService
     .confirm('', 'Are you sure you want to change admin permissions for this user?')
     .subscribe( res => {
     if (res) {
        checkBoxPermission = !checkBoxPermission;

        this.userService.toggleAdmin(user.$key, checkBoxPermission);
    }
   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {
  }

}
