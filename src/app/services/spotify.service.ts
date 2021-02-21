import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getToken() {
    const clientId = '4b11ed4744c949c38865a052b2a3482d';
    const client_secret = '60646acf10af4ecfb098efdb2b6e5171';
    return this.http
      .get(`http://localhost:3000/spotify/${clientId}/${client_secret}`, {})
      .subscribe((data: any) => {
        this.cookieService.set('token', data.access_token);
        // localStorage.setItem('token', data.access_token);
      });
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.cookieService.get('token')}`,
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases').pipe(
      map((data: any) => {
        return data.albums.items;
      })
    );
  }

  getArtist(termino: string) {
    return this.getQuery(`search?query=${termino}&type=artist`).pipe(
      map((data: any) => {
        return data.artists.items;
      })
    );
  }

  getTracks(idArtist) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.cookieService.get('token')}`,
    });
    return this.http
      .get(
        `https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=ES`,
        {
          headers,
        }
      )
      .pipe(
        map((data: any) => {
          return data.tracks;
        })
      );
  }
}
