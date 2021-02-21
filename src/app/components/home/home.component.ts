import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  nuevasCanciones: any[] = [];
  showLoading: boolean;
  constructor(private spotifyService: SpotifyService) {
    this.showLoading = true;
    this.spotifyService.getNewReleases().subscribe((data: any) => {
      this.nuevasCanciones = data;
      this.showLoading = false;
    });
  }

  ngOnInit(): void {}
}
