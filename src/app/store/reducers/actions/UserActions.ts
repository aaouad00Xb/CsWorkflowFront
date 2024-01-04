
export class AddUser { 
    type: string = "adduser";
    payload: any
    constructor(payload: any) {
        this.payload= payload;
   }
}
