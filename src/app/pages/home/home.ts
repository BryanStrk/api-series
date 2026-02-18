import { Component, inject, OnInit, signal } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Serie } from '../../models/serie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  private readonly seriesService = inject(SeriesService);

  series = signal<Serie[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.seriesService.getAll().subscribe({
      next: (data) => {
        this.series.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el listado.');
        this.loading.set(false);
      },
    });
  }
}