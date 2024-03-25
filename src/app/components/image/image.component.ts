import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  isLoading: boolean = true;

  @Input()
  image!: Image;

  @Output()
  deletedImage: EventEmitter<number> = new EventEmitter<number>();

  constructor(private imageService: ImageService) {}

  onLoad(): void {
    this.isLoading =  false;
  }

  deleteImage(): void {
    this.imageService.deleteImage(this.image.id).subscribe(
      response => this.handleResponse(response),
      errors => console.log(errors)
    );
  }

  private handleResponse(response: any): void {
    this.deletedImage.emit(this.image.id);
  }
}
