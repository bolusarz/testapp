import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule, MatButtonModule, MatIconModule,
  MatCardModule, MatCheckboxModule, MatMenuModule,
  MatToolbarModule, MatGridListModule, MatSidenavModule,
  MatListModule, MatNativeDateModule, MatExpansionModule,
  MatTableModule, MatDialogModule, MatPaginatorModule,
  MatSelectModule, MatDatepickerModule, MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatCardModule, MatCheckboxModule, MatMenuModule,
    MatToolbarModule, MatGridListModule, MatSidenavModule,
    MatListModule, MatNativeDateModule, MatExpansionModule,
    MatTableModule, MatDialogModule, MatPaginatorModule,
    MatSelectModule, MatDatepickerModule, MatTabsModule
  ],
  exports: [
    MatInputModule, MatButtonModule, MatIconModule,
    MatCardModule, MatCheckboxModule, MatMenuModule,
    MatToolbarModule, MatGridListModule, MatSidenavModule,
    MatListModule, MatNativeDateModule, MatExpansionModule,
    MatTableModule, MatDialogModule, MatPaginatorModule,
    MatSelectModule, MatDatepickerModule, MatTabsModule
  ],
  declarations: []
})
export class MaterialModule { }
