import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { path } from './envirement';

@Injectable({
  providedIn: 'root'
})
export class ContratsSService {

  constructor(private http:HttpClient) { 

  }
    //  private apiurl = 'http://178.170.100.76/tahaApi/api/v3/FormulaireReinseignement';

       
        apiurl=`${path}/Contrat`;
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
  public getAllContratssses():Observable<any>{
      return this.http.get<any>(`${this.apiurl}` );
    }

    
  public getAllContrat():Observable<any>{
      return this.http.get<any>(`${this.apiurl}/All` );
    }
  public findAll():Observable<any>{
      return this.http.get<any>(`${this.apiurl}/findAll` );
    }


  public update(id,data):Observable<any>{
      return this.http.put<any>(`${this.apiurl}/${id}`,data );
    }


  public delete(id):Observable<any>{
      return this.http.delete<any>(`${this.apiurl}/${id}` );
    }


  public createContrat(option:any):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/create`,option );
  }
  
  public uploadFileReparation(id,formdata):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/uploadFileReparation/${id}`,formdata);
  }


  public transitionContratToStep(contratID,stepID,commentaire):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/transitionContratToStep/${contratID}/${stepID}`,commentaire);
  }


  // public getFile(fileName: string): Observable<Blob> {
  //   // Replace 'your-backend-url' with the actual URL of your Spring Boot backend
  //   const url = `${this.apiurl}/${fileName}`;

  //   // Set up request options with responseType as 'blob' and authorization header
  //   const options = {
  //     responseType: 'blob' as 'json', // Set responseType to 'blob'
  //     headers: new HttpHeaders({
  //       Accept: 'application/pdf',
  //       Authorization: `Bearer ${this.accesTocken}`
  //     }),
      
  //   };

  //   // Send HTTP GET request
  //   return this.http.get<any>(url);
  // }

  // downloadFile(fileName: string): Observable<Blob> {
  //   const url = `http://localhost:8080/Contrat/download-file`;
  //     const params = new HttpParams()
  //       .set('fileName', fileName)
  //       .set('responseType', 'blob')

      
  //       const options = {
  //         headers: new HttpHeaders({
  //           'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //           'Authorization': `Bearer ${this.accesTocken}` // Add authorization header if needed
  //         }),
  //         params,
          
  //       };//



  //   return this.http.get<any>(url, options );
  // }

 

  download(file: string | undefined): Observable<Blob> {
    const params = new HttpParams()
        .set('fileName', file)
        .set('responseType', 'blob')

    return this.http.get(`${this.apiurl}/files`, {
      params,
      responseType: 'blob'
    });
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
