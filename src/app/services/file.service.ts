import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { path } from './envirement';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { 

  }
    //  private apiurl = 'http://178.170.100.76/tahaApi/api/v3/FormulaireReinseignement';

       
        apiurl=`${path}/ressources`;
        url=`${path}`;
     
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
  public All():Observable<any>{
      return this.http.get<any>(`${this.apiurl}/All` );
    }


   
    

  }