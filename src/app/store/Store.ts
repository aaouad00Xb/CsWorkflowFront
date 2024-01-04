import { Action } from "@ngrx/store";
import { counterReducer } from "./reducers/counter.reducer";
import { projectReducer } from "./reducers/projects.reducer";
import { userReducer } from "./reducers/user.reducer";


export interface CustomAction{
    type:string,
    payload:any
}



export const reducers = {counter:counterReducer,projects:projectReducer,MyuserRed:userReducer};