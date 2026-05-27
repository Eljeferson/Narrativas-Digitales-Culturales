import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-detalle-de-narrativa-publica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-detalle-de-narrativa-publica.html',
  styleUrl: './vista-detalle-de-narrativa-publica.css',
})
export class VistaDetalleDeNarrativaPublica implements OnInit {
  title = 'El eco de los Apus';
  reads = 129;
  audioReadyMs = 820;
  audioUrl = '';
  text = 'Cuando el primer rayo de sol toca la cumbre del Ausangate, los pobladores dicen que las montanas comienzan a respirar. No es un aliento humano, sino un susurro antiguo que atraviesa los siglos.';

  ngOnInit(): void {
    const started = performance.now();
    this.audioUrl = URL.createObjectURL(this.createNarrativeWav());
    this.audioReadyMs = Math.max(120, Math.round(performance.now() - started + 820));
  }

  playNarration(): void {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.text);
    utterance.lang = 'es-PE';
    speechSynthesis.speak(utterance);
    this.reads += 1;
  }

  private createNarrativeWav(): Blob {
    const sampleRate = 8000;
    const duration = 4;
    const samples = sampleRate * duration;
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    const write = (offset: number, value: string) => [...value].forEach((char, index) => view.setUint8(offset + index, char.charCodeAt(0)));
    write(0, 'RIFF'); view.setUint32(4, 36 + samples * 2, true); write(8, 'WAVE'); write(12, 'fmt ');
    view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); write(36, 'data'); view.setUint32(40, samples * 2, true);
    for (let i = 0; i < samples; i++) {
      const pulse = 190 + (this.text.charCodeAt(i % this.text.length) % 70);
      const value = Math.sin((i / sampleRate) * Math.PI * 2 * pulse) * 0.15;
      view.setInt16(44 + i * 2, value * 32767, true);
    }
    return new Blob([view], { type: 'audio/wav' });
  }
}
