import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  show(header: string, body: string, options: any = {}): void {
    this.toasts.push({ header, body, ...options });
  }

  remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
