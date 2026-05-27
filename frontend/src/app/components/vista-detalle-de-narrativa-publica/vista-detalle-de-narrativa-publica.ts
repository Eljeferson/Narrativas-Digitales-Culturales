import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-detalle-de-narrativa-publica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-detalle-de-narrativa-publica.html',
  styleUrl: './vista-detalle-de-narrativa-publica.css',
})
export class VistaDetalleDeNarrativaPublica {
  title = 'El eco de los Apus';
  reads = 129;
  audioReadyMs = 820;
  text = 'Cuando el primer rayo de sol toca la cumbre del Ausangate, los pobladores dicen que las montañas comienzan a respirar. No es un aliento humano, sino un susurro antiguo que atraviesa los siglos.';

  playNarration(): void {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(this.text);
    utterance.lang = 'es-PE';
    speechSynthesis.speak(utterance);
    this.reads += 1;
  }
}
