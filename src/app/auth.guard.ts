import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


import { Store } from '@ngrx/store';
import { userSelector } from './store/reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  pages: any;
  user: any;
  constructor(private router: Router,private store: Store<any>){
   

    this.store.select(userSelector).subscribe(data => { this.user = data; })


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // provides the route configuration options.
   const { routeConfig } = route; 
      // provides the path of the route.
   const { path } = routeConfig as Route; 

  if(this.user.id == undefined || this.user.id == null || !localStorage.getItem("access_token")){

    console.log(this.user.id)
    console.log(this.user.id)
    console.log(localStorage.getItem("access_token"))
    this.router.navigate(['/login']); 
    return false;
  }
 
  
  if(this.user){
    return true;
  }
 
  

 
    
  }
  
}

