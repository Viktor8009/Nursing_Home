import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {User} from '../model/User';
import { UserService } from '../user.service';
import { UrlService } from '../url.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { forEach } from '@angular/router/src/utils/collection';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
@Input('changeListener')  changedPage : EventEmitter<string>;
@Output() usersCount: Number = 0;
@Output() roomsCount : Number = 12;
@Output() staffCount : Number = 30;
@Output() activeMembers : Number = 0;
@Output() inactiveMembers : Number = 0;

public currentLink : string ="/";
users = [];
activeUsers = [];

  constructor(private userService: UserService, 
              private urlService: UrlService) 
  {

  }
  
  ngOnInit() 
  {
   
    this.urlService.urlChanged.subscribe(
      (event) => {
        
        this.currentLink = event.url;
        }
      );

        this.currentLink = this.urlService.currentURL;
        this.userService.getAllUsers();
        let user1 = this.userService.getOne(3);

        this.userService.userObserver
        .subscribe(

           (users) =>
           {
             this.usersCount = users.length;
           }
        );

        this.userService.userObserver
        .subscribe(

           (activeUsers) =>
           {
            this.activeMembers = activeUsers.length;
           }
        );
      }
      
      getActiveUsers()
  {
      let actives = [];

      for(let user of this.users)
      {
        if(user.active)
        {
          actives.push(user);
        }
      }

      return actives;
  }


 /* onNewUser(user:User)
  {
    let lastId = this.users[this.users.length-1].id;
    user.id = lastId + 1;
    this.users.push(user);
  }*/

 
}
