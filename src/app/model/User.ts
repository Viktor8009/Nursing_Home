export class User 
{

    id:number; 
    lastName:string; 
    firstName:string; 
    email:string;
    phone:string; 
    relatives?:string;
    active?:boolean

    public constructor(id?:number, lastName?:string, firstName?:string,
                       email?:string, phone?:string, relatives:string ='None', active:boolean = false)
    {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.relatives = relatives;
        this.active = active;
    }

    fromObject(obj)
    {
        for(let k in obj)
        {
            this[k] = obj[k]; 
        }
    }
}