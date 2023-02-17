import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FillFormComponent } from './fill-form/fill-form.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: "login", component: FillFormComponent },
  // { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "instructions", component: InstructionsComponent },
  //  { path: "home", component: NavigationComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
