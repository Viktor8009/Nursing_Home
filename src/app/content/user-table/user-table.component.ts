import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../model/User';
import { UserService } from '../../user.service';
import { UrlService } from '../../url.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {
  users : User[]=[];
  userSubscribe = null;
  
  constructor(private userService:UserService,
    private urlService: UrlService) { }
    
    ngOnInit()
    {
      this.users = this.userService.users;
      
      this.userSubscribe=this.userService.userObserver
      .subscribe(
        (users) =>
        {
          this.users = users;
        },
        
        (err) =>
        {
          this.users = [];
        }
        );
        
        
        /* this.userService.getAllUsers()
        .then(
          (users) =>
          {
            this.users = users;
          },
          (err) =>
          {
            this.users = [];
          }
          );*/
        }
        
        ngOnDestroy(): void 
        {
             this.userSubscribe.unsubscribe();
        }

  onChangeActive(user:User)
  {
    this.userService.changeStatus(user);
  }

  onEditUser(user:User)
  {
    this.userService.lastEditedUser = user;
    this.urlService.jumpTo('/user-manager');
  }

  onDeleteUser(user:User)
  {
    this.userService.deleteUser(user)
        .then((message:String)=>
        {
          console.info(message);
        });
  }

}
