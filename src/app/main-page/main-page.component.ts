import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @ViewChild('listingModal') listing: TemplateRef<any>;

  protected listingModal: MatDialogRef<any>;

  constructor(protected route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    // this.openModal();
  }

  public openModal() {
    this.listingModal = this.dialog.open(this.listing, {
      width: '500px',
      panelClass: 'dialog-listing-container',
    });
  }
}
