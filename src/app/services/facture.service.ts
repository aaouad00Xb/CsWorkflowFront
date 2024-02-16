import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { path } from './envirement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http:HttpClient) { 

  }
    //  private apiurl = 'http://178.170.100.76/tahaApi/api/v3/FormulaireReinseignement';

       
        apiurl=`${path}/factures`;
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


  public update(id,data):Observable<any>{
      return this.http.put<any>(`${this.apiurl}/${id}`,data );
    }


  public delete(id):Observable<any>{
      return this.http.delete<any>(`${this.apiurl}/${id}` );
    }


  public createFacture(option:any):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/create`,option );
  }
  
  public uploadFileReparation(id,formdata):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/uploadFileReparation/${id}`,formdata);
  }


  public transitionContratToStep(contratID,stepID,commentaire):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/transitionContratToStep/${contratID}/${stepID}`,commentaire);
  }


  public validateContrat(contratID,commentaire):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/validateContrat/${contratID}`,commentaire);
  }

  public MesContrat(contratID):Observable<any>{
    return this.http.get<any>(`${this.apiurl}/MesContrat`);
  }

  public MesContratAilleur(contratID):Observable<any>{
    return this.http.get<any>(`${this.apiurl}/MesContratAilleur`);
  }

  public MesContratValid(contratID):Observable<any>{
    return this.http.get<any>(`${this.apiurl}/MesContratValid`);
  }


  public getContratById(id):Observable<any>{
    return this.http.get<any>(`${this.apiurl}/${id}` );
  }



}
