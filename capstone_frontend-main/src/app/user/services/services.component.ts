import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone:true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  services = [
    {
      id: 1,
      title: 'Interior Works',
      description:
        'Dreaming of transforming your space? Let us design it for you.',
      image: 'assets/interior_design.png',
    },
    {
      id: 2,
      title: 'Renovation Works',
      description:
        'Thinking of giving your home a makeover? We’re here to bring it to life.',
      image: 'assets/renovation.png',
    },
    {
      id: 3,
      title: 'New Construction',
      description:
        'Got new land and want to relocate to a new place? We can help.',
      image: 'assets/new_construction.png',
    },
  ];

  constructor(private router: Router) {}

  // navigateToEstimation(serviceId: number): void {
  //   this.router.navigate(['/home', serviceId]);
  // }
}
