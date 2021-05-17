import { HttpInterceptor } from '@angular/common/http';
import { Injectable ,Injector} from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor( private _injector:Injector ) { }

  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; },next: { handle: (arg0: any) => any; }){
    let authService = this._injector.get(AuthService)
    let tokenizedReq = req.clone(
      {
      setHeaders:{
        Authorization:`Bearer ${authService.getToken()}`
      }
    }
    )
    return next.handle(tokenizedReq)
  }
}
