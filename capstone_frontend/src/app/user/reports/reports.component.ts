import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ReportserviceService } from '../../reportservice.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReportResponseDto } from '../../models/report-response.dto';
import { HttpClientModule } from '@angular/common/http';
import { InputService } from '../../input.service';

@Component({
  selector: 'app-reports',
  standalone:true,
  imports: [NavbarComponent,MatTableModule,CommonModule,RouterModule,HttpClientModule],
   providers: [
            ReportserviceService,InputService
             // Add services here
          ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

//   constructors: any[] = [];  // List of constructors fetched from backend
//   selectedConstructorId: number | null = null;
//   reportData: ReportResponseDto | null = null;

//   constructor(private reportsService: ReportserviceService) {}

//   ngOnInit(): void {
//     // Assuming that the constructor data is fetched from an API
//     const inputId = 34;  // Example inputId (replace with dynamic input)
//     this.reportsService.getReport(inputId).subscribe({
//       next: (data) => {
//         this.reportData = data;
//         console.log(this.reportData);
//       },
//       error: (error) => {
//         console.error('Error fetching report:', error);
//       },
//     });
//   }

//   fetchConstructors(): void {
//     this.reportsService.getConstructors().subscribe({
//       next: (data) => {
//         this.constructors = data;
//       },
//       error: (error) => {
//         console.error('Error fetching constructors:', error);
//       }
//     });
//   }

//   onConstructorSelect(constructorId: number): void {
//     this.selectedConstructorId = constructorId;
//     this.fetchReportData(constructorId);
//   }

//   fetchReportData(constructorId: number): void {
//     this.reportsService.getReport(constructorId).subscribe({
//       next: (data: ReportResponseDto) => {
//         this.reportData = data;
//       },
//       error: (error) => {
//         console.error('Error fetching report data:', error);
//       }
//     });
//   }

//   downloadPdf(): void {
//     if (this.selectedConstructorId) {
//       this.reportsService.generatePdf(this.selectedConstructorId).subscribe({
//         next: (data) => {
//           const blob = new Blob([data], { type: 'application/pdf' });
//           const link = document.createElement('a');
//           link.href = URL.createObjectURL(blob);
//           link.download = 'report.pdf';
//           link.click();
//         },
//         error: (error) => {
//           console.error('Error downloading PDF:', error);
//         }
//       });
//     }
//   }
// }
constructors: any[] = [];  // List of constructors fetched from backend
  selectedConstructorId: number | null = null;  // Store selected constructor's ID
  reportData: ReportResponseDto | null = null; 
  inputId: number| null=null; // Store fetched report data
  
  constructor(
    private reportsService: ReportserviceService,
    private inputService: InputService  // Inject inputService
  ) {}

  ngOnInit(): void {
    // Fetch the inputId from the service when the component initializes
    this.inputId = this.inputService.getInputId();
    console.log('Input ID:', this.inputId);

    // Fetch constructors when component initializes
    this.fetchConstructors();
    
    // Fetch the report data right away if inputId is available
    if (this.inputId) {
      this.fetchReportData(this.inputId);
    }
  }

  fetchConstructors(): void {
    this.reportsService.getConstructors().subscribe({
      next: (data) => {
        this.constructors = data;
      },
      error: (error) => {
        console.error('Error fetching constructors:', error);
      },
    });
  }

  onConstructorSelect(constructorId: number): void {
    console.log('Constructor selected:', constructorId);
    this.selectedConstructorId = constructorId;

    // Fetch the report data based on the inputId
    this.fetchReportData(this.inputId);  // Only pass inputId now
  }

  fetchReportData(inputId: number | null): void {
    if (inputId) {
      this.reportsService.getReport(inputId).subscribe({
        next: (data: ReportResponseDto) => {
          this.reportData = data;
          console.log('Fetched Report Data:', this.reportData);
        },
        error: (error) => {
          console.error('Error fetching report data:', error);
        },
      });
    } else {
      console.error('Input ID is not available!');
    }
  }

  downloadPdf(): void {
    if (this.selectedConstructorId && this.reportData) {
      this.reportsService.generatePdf(this.selectedConstructorId).subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'report.pdf';
          link.click();
        },
        error: (error) => {
          console.error('Error downloading PDF:', error);
        },
      });
    } else if (this.reportData && this.inputId !== null) {
      // If no constructor selected, generate the report PDF based on available data
      this.reportsService.generatePdf(this.inputId).subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'report.pdf';
          link.click();
        },
        error: (error) => {
          console.error('Error downloading PDF:', error);
        },
      });
    } else {
      console.error('No report data available!');
    }
  }
}