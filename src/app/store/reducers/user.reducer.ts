import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomAction } from "../Store";
import { AddUser } from "./actions/UserActions";

let initialState = {
    user:{},
    
}



export function userReducer(state =initialState ,action:CustomAction ){
    switch(action.type){
        case "adduser":
            return {
                user:action.payload,
            }
        

            default:
                return state;

    }

}







//selectors
// counter is the name of the reducer;

const projectsFs = createFeatureSelector<any>('MyuserRed');
export let userSelector = createSelector(projectsFs,s=>s.user);