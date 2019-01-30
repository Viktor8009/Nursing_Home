import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../../../model/User';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {
@Input('user') user : User;

editedUser : User = new User();
  constructor(private userService : UserService) { }

  ngOnInit()
  {
    let user = this.userService.getOne(this.user.id)
              .then((user:User)=>{
                this.editedUser = user;
              });
  }

  editForm()
  { 
    console.log(this.editedUser);
    this.userService.editUser(this.editedUser)
        .then(
          (message:String)=>
          {
            console.info(message);
          }
        );
  }

  checkErrors(form,control)
  {

    if(!control)
    {
      return false;
    }

      if(!control.errors)
      {
        return false;
      }
      
      if(control.pristine && !form.submitted)
      {
        return false;
      }

      if(control.errors === null)
      {
        return false;
      }
      return true;
  }
}
