import { Component, Input, OnInit } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';

@Component({
  selector: 'app-construccion',
  templateUrl: './construccion.component.html',
  styleUrls: ['./construccion.component.scss'],
})
export class ConstruccionComponent implements OnInit {
  imagenUrl = assetUrl('bkg-construccion.jpeg');
  @Input() nombre!: string;

  constructor() {}

  ngOnInit(): void {}
}
