import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';

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

  constructor(
    private imageService: ImageService,
    private modalService: NgbModal
  ) {}

  onLoad(): void {
    this.isLoading =  false;
  }

  openImageModal(): void {
    const modalRef = this.modalService.open(ImageModalComponent, { size: 'lg' });
    modalRef.componentInstance.image = this.image;
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
