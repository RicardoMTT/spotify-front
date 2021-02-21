import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent implements OnInit {
  sub: Subscription;
  total: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    this.sub = this.route.params
      .pipe(
        tap((val) => {
          console.log(val);
          this.total = this.spotifyService.getTracks(val.id);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
