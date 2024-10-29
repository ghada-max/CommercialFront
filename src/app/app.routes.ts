import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompanyComponent } from './pages/company/company.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProductsComponent } from './pages/products/products.component';
import { EcheancesComponent } from './pages/echeances/echeances.component';
import { DevisComponent } from './pages/devis/devis.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
      path:'login',
      component:LoginComponent,
   
    },
    {
        path:'register',
        component:RegisterComponent,
     
      },
   
    {
        path:'',
        component:LayoutComponent,
        children:[
          { 
             path:"dashboard",
            component:DashboardComponent
        },
            {  
                path:"company",
            component:CompanyComponent
        },
        { 
            path:"suppliers",
           component:SuppliersComponent
       },
           {  
               path:"clients",
           component:ClientsComponent
       },   { 
        path:"products",
       component:ProductsComponent
   },
   { 
    path:"Devis",
   component:DevisComponent
},
       {  
           path:"echeances",
       component:EcheancesComponent
   },
   { 
    path:"devis",
   component:DevisComponent
},
   {  
       path:"invoice",
   component:InvoicesComponent
}

        ]

    }
];
