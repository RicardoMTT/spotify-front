import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}
  showLoading: boolean;

  artistas: any[] = [];
  ngOnInit(): void {}
  buscar(termino: string) {
    this.showLoading = true;
    if (termino == '') {
      this.artistas = [];
      this.showLoading = false;
      return;
    } else {
      this.spotifyService
        .getArtist(termino)
        .pipe(
          tap((data) => {
            console.log(data);
          }),
          catchError((err) => {
            console.log('err', err);
            return of([]);
          })
        )
        .subscribe((data: any) => {
          console.log('', data);
          this.artistas = data;
          this.showLoading = false;
        });
    }
  }
}
