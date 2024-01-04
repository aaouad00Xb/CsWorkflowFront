import { createFeatureSelector ,createSelector} from "@ngrx/store";
import { CustomAction } from "../Store";
import { FAILED, SUCCESS, SUCCESSPart2 } from "./actions/ProjectActions";


export interface Todo{
    userId: Number,
    id: Number,
    title: string,
    completed: boolean
}


let initialState = {
    projects:[],
    
}



export function projectReducer(state =initialState ,action:CustomAction ){
    switch(action.type){
        case SUCCESS:
            return {
                projects:action.payload,
            }
        case SUCCESSPart2:
            return {
                projects:action.payload,
            }
         case FAILED:
            console.error("some error here")
            return state

            default:
                return state;

    }

}







//selectors
// counter is the name of the reducer;

const projectsFs = createFeatureSelector<any>('projects');
export let projectsSelector = createSelector(projectsFs,s=>s.projects);