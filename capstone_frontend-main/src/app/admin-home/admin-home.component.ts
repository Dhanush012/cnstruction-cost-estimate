import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { AdminUsersComponent } from './admin-users/admin-users.component';
// import { AdminConstructorsComponent } from './admin-constructors/admin-constructors.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
  
})
export class AdminHomeComponent {
  week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  projects = [
    { name: 'Project 1', status: 'Pending', cost: 100000 },
    { name: 'Project 2', status: 'Ongoing', cost: 200000 },
    { name: 'Project 3', status: 'Completed', cost: 300000 },
  ];

  constructors = [
    { name: 'John', type: 'Residential', available: true },
    { name: 'Doe', type: 'Commercial', available: false },
    { name: 'Smith', type: 'Mixed', available: true },
  ];

  navigateTo(page: string) {
    // Implement navigation logic (use router.navigate for Angular Router)
    console.log('Navigating to', page);
  }

  logout() {
    console.log('Logout logic goes here');
  }

  prevMonth() {
    console.log('Navigate to previous month');
  }

  nextMonth() {
    console.log('Navigate to next month');
  }
}
