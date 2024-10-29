import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { client } from '../../interfaces/client';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ReactiveFormsModule, MatTableModule, MatIconModule],  // Use HttpClientModule here
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clientList: client[] = []
  clientServ = inject(ClientService)
  dataSource: any;
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'TaxId', 'Action'];
  selectedClient: client = {
    id: 0,
    name: '',          // Empty string as a default
    email: '',
    phone: '',
    address: '',
    TaxId: ''
  }
  isEditMode: boolean = false; // Initialize a flag for edit mode
  isAddMode: boolean = false;
  clientForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    address: new FormControl(""),
    TaxId: new FormControl(""),


  })
  ngOnInit(): void {
    this.getAllClient()
    this.getClientByEmail()
  }

  getClientByEmail() {
    this.clientServ.getClientByEmail("").subscribe((response: any) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }
  getAllClient() {
    this.clientServ.getAllClients().subscribe({
      next: (data: any) => {
        this.clientList = data;
        this.dataSource = new MatTableDataSource(data)
        console.log('Clients loaded:', this.clientList);
      },
      error: (err) => console.error('Error fetching clients:', err),
    });
  }
  onUpdateButton(id: number) {
    // Find the client with the matching ID
    c: this.selectedClient
    const foundClient = this.clientList.find(client => client.id === id);
    if (foundClient) {
      this.selectedClient = foundClient
      console.log(this.selectedClient)
      // Initialize the form with the found client's data
      this.clientForm = new FormGroup({
        name: new FormControl(foundClient.name || ""),
        email: new FormControl(foundClient.email || ""),
        address: new FormControl(foundClient.address || ""),
        phone: new FormControl(foundClient.phone || ""),
        TaxId: new FormControl(foundClient.TaxId || ""),

      });
      this.isEditMode = true

    } else {
      console.error(`Client with ID ${id} not found.`);
      // Handle the case when no client is found (optional)
    }
  }

  onEdit() {
    this.clientServ.updateClient(this.selectedClient.id, this.clientForm.value).subscribe((response: any) => {
      alert("client updated Successfuly")
      //window.location.reload();
      this.getAllClient()

      console.log(this.selectedClient)
      this.isEditMode = false

    }, (error) => {
      alert("something went wrong")
      console.log(this.selectedClient)
      console.log(error)
    })
  }
  addClient() {
    this.isAddMode = true
    this.clientForm.reset()

  }

  onAdd() {
    this.clientServ.AddClient(this.clientForm.value).subscribe((response: any) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }
  onDelete(id: any) {
    const confirmation = confirm("Do you really want to delete this client?");

    // If the user confirms, proceed with the deletion
    if (confirmation) {
      this.clientServ.deleteClient(id).subscribe((response: any) => {
        window.location.reload();
        this.getAllClient()

        console.log(this.selectedClient)

      }, (error) => {
        console.log(error)
      })
    }
    else {
      console.log("Client deletion canceled");

    }
  }

}
