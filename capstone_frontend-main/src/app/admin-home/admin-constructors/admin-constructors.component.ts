import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-constructors',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-constructors.component.html',
  styleUrl: './admin-constructors.component.css'
})
export class AdminConstructorsComponent {
  constructors = [
    {
      id: 1,
      name: 'abcd',
      email: 'dhanushtest@gmail.com',
      experience: 15,
      specialization: 'New Construction',
      available: 'Yes',
    },
    {
      id: 2,
      name: 'defg',
      email: 'ravi@gmail.com',
      experience: 12,
      specialization: 'Renovation',
      available: 'Yes',
    },
    {
      id: 3,
      name: 'hijk',
      email: 'shyam@gmail.com',
      experience: 18,
      specialization: 'New Construction',
      available: 'Yes',
    },
  ];

  navigateTo(page: string) {
    // Implement navigation logic (use router.navigate for Angular Router)
    console.log('Navigating to', page);
  }

  logout() {
    console.log('Logout logic goes here');
  }
}
