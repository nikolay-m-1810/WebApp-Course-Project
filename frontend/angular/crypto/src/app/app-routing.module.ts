import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TradingComponent } from './trading/trading.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DepositComponent } from './deposit/deposit.component';

const routes: Routes = [
  {path: "",component: HomepageComponent},
  {path: "login",component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "profile", component: ProfilePageComponent},
  {path: "trading", component: TradingComponent},
  {path: "deposit", component: DepositComponent},
  {path: "**", component: NotfoundComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
