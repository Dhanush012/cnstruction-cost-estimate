import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReportserviceService } from '../../report-service/reportservice.service';

@Component({
  selector: 'app-reports',
  imports: [NavbarComponent,MatTableModule,CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

  constructors: any[] = [];
  selectedConstructor: any = null;

  constructor(private constructorService: ReportserviceService) {}

  ngOnInit(): void {
    this.fetchConstructors();
  }

  fetchConstructors(): void {
    this.constructorService.getConstructors().subscribe((data) => {
      this.constructors = data;
    });
  }

  onSelectConstructor(constructor: any): void {
    this.selectedConstructor = constructor;
  }

  generateReport(): void {
    if (this.selectedConstructor) {
      this.constructorService
        .getReportData(this.selectedConstructor.id)
        .subscribe((data) => {
          this.createPdf(data);
        });
    }
  }
    createPdf(reportData: any): void {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Construction Report', 10, 10);
  
      // Add report details to the PDF
      doc.setFontSize(12);
      Object.keys(reportData).forEach((key, index) => {
        doc.text(`${key}: ${reportData[key]}`, 10, 20 + index * 10);
      });
  
      // Save the PDF
      doc.save('ConstructionReport.pdf');
    }
  }

