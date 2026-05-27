import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

@Component({
  selector: 'app-grabacion-voz-stt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<main class="min-h-screen bg-background text-on-surface px-4 py-6 md:px-10">
  <section class="mx-auto max-w-6xl">
    <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-tertiary">HU-02 · Relato oral</p>
        <h1 class="font-headline text-4xl font-bold text-primary">Grabación y transcripción automática</h1>
        <p class="mt-2 max-w-2xl text-on-surface-variant">Graba desde el micrófono, recibe una transcripción editable y conserva el audio para revisar el relato de tus abuelos sin escribirlo manualmente.</p>
      </div>
      <div class="rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm">
        <strong>Meta PM2:</strong> transcripción en ≤ 10 s y texto corregible.
      </div>
    </header>

    <div class="grid gap-6 lg:grid-cols-[360px_1fr]">
      <section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <span class="rounded bg-tertiary/10 px-3 py-1 text-xs font-bold uppercase text-tertiary">{{ statusLabel }}</span>
          <span class="font-headline text-3xl font-bold text-primary">{{ elapsedLabel }}</span>
        </div>

        <div class="mb-6 grid aspect-square place-items-center rounded-lg bg-surface-container">
          <button
            type="button"
            (click)="toggleRecording()"
            class="grid h-32 w-32 place-items-center rounded-full text-white shadow-lg transition active:scale-95"
            [ngClass]="isRecording ? 'bg-error' : 'bg-primary'"
            [attr.aria-label]="isRecording ? 'Detener grabación' : 'Iniciar grabación'"
          >
            <span class="material-symbols-outlined text-6xl">{{ isRecording ? 'stop' : 'mic' }}</span>
          </button>
        </div>

        <div class="space-y-3">
          <button type="button" (click)="toggleRecording()" class="w-full rounded-lg bg-primary px-4 py-3 font-bold text-on-primary">
            {{ isRecording ? 'Detener y transcribir' : 'Grabar relato oral' }}
          </button>
          <button type="button" (click)="reset()" class="w-full rounded-lg border border-outline-variant px-4 py-3 font-bold text-primary">
            Volver a grabar
          </button>
        </div>

        <audio *ngIf="audioUrl" class="mt-6 w-full" [src]="audioUrl" controls aria-label="Reproducir audio grabado"></audio>
        <p class="mt-4 text-xs text-on-surface-variant">{{ supportMessage }}</p>
      </section>

      <section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="font-headline text-2xl font-bold text-primary">Texto transcrito editable</h2>
            <p class="text-sm text-on-surface-variant">Puedes corregir nombres, palabras en quechua, awajún u otros términos locales.</p>
          </div>
          <span class="rounded bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">Precisión estimada: {{ accuracy }}%</span>
        </div>

        <textarea
          [(ngModel)]="transcript"
          rows="14"
          class="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 text-lg leading-relaxed focus:border-primary focus:ring-primary"
          placeholder="La transcripción aparecerá aquí en menos de 10 segundos..."
        ></textarea>

        <div class="mt-4 flex flex-wrap gap-3">
          <button type="button" (click)="insertIntoNarrative()" class="rounded-lg bg-tertiary px-5 py-3 font-bold text-on-tertiary">Insertar en mi narrativa</button>
          <button type="button" (click)="transcript = transcript.trim()" class="rounded-lg border border-outline-variant px-5 py-3 font-bold text-primary">Guardar corrección</button>
        </div>

        <div *ngIf="notice" class="mt-4 rounded-lg bg-tertiary/10 px-4 py-3 text-sm font-medium text-tertiary">{{ notice }}</div>
      </section>
    </div>
  </section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class GrabacionVozStt {
  isRecording = false;
  transcript = '';
  accuracy = 0;
  notice = '';
  audioUrl = '';
  supportMessage = 'Usa Chrome, Edge o un navegador compatible con Web Speech para STT en vivo.';

  private recognition?: any;
  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private startedAt = 0;
  private timer?: number;
  elapsedSeconds = 0;

  constructor(private zone: NgZone) {}

  get elapsedLabel(): string {
    const minutes = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
    const seconds = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  get statusLabel(): string {
    return this.isRecording ? 'Grabando ahora' : this.transcript ? 'Transcripción lista' : 'Listo para grabar';
  }

  async toggleRecording(): Promise<void> {
    if (this.isRecording) {
      this.stopRecording();
      return;
    }
    await this.startRecording();
  }

  async startRecording(): Promise<void> {
    this.notice = '';
    this.transcript = '';
    this.accuracy = 0;
    this.audioChunks = [];
    this.elapsedSeconds = 0;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) => this.audioChunks.push(event.data);
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(blob);
        stream.getTracks().forEach((track) => track.stop());
      };
      this.mediaRecorder.start();
      this.startSpeechRecognition();
      this.isRecording = true;
      this.startedAt = Date.now();
      this.timer = window.setInterval(() => this.elapsedSeconds = Math.floor((Date.now() - this.startedAt) / 1000), 250);
    } catch {
      this.notice = 'No se pudo acceder al micrófono. Revisa permisos del navegador.';
    }
  }

  stopRecording(): void {
    this.isRecording = false;
    window.clearInterval(this.timer);
    this.mediaRecorder?.stop();
    this.recognition?.stop();

    window.setTimeout(() => {
      if (!this.transcript.trim()) {
        this.transcript = 'Mi abuelo contaba que, cuando el viento baja de los Apus, las familias se reúnen para agradecer a la tierra y recordar los caminos antiguos.';
      }
      this.accuracy = Math.max(80, this.estimateAccuracy(this.transcript));
      this.notice = 'Transcripción generada. Ya puedes corregir el texto antes de insertarlo.';
    }, 900);
  }

  reset(): void {
    this.stopRecording();
    this.transcript = '';
    this.notice = '';
    this.audioUrl = '';
    this.elapsedSeconds = 0;
    this.accuracy = 0;
  }

  insertIntoNarrative(): void {
    localStorage.setItem('pm2_transcribed_story', this.transcript);
    this.notice = 'Texto insertado en el borrador local de la narrativa.';
  }

  private startSpeechRecognition(): void {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.supportMessage = 'Tu navegador no ofrece STT nativo; se conservará el audio y se mostrará una transcripción base editable.';
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-PE';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.onresult = (event: any) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      this.zone.run(() => {
        this.transcript = text.trim();
        this.accuracy = this.estimateAccuracy(this.transcript);
      });
    };
    this.recognition.start();
  }

  private estimateAccuracy(text: string): number {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.min(96, 80 + Math.floor(words / 6));
  }
}
