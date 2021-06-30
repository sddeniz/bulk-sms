import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSimpleComponent } from './auth/simple/simple.component';
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { FullComponent } from "./shared/components/layout/full/full.component";
// import { full } from "./shared/routes/full.routes";
// import { content } from "./shared/routes/routes";

// import { AdminGuard } from './shared/guard/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: ContentComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: RegisterSimpleComponent

  },
  {
    path: '',
    component: RegisterSimpleComponent,
  },
  
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
