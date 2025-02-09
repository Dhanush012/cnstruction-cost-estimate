import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminUserService } from '../../admin-user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-users',
  standalone:true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  providers: [
          AdminUserService // Add services here
        ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  users: any[] = [];

  constructor(private userService: AdminUserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
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
