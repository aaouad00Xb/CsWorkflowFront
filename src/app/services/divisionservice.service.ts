import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { path } from './envirement';

@Injectable({
  providedIn: 'root'
})
export class DivisionserviceService {

  constructor(private http:HttpClient) { 

  }
    //  private apiurl = 'http://178.170.100.76/tahaApi/api/v3/FormulaireReinseignement';

        // apiurl='http://localhost:8080/division';
        apiurl=`${path}/division`;

     
  private accesTocken = localStorage.getItem("access_token");

    // private  refresh_token= localStorage.getItem("refresh_token");
    private options2 = {
      headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
    };

    public setAccesToken(accn:string){
    this.accesTocken = accn;
    this.options2 = {
      headers: new HttpHeaders().set('Authorization', "Bearer " + this.accesTocken)
    };

    }

  // get all 
  public getAllDivisions():Observable<any>{
      return this.http.get<any>(`${this.apiurl}/getall` );
    }


  public updateDivision(id,data):Observable<any>{
      return this.http.put<any>(`${this.apiurl}/${id}`,data );
    }
  public deleteDivision(id):Observable<any>{
      return this.http.delete<any>(`${this.apiurl}/${id}/delete` );
    }
    // // get By Filter Date
    // public getAllFormulaireFiltred(option:any):Observable<any>{
    //   return this.http.get<any>(`${this.apiurl}/filter/${option}`);
    // }

    public createDivision(option:any):Observable<any>{
      return this.http.post<any>(`${this.apiurl}/createDivision`,option );
    }
    


}