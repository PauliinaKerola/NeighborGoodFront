import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-details-dialog',
  templateUrl: './contact-details-dialog.component.html',
  styleUrls: ['./contact-details-dialog.component.scss']
})
export class ContactDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: any},
              public dialogRef: MatDialogRef<ContactDetailsDialogComponent>) { }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
