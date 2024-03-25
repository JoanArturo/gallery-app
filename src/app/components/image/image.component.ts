import { Component, Input } from '@angular/core';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  isLoading: boolean = true;

  @Input()
  image!: Image;

  constructor() {}

  onLoad(): void {
    this.isLoading =  false;
  }
}
