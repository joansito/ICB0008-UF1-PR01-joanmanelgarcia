import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home/:reload',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'filmdetail/:dataObj/:edit',
    loadChildren: () => import('./filmdetail/filmdetail.module').then(m => m.FilmdetailPageModule)
  },
  {
    path: 'filmdetail',
    loadChildren: () => import('./filmdetail/filmdetail.module').then(m => m.FilmdetailPageModule)
  },
  {
    path: 'filmdetail/:edit',
    loadChildren: () => import('./filmdetail/filmdetail.module').then(m => m.FilmdetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
