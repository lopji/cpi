import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// guards
import { AuthenticatedGuard } from "../shared/authenticated.guard";

// components
import { MyAccountComponent } from "./my-account/my-account.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignOutComponent } from "./sign-out/sign-out.component";

// routes
const routes: Routes = [
  {
    canActivate: [AuthenticatedGuard],
    path: "my-account",
    component: MyAccountComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "sign-out",
    component: SignOutComponent
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UsersRoutingModule { }
