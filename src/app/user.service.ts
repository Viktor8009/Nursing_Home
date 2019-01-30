import { Injectable, Output } from '@angular/core';
import { User } from './model/User';
import { ConfigService } from './config.service';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

 @Output() users : Array<User> = [];
 @Output() activeUsers : Array<User> = [];
 @Output() inactiveUsers : Array<User> = [];
  lastEditedUser : User = null;
  usersQueried : boolean = false;
  userObserver :Subject<any> = new Subject;
  userUrl:string ="";

  constructor(private configService : ConfigService, private http : Http,
              private httpService:HttpService)
  {
    //this.getUsersFromHttp();

    this.userUrl = this.configService.get("usersApi")+"/user";

    this.getActiveUserWithObserver();
    this.getInactiveUserWithObserver();
    this.getUserWithObserver();
    
  }
  getUsersFromHttp()
  {
    return new Promise(
          (resolve,reject) =>
          {
            if(this.usersQueried)
            {
              return resolve(this.users);
            }
            
            this.http.get(this.configService.get("usersApi"))
            .subscribe(
              
              (response: Response) => 
              {
                this.usersQueried = true;
                this.users = this.jsonToUser(response.json());
                resolve(this.users);
              },
              (err) =>
              {
                reject(err);
              }
              );
      });
  }

  getUserWithObserver()
  {

      this.http.get(this.userUrl+"/all")
      .subscribe(
        
        (response: Response) => 
        {
          this.users = this.jsonToUser(response.json());
          this.userObserver.next(this.users);
        },
        (err) =>
        {
          this.userObserver.error("Errors in getting users!");
        }

    );
  }

  getActiveUserWithObserver()
  {

    this.http.get(this.userUrl+"/all")
    .subscribe(
      
      (response: Response) => 
      {
        this.users = response.json();
        this.activeUsers = this.users.filter(user => user.active === true);
        console.log(this.activeUsers);
        this.userObserver.next(this.activeUsers);
      },

      (err) =>
      {
        this.userObserver.error("Errors in getting users!");
      });
  }

  getInactiveUserWithObserver()
  {

    this.http.get(this.userUrl+"/all")
    .subscribe(
      
      (response: Response) => 
      {
        this.users = response.json();
        this.inactiveUsers = this.users.filter(user => user.active === false);
        console.log(this.users);
        this.userObserver.next(this.inactiveUsers);
      },

      (err) =>
      {
        this.userObserver.error("Errors in getting users!");
      });
  }

  jsonToUser(userArray):User[]
  {
    let users : Array<User> = [];

      for(let user of userArray)
      {
          let newUser = new User();
          newUser.fromObject(user);
          users.push(newUser);
      }

      return users;
  }

  getLastEditedUser()
  {
    return this.lastEditedUser;
  }

  getAllUsers():Promise<any>
  {
    return this.getUsersFromHttp();
  }

  getUserIndex(id)
  {
    let index = null;
    for(let i=0; i<this.users.length; i++)
    {
        if(this.users[i].id == id)
        {
          index = i;
        }
    }

    return index;
}

  getOne(id:Number)
  {
   return new Promise((resolve,reject)=>
   {
      this.http.get(`${this.userUrl}/${id}`)
      .subscribe(
        (response:Response)=>
        {
          let user:User = new User();
          user.fromObject(response.json());
          resolve(user);
        },
        (err)=>
        {
          reject(err);
        });
   });
  }

  getTopID()
  {
    let topID = this.users[0].id;

    for(let user of this.users)
    {
        if(user.id > topID)
        {
          topID = user.id;
        }
    }
    return topID;
  }

  pushOneUser(user:User)
  {
    return new Promise((resolve,reject)=>
    {
      this.httpService.create(`${this.userUrl}`,user)
          .then(
            (usrResult)=>
            {
              this.getUserWithObserver();
              resolve('User saved');
            });
        });
  }

  changeStatus(user:User)
  {
      let index = this.getUserIndex(user.id);

      if(index !== null)
      {
          this.users[index].active = !this.users[index].active;
          
      }
        return new Promise((resolve,reject)=>
        {
          this.http.post(`${this.userUrl}/${user.id}`,JSON.stringify(user))
          .subscribe(
            (response:Response)=>
            {
            //this.getActiveUserWithObserver();
             this.getUserWithObserver();
             resolve('Status updated!');
           },
           (err)=>
           {
             reject(err);
           });
      });
  }

  editUser(user: User) {

    return new Promise((resolve,reject)=>
   {
      this.http.post(`${this.userUrl}/${user.id}`,JSON.stringify(user))
      .subscribe(
        (response:Response)=>
        {
          this.getUserWithObserver();
          resolve('Update success');
        },
        (err)=>
        {
          reject(err);
        });
   });


   /* let index = this.getUserIndex(user.id);
    if (index !== null) {
        for (let k in user) {
            this.users[index][k] = user[k];
        }
    }
    */
}


  deleteUser(user:User)
  {

    return new Promise((resolve,reject)=>
    {
       this.http.delete(`${this.userUrl}/${user.id}`,JSON.stringify(user))
                .forEach((response:Response)=>{

                      this.getUserWithObserver();
                      resolve('User deleted');
                });
    });


    /*let index = this.getUserIndex(user.id);
    
    this.users.splice(index,1);

    this.userObserver.next(this.users);
    */
  }
}
