export class Supply
{
    id:number; 
    item:string; 
    pieces:number; 
    administrator:string;
    supplyDate:string

    public constructor(id:number=0, item?:string, pieces:number=0,
                       administrator?:string, supplyDate?:string)
    {
        this.id = id;
        this.item = item;
        this.pieces = pieces;
        this.administrator = administrator;
        this.supplyDate = supplyDate;

    }

    fromObject(obj)
    {
        for(let k in obj)
        {
            this[k] = obj[k]; 
        }
    }
}