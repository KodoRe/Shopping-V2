import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
//import { DataTableModule } from './modules/angular-4-data-table';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

import { MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
//https://stackblitz.com/edit/material-dialogs-sample?file=app%2Fapp.module.ts
//for more material imports (this is material 2 and not 5!)
//https://kyleledbetter.gitbooks.io/angular-material-2/dialog.html
//found this link for angular material 2 as i didnt find it in the original website.
//key note: Md prefix changed to Mat prefix at latest beta version of 2
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    //DataTableModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ])    
  ],
  providers: [
    AdminAuthGuard,
    { provide: LOCALE_ID, useValue: 'he-IL' } //when using the currency pipe, it depend on angular locale system to detemine some settings like where to show the symbol (right / left)...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
