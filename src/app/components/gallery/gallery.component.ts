import { Component } from '@angular/core';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  images: Image[] = [];

  onSavedImage(image: Image): void {
    this.images.unshift(image);
    console.log(this.images);
  }
}
