import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminConstructorService } from '../../admin-constructor.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-constructors',
  standalone:true,
  imports: [CommonModule, RouterModule,HttpClientModule],
  providers: [
          AdminConstructorService// Add services here
        ],
  templateUrl: './admin-constructors.component.html',
  styleUrl: './admin-constructors.component.css'
})
export class AdminConstructorsComponent {
  constructors: any[] = [];

  constructor(private constructorService: AdminConstructorService) {}

  ngOnInit(): void {
    this.getAllConstructors();
  }

  getAllConstructors(): void {
    this.constructorService.getAllConstructors().subscribe({
      next: (data) => {
        this.constructors = data;
      },
      error: (err) => {
        console.error('Error fetching constructors:', err);
      }
    });
  }

  navigateTo(page: string) {
    // Implement navigation logic (use router.navigate for Angular Router)
    console.log('Navigating to', page);
  }

  logout() {
    console.log('Logout logic goes here');
  }
}
