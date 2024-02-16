import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user-service.service';

@Injectable()
export class AuthInterceptorInterceptor  implements HttpInterceptor {

  constructor(private router: Router,private ueserSevvice:UserServiceService) {}

  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    
    // Retrieve the authorization token from your AuthService or wherever you store it
    let authToken = localStorage.getItem('access_token') // Replace with your actual authorization token

    console.error(authToken);
    authToken =  this.ueserSevvice.getAccessToken()   
    console.error(authToken);

    // Clone the request and add the authorization header

    if (req.url.includes('/api/v1/auth')) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });



    // Pass the cloned request with the authorization header to the next handler
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error)

        if(error.error && error.error != undefined ){
          if(error?.error?.message.includes("Your session has expired.")){
            Swal.fire({
              title: 'Error!',
              text: 'Session términée, veuillez connecter de nouveau.',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
            this.router.navigate(['/login']); 
          }
        }
        
        if (error.status === 0) {
          // Handle status code 0 indicating network/CORS error
          console.error('Network error occurred:', error);
          
          // Perform actions to handle network/CORS error as required
        } else if (error.status === 403) {
          console.log(error)
          // Handle 403 Forbidden error - Redirect user to login page or perform any action
          console.log("hello interseptor")
          console.log(authToken)
          Swal.fire({
            title: 'Error!',
            text: 'Session términée, veuillez connecter de nouveau.',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          this.router.navigate(['/login']); // Replace '/login' with your login route
        }
        return throwError(error);
      })
    );
  }
}
