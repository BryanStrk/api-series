import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeriesService } from '../../services/series.service';
import { Router } from '@angular/router';
import { CreateSeriePayload } from '../../models/serie.model';
import { finalize } from 'rxjs/operators'; 

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class NewComponent {
  private readonly fb = inject(FormBuilder);
  private readonly seriesService = inject(SeriesService);
  private readonly router = inject(Router);

  createdId = signal<number | null>(null);
  apiError = signal<string | null>(null);
  submitting = signal(false);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    channel: ['', [Validators.required]],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
  });

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.submitting.set(true);
    this.apiError.set(null);
    this.createdId.set(null);

    const payload: CreateSeriePayload = {
      title: this.form.value.title!,
      channel: this.form.value.channel!,
      rating: Number(this.form.value.rating),
    };

    this.seriesService
      .create(payload)
      .pipe(finalize(() => this.submitting.set(false))) 
      .subscribe({
        next: (res) => {
          const id = (res as any).id ?? (res as any)._id ?? null;
          this.createdId.set(id);
          setTimeout(() => this.router.navigate(['/home']), 1200);
        },
        error: () => this.apiError.set('No se pudo crear la serie.'),
      });
  }

  get titleCtrl() { return this.form.controls.title; }
  get channelCtrl() { return this.form.controls.channel; }
  get ratingCtrl() { return this.form.controls.rating; }
}
