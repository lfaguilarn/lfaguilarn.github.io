import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //animaciones para el modal
  // animations: [
  //   trigger('modalBackdrop', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('300ms ease-out', style({ opacity: 1 })),
  //     ]),
  //     transition(':leave', [
  //       animate('200ms ease-in', style({ opacity: 0 })),
  //     ]),
  //   ]),
  //   trigger('modalContent', [
  //     transition(':enter', [
  //       style({ transform: 'scale(0.9)', opacity: 0 }),
  //       animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
  //     ]),
  //     transition(':leave', [
  //       animate('200ms ease-in', style({ transform: 'scale(0.9)', opacity: 0 })),
  //     ]),
  //   ]),
  // ]
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  ngOnInit(): void {
    AOS.init();
    this.flippedCards = new Array(this.skillList.length).fill(false);
  }
  constructor(private translate: TranslateService) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'es');
  }

  switchLanguage(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const lang = selectElement.value;
  this.translate.use(lang);
}
  //para el modal de las soft skills
  // modalVisible = false;
  // selectedSkill = '';
  // skillDescriptions: { [key: string]: string } = {
  //   'Comunicación efectiva': 'Capacidad para expresar ideas de forma clara, escuchar activamente y adaptar el mensaje al público.',
  //   'Trabajo en equipo': 'Colaborar con otros, aportando al grupo, respetando ideas y trabajando por objetivos comunes.',
  //   'Resolución de problemas': 'Analizar situaciones, encontrar causas y generar soluciones eficaces ante desafíos.',
  //   'Adaptabilidad': 'Responder positivamente a cambios, nuevas situaciones y desafíos imprevistos.',
  //   'Liderazgo': 'Guiar, inspirar y motivar a un equipo hacia el logro de metas compartidas.',
  // };

  skillList = [
  {
    name: 'Comunicación',
    description: 'Capacidad para expresar ideas claramente y escuchar activamente.'
  },
  {
    name: 'Trabajo en equipo',
    description: 'Colaboración efectiva con otros para alcanzar metas comunes.'
  },
  {
    name: 'Adaptabilidad',
    description: 'Capacidad de ajustarse rápidamente a los cambios.'
  },
  {
    name: 'Pensamiento crítico',
    description: 'Evaluación objetiva de situaciones para tomar decisiones.'
  },
  {
    name: 'Liderazgo',
    description: 'Influir y guiar a otros hacia el logro de objetivos.'
  }
];
flippedCards: boolean[] = [];
toggleFlip(index: number) {
  this.flippedCards[index] = !this.flippedCards[index];
}
  // ✅ Creamos una lista de habilidades a partir del objeto
  // skillKeys: string[] = Object.keys(this.skillDescriptions);
  // Control del modal
  // selectedDescription: string = '';

  // openModal(skill: string) {
  //   this.selectedSkill = skill;
  //   this.selectedDescription = this.skillDescriptions[skill];
  //   this.modalVisible = true;
  // }

  // closeModal() {
  //   this.modalVisible = false;
  // }

  //para el boton de la foto
  isProfileMenuOpen = false;

toggleProfileMenu() {
  this.isProfileMenuOpen = !this.isProfileMenuOpen;
}

//para el boton hamburguesa
isMobileMenuOpen = false;

toggleMobileMenu() {
  this.isMobileMenuOpen = !this.isMobileMenuOpen;
}
//google translate
translatePage(event: Event) {
  const lang = (event.target as HTMLSelectElement).value;
  const translateFrame = document.querySelector('iframe.goog-te-menu-frame');

  if (translateFrame) {
    const innerDoc = (translateFrame as HTMLIFrameElement).contentDocument || (translateFrame as HTMLIFrameElement).contentWindow?.document;
    const langButtons = innerDoc?.querySelectorAll('.goog-te-menu2-item span.text');

    langButtons?.forEach((span: Element) => {
      if (span.textContent?.toLowerCase().includes(lang === 'en' ? 'english' : 'spanish')) {
        (span.parentElement as HTMLElement).click();
      }
    });
  }
}

}
