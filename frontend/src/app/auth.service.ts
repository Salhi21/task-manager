import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { shareReplay,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private webService: WebRequestService, private router: Router) {}
  login(email: string, password: string) {
    this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>)=>{
        /* the auth tokens will be in the header of this response */
        this.setSession(res.body._id,res.headers.get('x-access-token')!,res.headers.get('x-refresh-token')!)
      }))
  }

  private setSession(userId : string,accessToken : string,refreshToken : string){
    localStorage.setItem('user-Id',userId);
    localStorage.setItem('access-token',accessToken);
    localStorage.setItem('refresh-token',refreshToken);
  }
}
