export class Room
{

    id:number; 
    name:string; 
    size:number; 
    slot:number;
    floor:number; 
    active?:boolean

    public constructor(id:number=0, name?:string, size:number=0,
                       slot:number=0, floor:number=0, active:boolean = false)
    {
        this.id = id;
        this.name = name;
        this.size = size;
        this.slot = slot;
        this.floor = floor;
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