import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: Image[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getAllImages().subscribe(
      response => this.images = response
    );
  }

  onSavedImage(image: Image): void {
    this.images.unshift(image);
    console.log(this.images);
  }
}
