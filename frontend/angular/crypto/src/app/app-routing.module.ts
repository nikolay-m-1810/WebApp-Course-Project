import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TradingComponent } from './trading/trading.component';

const routes: Routes = [
  {path: "",component: HomepageComponent},
  {path: "login",component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "**", component: NotfoundComponent},
  {path: "trading", component: TradingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
