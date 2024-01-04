import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { path } from './envirement';
@Injectable({
  providedIn: 'root'
})
export class SoustraitantService {

  constructor(private http:HttpClient) { 

  }
    //  private apiurl = 'http://178.170.100.76/tahaApi/api/v3/FormulaireReinseignement';

        apiurl=`${path}/SousTraitant`;

     
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

 

    // public  getAllAffairesPaginated(page: number, size: number): Observable<any> {
    //   const params = new HttpParams()
    //     .set('page', page.toString())
    //     .set('size', size.toString());
    //     const options = {
    //       // headers: new HttpHeaders().set('Authorization', `Bearer ${this.accesTocken}`),
    //       params
    //     };//
    //   return this.http.get<any>(`${this.apiurl}`, options);
    // }



  // get all 
  public getAllSoustraitant():Observable<any>{
      return this.http.get<any>(`${this.apiurl}` );
    }




  public update(id,data):Observable<any>{
      return this.http.put<any>(`${this.apiurl}/${id}`,data );
    }
  public delete(id):Observable<any>{
      return this.http.delete<any>(`${this.apiurl}/${id}` );
    }
    // // get By Filter Date
    // public getAllFormulaireFiltred(option:any):Observable<any>{
    //   return this.http.get<any>(`${this.apiurl}/filter/${option}`);
    // }

    public createSoustraitant(option:any):Observable<any>{
      return this.http.post<any>(`${this.apiurl}/create-soustraitant`,option );
    }
    


}