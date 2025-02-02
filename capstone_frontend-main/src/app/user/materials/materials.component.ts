import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js/auto';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
// import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule,MatTableModule,HttpClientModule],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.css'
 
})
export class MaterialsComponent {
  // materialData: any[] = []; // Array to store data dynamically fetched from the backend
  materialData = [
    { resource: 'Cement', quantity: '2250 Bags', quality: 'High', amount: '₹9,72,000' },
    { resource: 'Steel', quantity: '17500KG', quality: 'High', amount: '₹7,65,000' },
    // Add more rows here
  ];
  materialdata = this.materialData.map((item) => ({
    ...item,
    amount: parseFloat(item.amount.replace(/[^0-9.-]+/g, '')), // Removes currency symbols and commas
  }));
  displayedColumns: string[] = ['resource', 'quantity', 'quality', 'amount']; // Table columns

  constructor(private httpClient: HttpClient) {
    Chart.register(...registerables); // Register Chart.js
  }

  ngOnInit(): void {
    this.fetchData(); // Fetch data from backend on component load
  }

  // Function to fetch data from the backend
  fetchData(): void {
    const API_ENDPOINT = 'YOUR_BACKEND_API_ENDPOINT'; // Replace with your backend API URL
    this.httpClient.get<any[]>(API_ENDPOINT).subscribe(
      (data) => {
        this.materialData = data; // Set data for the table
        this.createPieChart(); // Update the pie chart with the new data
      },
      (error) => {
        console.error('Error fetching data from backend:', error);
      }
    );
  }

  // Function to create/update the pie chart
  createPieChart(): void {
    const pieData = this.materialData.map((item) => item.amount); // Extract 'amount' for pie chart
    const pieLabels = this.materialData.map((item) => item.resource); // Extract 'resource' for labels

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: pieLabels,
        datasets: [
          {
            data: pieData,
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF5722',
              '#9C27B0', '#03A9F4', '#CDDC39', '#795548', '#FFC107',
              '#E91E63', '#009688', '#673AB7'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.label}: ₹${context.raw.toLocaleString()}`
            }
          }
        }
      }
    });
  }
 
}

