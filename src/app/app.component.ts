import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

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
  //Para los iconoces flotantes
  icons: any[] = [];
  //Para el boton flotante subir
  showScrollTopButton = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  //Variable para la interaccion del menu
  aboutIsVisible: boolean = false;
  projectsIsVisible: boolean = false;
  experienceIsVisible: boolean = false;
  educationIsVisible: boolean = false;
  skillsIsVisible: boolean = false;
  contactIsVisible: boolean = false;
   @ViewChild('about') about!: ElementRef;
  @ViewChild('projects') projects!: ElementRef;
   @ViewChild('experience') experience!: ElementRef;
  @ViewChild('education') education!: ElementRef;
   @ViewChild('skills') skills!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === this.about.nativeElement) {
          this.aboutIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.projects.nativeElement) {
          this.projectsIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.experience.nativeElement) {
          this.experienceIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.education.nativeElement) {
          this.educationIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.skills.nativeElement) {
          this.skillsIsVisible = entry.isIntersecting;
        }
        if (entry.target === this.contact.nativeElement) {
          this.contactIsVisible = entry.isIntersecting;
        }
      });
    }, {
      threshold: 0.5 // Puedes ajustar el porcentaje visible necesario
    });

    observer.observe(this.about.nativeElement);
    observer.observe(this.projects.nativeElement);
    observer.observe(this.experience.nativeElement);
    observer.observe(this.education.nativeElement);
    observer.observe(this.skills.nativeElement);
    observer.observe(this.contact.nativeElement);
  }
  ngOnInit(): void {
    AOS.init({
      duration: 1000, // Valor por defecto para todos si no se define individualmente
    });

    this.flippedCards = new Array(this.skillList.length).fill(false);
    //Para los iconos flotando
    const iconList = [
    { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Angular', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
    { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'Spring Boot', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
    { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Kubernetes', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
    { name: 'HTML', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'GitLab', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original-wordmark.svg' },
    { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'SQL Server', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
    { name: 'Azure', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
    { name: 'Csharp', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
    { name: 'Visual Basic', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualbasic/visualbasic-original.svg' },
    { name: 'Redux', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
    { name: 'Visual Studio Code', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { name: 'Sublime', src: 'assets/sublime-text-logo.png' },
    { name: 'Oracle', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
    { name: 'Postman', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'Tailwind', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Bootstrap', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original-wordmark.svg' },
    { name: 'HTML', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg' },
    { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    // ... agrega más íconos aquí
  ];
  this.icons = iconList.map(name => ({
      name,
      src: `${name.src}`,
      top: `${11+Math.random() * 90}%`,
      left: `${this.getRandomSidePosition()}%`,
      delay: `${Math.random() * 5}s`
    }));
  
  }
  //para los logos flotantes
  private getRandomSidePosition(): number {
    const leftSide = Math.random() * 25;      // 0% a 25%
    const rightSide = 75 + Math.random() * 20; // 75% a 100%
    return Math.random() < 0.5 ? leftSide : rightSide;
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
    description: 'Capacidad para expresar ideas claramente y escuchar activamente.',
    logo: 'fa-solid fa-comments'
  },
  {
    name: 'Trabajo en equipo',
    description: 'Colaboración efectiva con otros para alcanzar metas comunes.',
    logo: "fa-solid fa-users-gear"
  },
  {
    name: 'Adaptabilidad',
    description: 'Capacidad de ajustarse rápidamente a los cambios.',
    logo: 'fas fa-sync-alt'
  },
  {
    name: 'Pensamiento crítico',
    description: 'Evaluación objetiva de situaciones para tomar decisiones.',
    logo: 'fas fa-brain'
  },
  {
    name: 'Liderazgo',
    description: 'Influir y guiar a otros hacia el logro de objetivos.',
    logo: 'fas fa-user-tie'
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
  // this.isProfileMenuOpen = !this.isProfileMenuOpen;
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
//para la section del contacto
sendEmail(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    emailjs.sendForm(
      'ServiceCV',     // 🔁 Reemplaza con tu ID real
      'template_m21knz9',  // 🔁 Reemplaza con tu template ID
      e.target as HTMLFormElement,
      'ewUWZNiaHoFR0zIBY'      // 🔁 Tu Public Key (User ID nuevo)
    )
    .then(() => {
      // alert('Mensaje enviado correctamente');
      Swal.fire({
        title: "Mensaje enviado correctamente",
        icon: "success",
        draggable: true
      });
      form.reset();
    })
    .catch(() => {
      // alert('Hubo un error al enviar tu mensaje');
      Swal.fire({
        title: "Hubo un error al enviar tu mensaje",
        icon: "error",
        draggable: true
      });
      form.reset();
    });
  }

}
