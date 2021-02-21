import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {
  @Input() items;
  @Input() showArtists = false;
  @Input() showButton = false;
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {}

  seeDetails(artistId) {
    // this.spotifyService.getTracks(artistId);
    this.router.navigate([`artista/${artistId}`]);
  }
}
