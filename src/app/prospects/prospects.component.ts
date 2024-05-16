import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProspectModéle } from '../Modéles/Prospect-Modéle';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProspectService } from '../Services/Prospect.service';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { AddProspectDialogComponent } from '../add-prospect-dialog/add-prospect-dialog.component';

declare var $: any;

@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  styleUrls: ['./prospects.component.css'],
})
export class ProspectsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nom',
    'prenom',
    'telephone',
    'adresse',
    'action',
  ];

  dataSource!: MatTableDataSource<ProspectModéle>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  prospect: ProspectModéle[] = [];

  propectToDelete!: ProspectModéle;

  constructor(
    private prospectService: ProspectService,
    private dialog: MatDialog,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.loadProspect();
  }

  loadProspect() {
    this.prospectService.getAllProspects().subscribe({
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

  confirmDelete(prospect: ProspectModéle) {
    $('#deleteModal').modal('show');
    this.propectToDelete = prospect;
  }

  closeConfirm() {
    $('#deleteModal').modal('hide');
  }

  deleteProspect() {
    this.prospectService
      .deleteProspect(this.propectToDelete.id)
      .subscribe(() => {
        console.log('deleted');
        this.coreService.openSnackBar('Prospect supprimé', 'Fermer');
        this.closeConfirm();
        this.loadProspect();
      });
  }

  openAddEditCltForm() {
    const dialogRef = this.dialog.open(AddProspectDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadProspect();
        }
      },
    });
  }

  openEditCltForm(data: ProspectModéle) {
    const dialogRef = this.dialog.open(AddProspectDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadProspect();
        }
      },
    });
  }
}
