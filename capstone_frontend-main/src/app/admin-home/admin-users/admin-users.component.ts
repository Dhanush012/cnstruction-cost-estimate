import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  users = [
    {
      id: 1,
      name: 'Dhanush',
      email: 'dhanushtest@gmail.com',
      builtArea: 1500,
      constructionType: 'New Construction',
      constructionId: 1,
    },
    {
      id: 2,
      name: 'Ravi',
      email: 'ravi@gmail.com',
      builtArea: 1200,
      constructionType: 'Renovation',
      constructionId: 2,
    },
    {
      id: 3,
      name: 'Shyam',
      email: 'shyam@gmail.com',
      builtArea: 1800,
      constructionType: 'New Construction',
      constructionId: 3,
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
