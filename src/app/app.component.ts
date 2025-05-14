import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //animaciones para el modal
  animations: [
    trigger('modalBackdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('modalContent', [
      transition(':enter', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0.9)', opacity: 0 })),
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  ngOnInit(): void {
    AOS.init();
  }
  //para el modal de las soft skills
  modalVisible = false;
  selectedSkill = '';
  skillDescriptions: { [key: string]: string } = {
    'Comunicación efectiva': 'Capacidad para expresar ideas de forma clara, escuchar activamente y adaptar el mensaje al público.',
    'Trabajo en equipo': 'Colaborar con otros, aportando al grupo, respetando ideas y trabajando por objetivos comunes.',
    'Resolución de problemas': 'Analizar situaciones, encontrar causas y generar soluciones eficaces ante desafíos.',
    'Adaptabilidad': 'Responder positivamente a cambios, nuevas situaciones y desafíos imprevistos.',
    'Liderazgo': 'Guiar, inspirar y motivar a un equipo hacia el logro de metas compartidas.',
  };
  // ✅ Creamos una lista de habilidades a partir del objeto
  skillKeys: string[] = Object.keys(this.skillDescriptions);
  // Control del modal
  selectedDescription: string = '';

  openModal(skill: string) {
    this.selectedSkill = skill;
    this.selectedDescription = this.skillDescriptions[skill];
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
}
