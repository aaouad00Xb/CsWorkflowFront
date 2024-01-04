// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Injectable, OnInit } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { FailedAction, LOAD, SUCCESS, SuccessAction, SuccessActionPart2 } from "../actions/ProjectActions";
// import { mergeMap,map,catchError } from "rxjs/operators";
// import { of } from "rxjs";
// import { ServiceService } from "src/app/service.service";
// import { Store } from '@ngrx/store';
// import { SetCategorie_projectAction, SetPorteursAction, SetProjectsIDS, SetRefList, SetRef_Convention_anneeAction, SetSource, SetTypeRisqueListAction, SetType_institution, SetstatutList } from "../actions/DiversActions";
// import { projectsIDsSelector, sourcesSelector } from "../counter.reducer";
// import { projectsSelector } from "../projects.reducer";
// import { format, parse } from "date-fns";

// @Injectable()
// export class TodoEffect  {
//     apiUrl: any;
//   projectsIDs: any;




//     constructor(private http: HttpClient,private actions:Actions,private service:ServiceService,private store:Store){
//         this.apiUrl = this.service.getApiUrl();

     
//     }
 

//     todoEffect = createEffect(() => this.actions.pipe(
//       ofType(LOAD),
//       mergeMap(
//           () =>{
//             const headers = new HttpHeaders({
//               'Authorization': "Bearer " + localStorage.getItem("token")
//             });

//             return this.http.get(`${this.apiUrl}/project/project`
//             , { headers }
//             )
//               .pipe(
//                   map((data:any) => {

//                       this.store.dispatch(new SetPorteursAction(this.extractPorteurs(data.data)));   
//                       this.store.dispatch(new SetTypeRisqueListAction(this.extractTypeRisque(data.data)));   
//                       this.store.dispatch(new SetCategorie_projectAction(this.extractCategorie_project(data.data)));   
//                       this.store.dispatch(new SetRef_Convention_anneeAction(this.extractRef_Convention_anneeAction(data.data)));   
//                       this.store.dispatch(new SetRefList(this.extractRefList(data.data)));   
//                       this.store.dispatch(new SetSource(this.populatesource(data.data)));   
//                       this.store.dispatch(new SetType_institution(this.extractType_institutionList(data.data)));   
//                       this.store.dispatch(new SetstatutList(this.extractStatut_project(data.data)));   
//                       this.store.dispatch(new SetProjectsIDS(this.extractids(data.data)));   
                      
//                       return new SuccessAction(data.data);
//                   }),
//                   catchError((err) => of(new FailedAction(err)))
//               )})
//   ))


//     loadAdditionalDataEffect = createEffect(() => this.actions.pipe(
//       ofType(SUCCESS),  // Change SUCCESS_ACTION to the actual success action type dispatched in your first effect
//       mergeMap((
        
//       ) => {
//           const headers = new HttpHeaders({
//               'Authorization': "Bearer " + localStorage.getItem("token")
//           });

//           let projectsIDs;
          
//           this.store.select(projectsIDsSelector).subscribe(data=>{ projectsIDs =data})


//           // Make a second API call based on the id_project obtained from the first call
//           return this.http.get(`${this.apiUrl}/project/project_part2` , { headers })
//               .pipe(
//                   map((additionalData: any) => {
//                       // Dispatch actions to update the existing projects in the store based on id_project
//                       // this.store.dispatch(new UpdateExistingProjectsAction(additionalData));
//                       // console.error(additionalData);


//                       let projects = []
//                       let final_Project = []

//                       this.store.select(projectsSelector).subscribe(data=>{ projects =data})

//                       for(let ele of projects){
//                         for(let add of additionalData){
//                           if(ele.id_Projet == add.id_Projet ){
//                             ele = {... ele}
//                             const parsedDate = parse(ele.date_Signature_Convention, 'dd/MM/yyyy', new Date());

//                             ele["taux_delais_consome"]= ele.delai_Conventionnne!=null && ele.date_Signature_Convention!="" &&  ele.date_Signature_Convention !=null ? this.getNumberOfDays(parsedDate,new Date())*100/(ele.delai_Conventionnne*30):0
//                             if(add.date_Achievement_Projet !=null){
                           
//                               ele["taux_delais_consome"]= ele.delai_Conventionnne!=null && ele.date_Signature_Convention!="" &&  ele.date_Signature_Convention !=null  &&  add.date_Achievement_Projet !=null ? this.getNumberOfDays(parsedDate,new Date(add.date_Achievement_Projet))*100/(ele.delai_Conventionnne*30):0
                            
//                             }
                            
//                             final_Project.push(Object.assign({}, ele, add));
//                           }
//                         }
                       
//                       }
                      
//                       console.error("final_Project")
//                       console.log(final_Project)

//                       this.store.dispatch(new SetSource(this.populatesource(final_Project)));  

//                       return new SuccessActionPart2(final_Project);
//                   }),
//                   catchError((err) => of(new FailedAction(err)))
//               );
//       })
//   ));

  



//   private  getNumberOfDays(startDate:Date, endDate:Date) {
//     // Calculate the difference in milliseconds
//     const difference = endDate.getTime() - startDate.getTime();
  
//     // Convert milliseconds to days
//     const numberOfDays = difference / (1000 * 3600 * 24);
  
//     // Return the number of days (rounded to nearest integer)
//     return Math.round(numberOfDays);
//   }


//     private extractPorteurs(data) {
//         const porteursList = new Set();
//         for (const ele of data) {
//             // console.warn(ele.nom_Porteur)
//             ele.nom_Porteur && porteursList.add(ele.nom_Porteur);
//         }
//         return Array.from(porteursList);
//       }


//       private extractids(data) {
//         const ids = new Set();
//         for (const ele of data) {
//             ele.id_Projet && ids.add(ele.id_Projet);
//         }
//         return Array.from(ids);
//       }


//     private extractTypeRisque(data) {
//         const typeRisqueList = new Set();
//         for (const ele of data) {
//             ele.type_Risque && typeRisqueList.add(ele.type_Risque)
//         }
//         return Array.from(typeRisqueList);
//       }


//       private extractCategorie_project(data) {
//         const categorieList = new Set();
//         for (const ele of data) {
//             ele.categorie_Project && categorieList.add(ele.categorie_Project)
//         }
//         return Array.from(categorieList);
//       }

//       private extractStatut_project(data) {
//         const statutList = new Set();
//         for (const ele of data) {
//             ele.statut && statutList.add(ele.statut)
//         }
//         return Array.from(statutList);
//       }


//       private extractRef_Convention_anneeAction(data) {
//         const Annee_appel_projetList = new Set();
//         for (const ele of data) {
//             ele.ref_Convention_annee && Annee_appel_projetList.add(ele.ref_Convention_annee)
//           //  if( ele.date_Signature_Convention &&  ele.date_Signature_Convention!=""){
//           //   Annee_appel_projetList.add(this.extractYear(ele.date_Signature_Convention))
//           //  }
//         }
//         return Array.from(Annee_appel_projetList);
//       }

//       extractYear(date_Signature_Convention): number {
//         console.log(date_Signature_Convention)
//         const dateParts: string[] = date_Signature_Convention.split('/');
//         if (dateParts.length === 3) {
//           const year: number = +dateParts[2]; // Convert the year part to a number
//           console.error(year);
//           return year;
    

//         } else {
//           return -1; // Return -1 if the date format is invalid
//         }
//       }


//       private extractRefList(data) {
//         const refList = new Set();
//         for (const ele of data) {
//          if(ele.ref_Convention != null) refList.add(ele.ref_Convention )
//         }
//         return Array.from(refList);
//       }

//       private extractType_institutionList(data) {
//         const type_institutionList = new Set();
//         for (const ele of data) {
      
//             (ele.type_Institution && ele.type_Institution != null) &&  type_institutionList.add(ele.type_Institution)
          
      
//         }
//         return Array.from(type_institutionList);
//       }


//       private populatesource(res) {

      
//         const geom = [];
    
//         if (res !== null) {
//           for (let ele of res) {
//             for (let sites of ele.sites) {
    
//               geom.push(
//                 {
    
//                   "type": "Feature",
//                   "properties": ele,
//                   "geometry": sites.geom
//                 }
//               )
//             }
//           }
//         }
    
//         // console.log(geom)
    
//         // if (res !== null) {
//         //   for (let ele of geom) {
    
//         //     this.source.addFeatures(this.format.readFeatures(ele)
//         //     )
//         //   }
//         // }
//         return Array.from(geom);
//       }


// }