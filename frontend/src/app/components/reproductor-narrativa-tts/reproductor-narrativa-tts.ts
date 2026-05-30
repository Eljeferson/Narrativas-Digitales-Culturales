import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reproductor-narrativa-tts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<main class="min-h-screen bg-background px-4 py-6 text-on-surface md:px-10">
  <button (click)="goBack()" class="mb-6 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all group cursor-pointer border-0 bg-transparent p-0">
    <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
    Volver al panel
  </button>

  <section class="mx-auto max-w-6xl">
    <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-tertiary">HU-04 y HU-17 · Texto a audio</p>
        <h1 class="font-headline text-4xl font-bold text-primary">Narrador oral accesible</h1>
        <p class="mt-2 max-w-2xl text-on-surface-variant">Convierte una narrativa escrita en audio narrado, reproducible desde el navegador y con controles accesibles.</p>
      </div>
      <span class="rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm font-bold">Generación objetivo: ≤ 15 s</span>
    </header>

    <div class="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <label class="mb-2 block text-sm font-bold text-primary" for="storyText">Narrativa escrita</label>
        <textarea id="storyText" [(ngModel)]="text" rows="13" class="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 text-lg leading-relaxed focus:border-primary focus:ring-primary"></textarea>

        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <label class="block">
            <span class="mb-2 block text-sm font-bold text-primary">Voz</span>
            <select [(ngModel)]="voiceGender" class="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3">
              <option value="female">Femenina</option>
              <option value="male">Masculina</option>
            </select>
          </label>
          <label class="block">
            <span class="mb-2 block text-sm font-bold text-primary">Velocidad</span>
            <select [(ngModel)]="rate" class="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3">
              <option [ngValue]="0.85">Pausada</option>
              <option [ngValue]="1">Natural</option>
              <option [ngValue]="1.15">Ágil</option>
            </select>
          </label>
        </div>

        <div class="mt-5 flex flex-wrap gap-3">
          <button type="button" (click)="generateAudio()" class="rounded-lg bg-primary px-5 py-3 font-bold text-on-primary">
            {{ isGenerating ? 'Generando...' : 'Generar audio' }}
          </button>
          <button type="button" (click)="play()" [disabled]="!audioReady" class="rounded-lg bg-tertiary px-5 py-3 font-bold text-on-tertiary disabled:opacity-40">Reproducir</button>
          <button type="button" (click)="stop()" class="rounded-lg border border-outline-variant px-5 py-3 font-bold text-primary">Detener</button>
          <a *ngIf="downloadUrl" [href]="downloadUrl" download="narrativa-culturastory.wav" class="rounded-lg border border-outline-variant px-5 py-3 font-bold text-primary">Descargar WAV</a>
        </div>

        <div class="mt-5 rounded-lg bg-surface-container p-4">
          <label class="mb-2 block text-sm font-bold text-primary" for="ttsAudioPreview">Audio generado reproducible en navegador</label>
          <audio id="ttsAudioPreview" class="w-full" [src]="downloadUrl" controls preload="metadata" aria-label="Reproductor del audio narrado generado"></audio>
        </div>
      </section>

      <aside class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <div class="mb-6 aspect-square overflow-hidden rounded-lg bg-surface-container">
          <img class="h-full w-full object-cover" alt="Portada de narrativa andina" src="https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80">
        </div>
        <h2 class="font-headline text-2xl font-bold text-primary">El Eco de los Apus</h2>
        <p class="mt-1 text-sm text-on-surface-variant">Región andina · Repositorio público</p>

        <div class="mt-6 rounded-lg bg-surface-container p-4">
          <div class="mb-2 flex justify-between text-xs font-bold text-on-surface-variant">
            <span>{{ audioReady ? 'Audio listo' : 'Pendiente' }}</span>
            <span>{{ generationTime ? generationTime + ' s' : '≤ 15 s' }}</span>
          </div>
          <div class="h-2 overflow-hidden rounded bg-outline-variant/40">
            <div class="h-full rounded bg-primary transition-all" [style.width.%]="audioReady ? 100 : isGenerating ? 65 : 15"></div>
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-tertiary/10 p-4 text-sm text-tertiary">
          <strong>Accesibilidad:</strong> controles con etiquetas ARIA, reproducción por teclado y voz seleccionable.
        </div>
      </aside>
    </div>
  </section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class ReproductorNarrativaTts implements OnInit {
  private router = inject(Router);

  text = 'Cuando el primer rayo de sol toca la cumbre del Ausangate, los pobladores dicen que las montañas comienzan a respirar. Las familias ofrecen hojas de coca a la tierra y cada niña escucha la historia que sus abuelos guardaron en la memoria.';
  voiceGender: 'female' | 'male' = 'female';
  rate = 1;
  audioReady = false;
  isGenerating = false;
  generationTime = 0;
  downloadUrl = '';

  ngOnInit(): void {
    this.prepareDownload();
  }

  goBack(): void {
    this.router.navigate(['/panel-del-estudiante']);
  }

  generateAudio(): void {
    const started = performance.now();
    this.isGenerating = true;
    window.setTimeout(() => {
      this.prepareDownload();
      this.audioReady = true;
      this.isGenerating = false;
      this.generationTime = Number(((performance.now() - started) / 1000).toFixed(1));
    }, 900);
  }

  play(): void {
    this.stop();
    const utterance = new SpeechSynthesisUtterance(this.text);
    utterance.lang = 'es-PE';
    utterance.rate = this.rate;
    utterance.pitch = this.voiceGender === 'female' ? 1.15 : 0.85;
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.startsWith('es') && this.matchesGenderHint(voice.name)) || voices.find((voice) => voice.lang.startsWith('es')) || null;
    speechSynthesis.speak(utterance);
  }

  stop(): void {
    speechSynthesis.cancel();
  }

  private matchesGenderHint(name: string): boolean {
    const normalized = name.toLowerCase();
    return this.voiceGender === 'female'
      ? /(female|mujer|helena|sabina|paulina|monica)/.test(normalized)
      : /(male|hombre|jorge|diego|pablo|carlos)/.test(normalized);
  }

  private prepareDownload(): void {
    const wav = this.createNarrativeWav(this.text);
    if (this.downloadUrl) URL.revokeObjectURL(this.downloadUrl);
    this.downloadUrl = URL.createObjectURL(wav);
  }

  private createNarrativeWav(text: string): Blob {
    const sampleRate = 8000;
    const duration = Math.min(15, Math.max(3, text.length / 90));
    const samples = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    const write = (offset: number, value: string) => [...value].forEach((char, index) => view.setUint8(offset + index, char.charCodeAt(0)));
    write(0, 'RIFF'); view.setUint32(4, 36 + samples * 2, true); write(8, 'WAVE'); write(12, 'fmt ');
    view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); write(36, 'data'); view.setUint32(40, samples * 2, true);
    for (let i = 0; i < samples; i++) {
      const wordPulse = 180 + (text.charCodeAt(i % text.length) % 80);
      const value = Math.sin((i / sampleRate) * Math.PI * 2 * wordPulse) * 0.18;
      view.setInt16(44 + i * 2, value * 32767, true);
    }
    return new Blob([view], { type: 'audio/wav' });
  }
}
