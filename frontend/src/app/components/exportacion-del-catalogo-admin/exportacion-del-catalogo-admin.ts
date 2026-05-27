import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CatalogItem {
  titulo: string;
  cultura: string;
  region: string;
  palabrasClaveNlp: string[];
  url: string;
}

@Component({
  selector: 'app-exportacion-del-catalogo-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exportacion-del-catalogo-admin.html',
  styleUrl: './exportacion-del-catalogo-admin.css',
})
export class ExportacionDelCatalogoAdmin {
  elapsed = 0;
  catalog: CatalogItem[] = [
    { titulo: 'El eco de los Apus', cultura: 'Andina', region: 'Cusco', palabrasClaveNlp: ['apus', 'cóndor', 'memoria oral'], url: '/vista-detalle-de-narrativa-publica' },
    { titulo: 'Río que canta', cultura: 'Amazónica', region: 'Amazonas', palabrasClaveNlp: ['río', 'maloca', 'origen'], url: '/vista-detalle-de-narrativa-publica' }
  ];

  export(format: 'csv' | 'json'): void {
    const started = performance.now();
    const content = format === 'json' ? JSON.stringify(this.catalog, null, 2) : this.toCsv();
    const url = URL.createObjectURL(new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `catalogo-cultural.${format}`;
    link.click();
    URL.revokeObjectURL(url);
    this.elapsed = Number(((performance.now() - started) / 1000).toFixed(2));
  }

  private toCsv(): string {
    return [
      'titulo,cultura,region,palabras_clave_nlp,url',
      ...this.catalog.map((item) => `${item.titulo},${item.cultura},${item.region},"${item.palabrasClaveNlp.join('|')}",${item.url}`)
    ].join('\n');
  }
}
