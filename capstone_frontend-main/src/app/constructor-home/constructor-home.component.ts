import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-constructor-home',
  standalone:true,
  
  imports: [CommonModule,RouterModule],
  templateUrl: './constructor-home.component.html',
  styleUrl: './constructor-home.component.css'
})
export class ConstructorHomeComponent {

}
