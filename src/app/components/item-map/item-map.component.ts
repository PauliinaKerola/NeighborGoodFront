import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { interval } from 'rxjs';


@Component({
  selector: 'app-item-map',
  templateUrl: './item-map.component.html',
  styleUrls: ['./item-map.component.scss']
})


export class ItemMapComponent implements OnInit {

  @Input() lat: number;
  @Input() lng: number;
  map: L.Map;
  centroid: L.LatLngExpression;
  distance: string;
  options: any;
  constructor() { }

  ngOnInit(): void {
    this.centroid = [this.lat, this.lng];
    this.options = {
      zoom: 18,
      center: this.centroid
    }
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 18
    });

    const myIcon = L.icon({
      iconUrl: 'http://localhost:4200/marker-icon.png',
      // ...
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,

    });
    tiles.addTo(this.map);
    L.marker([this.lat, this.lng], { icon: myIcon }).addTo(this.map)
  }
}