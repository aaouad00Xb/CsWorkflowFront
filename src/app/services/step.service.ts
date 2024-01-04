import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { path } from './envirement';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private http:HttpClient) { 

  }
    //  private apiurl = 'http://178.170.100.76/tahaApi/api/v3/FormulaireReinseignement';

        apiurl=`${path}/steps`;

     
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

 

    findAll(){
      return this.http.get<any>(`${this.apiurl}`);
    }
  
  
  


}