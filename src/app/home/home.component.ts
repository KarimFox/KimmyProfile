import { Component, ElementRef, ViewChild ,Renderer2 } from '@angular/core';
import { ParallaxService } from '../services/parallax.service';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./home2.component.css']
})



export class HomeComponent {
  @ViewChild('elem') elem: ElementRef = {} as ElementRef;
 @ViewChild('elem1') elem1: ElementRef = {} as ElementRef;


 githubData: any;
 skillsData: any;
 randomColors: string[] = [];


 mouseX = 0;
 mouseY = 0;
 top = 60;
 left = 60;
  constructor(private parallaxService: ParallaxService ,private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.parallaxService.applyParallax(this.elem.nativeElement);
    this.renderer.listen(
      'document',
      'mousemove',
      (event: MouseEvent) => {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        // console.log(this.mouseX);
        
        this.updatePosition();
      }
    );
    // this.parallaxService.applyParallax1(this.elem1.nativeElement);
    
  }

  updatePosition() {
    this.elem1.nativeElement.style.top = this.mouseY + 'px';
    // console.log(this.elem1.nativeElement.top);
    this.elem1.nativeElement.style.left = this.mouseX + 'px';
  }



  ngOnInit(): void {
    this.getGithubData();
    this.generateRandomColors();
    this.startColorChange();

  }

  getGithubData() {
    // URL del endpoint de la API de GitHub para obtener información del usuario
    const url = 'https://api.github.com/users/KarimFox/repos'
  
    // Hacer la solicitud GET a la API de GitHub utilizando Axios
    axios.get(url)
      .then(response => {
        // La solicitud fue exitosa, asignar los datos recibidos a la variable githubData
        this.githubData = response.data;
        console.log(this.githubData);
      })
      .catch(error => {
        // Manejar errores
        console.error('Error al hacer la solicitud:', error);
      });




      axios.get("https://kimmyfemboyfox-default-rtdb.firebaseio.com/Kimmyportfolio/Skills.json")
      .then(response => {
        // La solicitud fue exitosa, asignar los datos recibidos a la variable githubData
        this.skillsData = Object.values(response.data);
        console.log(this.skillsData);
      })
      .catch(error => {
        // Manejar errores
        console.error('Error al hacer la solicitud:', error);
      });
      
  }










  generateRandomColors() {
    for (let i = 0; i < 10; i++) { // Genera 10 colores aleatorios
      this.randomColors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  startColorChange() {
    setInterval(() => {
      this.rotateColors();
    }, 300); // Cambiar el color cada segundo (1000 milisegundos)
  }

  rotateColors() {
    this.randomColors.push(this.randomColors.shift()!); // Mueve el primer color al final
  }
}
