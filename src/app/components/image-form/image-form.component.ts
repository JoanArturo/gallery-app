import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageFormData } from 'src/app/models/image-form-data.model';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent {
  imageForm: FormGroup;
  errors: any[] = [];
  responseMessage?: string;

  @ViewChild('inputFile')
  inputFile!: ElementRef;

  @Output()
  savedImage: EventEmitter<Image> = new EventEmitter<Image>();

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService
  ) {
    this.imageForm = this.fb.group({
      title: [''],
      image: ['']
    });
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedFiles = target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      this.imageForm.patchValue({ image: selectedFiles[0] });
    }
  }

  onSubmit(): void {
    this.cleanResponseMessage();
    this.cleanErrors();

    const formData = new FormData as ImageFormData;
    formData.append('title', this.imageForm.get('title')?.value);
    formData.append('image', this.imageForm.get('image')?.value);

    this.imageService.saveImage(formData).subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );
  }

  private cleanResponseMessage(): void {
    this.responseMessage = "";
  }

  private cleanErrors(): void {
    this.errors = [];
  }

  private handleResponse(response: any): void {
    this.showSuccessAlert(response.message);
    this.resetForm();
    this.inputFile.nativeElement.value = "";
    this.savedImage.emit(response.data);
  }

  private showSuccessAlert(message: string): void {
    this.responseMessage = message;

    // Ocultar alerta
    setTimeout(() => {
      this.cleanResponseMessage();
    }, 3000);
  }

  private resetForm(): void {
    this.imageForm.reset({
      title: '',
      image: ''
    });
  }

  private handleErrors(errors: any): void {
    for (let error in errors.error.errors) {
      this.errors.push(errors.error.errors[error][0]);
    }
  }
}
