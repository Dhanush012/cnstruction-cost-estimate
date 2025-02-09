import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './user/home/home.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { AboutUsComponent } from './user/about-us/about-us.component';
import { ServicesComponent } from './user/services/services.component';
import { CatalogsComponent } from './user/catalogs/catalogs.component';
import { InquireNowComponent } from './user/inquire-now/inquire-now.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { ContactComponent } from './user/contact/contact.component';
import { MaterialsComponent } from './user/materials/materials.component';
import { ReportsComponent } from './user/reports/reports.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUsersComponent } from './admin-home/admin-users/admin-users.component';
import { AdminConstructorsComponent } from './admin-home/admin-constructors/admin-constructors.component';
import { ConstructorHomeComponent } from './constructor-home/constructor-home.component';
import { ConstructorRegisterComponent } from './constructor-home/constructor-register/constructor-register.component';



export const routes: Routes = [  // Add 'export' here
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'catalogs', component: CatalogsComponent },
  { path: 'inquire-now', component: InquireNowComponent },
  { path: 'navbar', component: NavbarComponent },
  {path:'contact', component: ContactComponent},
  {path:'materials', component: MaterialsComponent},
  {path:'reports', component: ReportsComponent},
  {path:'admin-home', component: AdminHomeComponent},
  {path:'admin-users',component: AdminUsersComponent},
  {path:'admin-constructors', component: AdminConstructorsComponent},
  {path:'constructor-home',component:ConstructorHomeComponent},
  {path:'constructor-register',component:ConstructorRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule,FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }