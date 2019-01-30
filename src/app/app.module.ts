import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ContentComponent } from './content/content.component';
import { UserManagerComponent } from './content/user-manager/user-manager.component';
import {FormsModule} from '@angular/forms';
import { UserService } from './user.service';
import { UserEditorComponent } from './content/user-manager/user-editor/user-editor.component';
import { UrlService } from './url.service';
import { NewUserComponent } from './content/user-manager/new-user/new-user.component';
import { UserTableComponent } from './content/user-table/user-table.component';
import { ConfigService } from './config.service';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
import { SupplyComponent } from './supply/supply.component';
import { RoomService } from './room.service';
import { SupplyService } from './supply.service';

const routerSettings:Routes=[

  {path:'', component:ContentComponent},
  {path:'user-manager', component:UserManagerComponent},
  {path:'rooms', component:RoomsComponent},
  {path:'supply', component:SupplyComponent},
  {path:'user-editor', component:UserEditorComponent},
  {path:'**', component:InvalidPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent,
    LeftSidebarComponent,
    ContentComponent,
    UserManagerComponent,
    UserEditorComponent,
    NewUserComponent,
    UserTableComponent,
    InvalidPageComponent,
    RoomsComponent,
    InvalidPageComponent,
    SupplyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routerSettings)
  ],
  providers: [UserService, UrlService, ConfigService,HttpService,RoomService,SupplyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
