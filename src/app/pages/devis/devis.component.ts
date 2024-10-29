import { Component, OnInit, inject } from '@angular/core';
import { DevisService } from '../../Services/devis.service';

@Component({
  selector: 'app-devis',
  standalone: true,
  imports: [],
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.css'
})
export class DevisComponent implements OnInit {
  ngOnInit(): void {
    this.getAllDevis()
  }
  devisList:[]=[]
  devisServ=inject(DevisService)
  getAllDevis(){
     this.devisServ.GetAllDevis().subscribe((response:any)=>{
     this.devisList=response
     },(error)=>{
      console.log(error)
     })
  }
}
