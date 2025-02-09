import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { InputService } from '../../input.service';
import { CostestimateService } from '../../costestimate.service';
import { HttpErrorResponse } from '@angular/common/http'; 
// import { HttpClient } from '@angular/common/http';
// import { MaterialsComponent } from '../materials/materials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
      FormsModule,
      ReactiveFormsModule, NavbarComponent, CommonModule,RouterModule,HttpClientModule,],
      providers: [
        InputService,
        CostestimateService, // Add services here
      ],
      
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userDetailsForm: FormGroup;
  
  // cities: string[] = ['City A', 'City B', 'City C']; // Example city options
  // states: string[] = ['State A', 'State B', 'State C']; // Example state options
  stateCitiesMap: { [state: string]: string[] } = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool', 'Nellore', 'Rajahmundry', 'Kakinada', 'Chittoor', 'Anantapur'],
    'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Naharlagun', 'Ziro', 'Pasighat', 'Roing', 'Bomdila', 'Along', 'Daporijo', 'Changlang'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Tezpur', 'Nagaon', 'Tinsukia', 'Goalpara', 'Barpeta', 'Karimganj'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Munger', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Begusarai', 'Arrah', 'Katihar'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg', 'Jagdalpur', 'Rajnandgaon', 'Raigarh', 'Ambikapur', 'Dhamtari'],
    'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Sanquelim', 'Curchorem', 'Canacona', 'Valpoi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Navsari'],
    'Haryana': ['Chandigarh', 'Gurugram', 'Faridabad', 'Ambala', 'Rohtak', 'Panchkula', 'Hisar', 'Karnal', 'Panipat', 'Sonipat'],
    'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Kangra', 'Mandi', 'Solan', 'Bilaspur', 'Chamba', 'Una'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Giridih', 'Hazaribagh', 'Deoghar', 'Dumka', 'Ramgarh', 'Pakur'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi', 'Dharwad', 'Gulbarga', 'Davangere', 'Bijapur', 'Ballari'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kottayam', 'Thrissur', 'Alappuzha', 'Palakkad', 'Kollam', 'Malappuram', 'Kannur'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas', 'Ratlam', 'Chhindwara', 'Rewa'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'],
    'Manipur': ['Imphal', 'Thoubal', 'Kangpokpi', 'Churachandpur', 'Bishnupur', 'Senapati', 'Ukhrul', 'Tamenglong', 'Noney', 'Pherzawl'],
    'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Cherrapunji', 'Baghmara', 'Mairang', 'Williamnagar', 'Resubelpara', 'Nongpoh'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Siaha', 'Champhai', 'Serchhip', 'Kolasib', 'Mamit', 'Lawngtlai', 'Hnahthial', 'Saitual'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Mon', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Longleng', 'Kiphire'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Puri', 'Sambalpur', 'Balasore', 'Baripada', 'Bolangir', 'Jeypore'],
    'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Firozpur', 'Pathankot', 'Moga'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bhilwara', 'Sikar', 'Pali'],
    'Sikkim': ['Gangtok', 'Mangan', 'Jorethang', 'Namchi', 'Gyalshing', 'Ravangla', 'Rangpo', 'Chungthang', 'Singtam', 'Pelling'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Nagercoil'],
    'Telangana': ['Hyderabad', 'Warangal', 'Khammam', 'Nizamabad', 'Karimnagar', 'Mahbubnagar', 'Ramagundam', 'Adilabad', 'Siddipet', 'Mancherial'],
    'Tripura': ['Agartala', 'Udaipur', 'Sabroom', 'Dharmanagar', 'Belonia', 'Kailashahar', 'Kamalpur', 'Amarpur', 'Sonamura', 'Melaghar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad', 'Ghaziabad', 'Noida', 'Meerut', 'Aligarh', 'Moradabad'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Rishikesh', 'Haldwani', 'Roorkee', 'Rudrapur', 'Kashipur', 'Pithoragarh', 'Almora'],
    'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur', 'Howrah', 'Asansol', 'Darjeeling', 'Bardhaman', 'Malda', 'Kharagpur', 'Jalpaiguri']
  };
  
  

  // Extract states from the mapping
  states: string[] = Object.keys(this.stateCitiesMap);

  // If you need to set cities based on the selected state:
  cities: string[] = [];
  InputId: number=0;
  totalCost: number | null = null;
  inputId!: number;


  // This method updates the cities based on the selected state
  // onStateChange(selectedState: string): void {
  //   this.cities = this.stateCitiesMap[selectedState] || [];
  // }
  onStateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null; // Type assertion and null check

    if (selectElement) {
      const selectedState = selectElement.value; // Safely access the value property
      this.cities = this.stateCitiesMap[selectedState] || [];
      this.userDetailsForm.controls['city'].setValue(''); 
    }
  }

  constructor(private fb: FormBuilder,private http: HttpClient,private router:Router,private costEstimateService: CostestimateService,private inputService:InputService) {
    this.userDetailsForm = this.fb.group({
      userName: ['', [Validators.required]],
      builtupArea: ['', [Validators.required, Validators.min(1)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      userEmail: ['', [Validators.required, Validators.email]],
      constructionType: ['', [Validators.required]],
      totalFloor: ['', [Validators.required, Validators.min(1)]],
      propName: ['', [Validators.required]],
      landclearence: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      materialQuality: ['', [Validators.required]],
    });
  }
  saveUser(event : Event) {
    event.preventDefault(); 
    this.http.post<number>('http://localhost:8080/api/userInputs/save', this.userDetailsForm)
      .subscribe({
        next: (inputId: number) => {
          console.log('User saved with inputId:', inputId);
          this.inputService.setInputId(inputId);
          this.router.navigate(['/materials']);
        },
        error: (error) => console.error('Error saving user:', error)
      });
  }


  // onSubmit(): void {
  //   if (this.userDetailsForm.valid) {
  //     this.http.post('http://localhost:8080/api/inputs', this.userDetailsForm.value).subscribe({
  //       next: (response: any) => {
  //         this.inputId = response.id; // Save inputId
  //         alert('Details saved successfully!');
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         console.error('Error submitting form:', error);
  //         alert('Failed to save details.');
  //       }
  //     });
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }


  onSubmit(): void {
    if (this.userDetailsForm.valid) {
      this.http.post('http://localhost:8080/api/inputs', this.userDetailsForm.value).subscribe({
        next: (response: any) => {
          this.inputId = response.id; // Store inputId received from backend
          this.inputService.setInputId(this.inputId);
          alert('Details saved successfully! Input ID: ' + this.inputId);
  
          // Now that we have the correct inputId, calculate cost
          this.calculateCost();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error submitting form:', error);
          alert('Failed to save details.');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  calculateCost(): void {
    if (!this.inputId) {
      alert('Please submit the form first to get an input ID.');
      return;
    }
  
    // Now call the cost estimation API with the correct inputId
    this.http.get(`http://localhost:8081/api/cost-estimates/calculate/${this.inputId}`).subscribe({
      next: (response: any) => {
        this.totalCost = response.totalCost; // Store total cost
        alert(`The calculated cost is ${this.totalCost}`);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error calculating cost:', error);
        alert('Failed to calculate cost.');
      }
    });
  }
  
  fetchInputId(userId: number): void {
    this.costEstimateService.getInputById(userId).subscribe({
      next: (response: any) => {
        if (response && response.id) {
          this.inputId = response.id; // Assign fetched inputId
          console.log("Fetched inputId:", this.inputId);
          alert(`Input ID fetched: ${this.inputId}`);
        } else {
          alert('No input ID found for this user.');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching input ID:', error);
        alert('Failed to fetch input ID.');
      }
    });
  }
    // calculateCost() {
    //   const inputId = 4; // Replace this with the actual input ID once stored
    //   this.http.get(`http://localhost:8081/api/cost-estimates/calculate/${inputId}`).subscribe({
    //     next: (response: any) => {
    //       this.totalCost = response.totalCost; // Assuming response contains a field `totalCost`
    //       alert(`The calculated cost is ${this.totalCost}`);
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       console.error('Error calculating cost:', error);
    //       alert('Failed to calculate cost.');
    //     }
    //   });
    // }
  
    //recent
    // calculateCost(): void {

    //   if (!this.inputId) {
    //     alert('Please submit the form first to get an input ID.');
    //     return;
    //   }
      
    //   this.http.get(`http://localhost:8081/api/cost-estimates/calculate/${this.inputId}`).subscribe({
    //     next: (response: any) => {
    //       console.log("I'm inside calculation")
    //       this.totalCost = response.totalCost; // Store total cost
    //       console.log("Total cost",this.totalCost);
    //       alert(`The calculated cost is ${this.totalCost}`);
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       console.error('Error calculating cost:', error);
    //       alert('Failed to calculate cost.');
    //     }
    //   });
    // }
    
}