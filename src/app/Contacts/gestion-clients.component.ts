import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModéle } from '../Modéles/client-modéle';
import { ClientService } from '../Services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { AddClientDialogComponent } from '../add-client-dialog/add-client-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from '../core/core.service';
import { NgToastService } from 'ng-angular-popup';

declare var $: any;

@Component({
  selector: 'app-gestion-clients',
  templateUrl: './gestion-clients.component.html',
  styleUrls: ['./gestion-clients.component.css'],
})
export class GestionClientsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nom',
    'prenom',
    'telephone',
    'adresse',
    'email',
    'action',
  ];

  dataSource!: MatTableDataSource<ClientModéle>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clients: ClientModéle[] = [];

  clientToDelete!: ClientModéle;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private coreService: CoreService,
    private toast : NgToastService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  confirmDelete(clients: ClientModéle) {
    $('#deleteModal').modal('show');
    this.clientToDelete = clients;
    
  }

  closeConfirm() {
    $('#deleteModal').modal('hide');
  }

  deleteClient() {
    this.clientService.deleteClient(this.clientToDelete.id).subscribe(() => {
      console.log('deleted');
      this.toast.success({detail:"Succés",summary:'Client supprimé',duration: 5000});
      this.closeConfirm();
      this.loadClients();
    });
  }

  openAddEditCltForm() {
    const dialogRef = this.dialog.open(AddClientDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadClients();
        }
      },
    });
  }

  openEditCltForm(data: ClientModéle) {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadClients();
        }
      },
    });
  }
}
