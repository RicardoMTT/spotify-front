import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private spotifyService: SpotifyService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Paso por el interceptor');

    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err.status == 401) {
          console.log('401');
          this.spotifyService.getToken();
        }
        return from([]);
      })
    );
  }
}
