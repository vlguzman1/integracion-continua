import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'project-dialog',
  styleUrls: ['./dialog.component.scss'],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close(this.data.model);
  }

  onConfirm(): void {
    this.dialogRef.close({ action: true, data: this.data.model });
  }

  onChange() {
    if (typeof this.data.onChange !== 'undefined') {
      this.data.onChange(this.data.model);
    }
  }

  addChip(event: MatChipInputEvent, model): void {
    const input = event.input;
    const value = event.value;
    const propertyOfModel = model;
    model = this.data.model[propertyOfModel];

    if (model === '') {
      model = [];
    }

    // Add our fruit
    if ((value || '').trim()) {
      model.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.data.model[propertyOfModel] = model;
    this.onChange();
  }

  removeChip(chip, fieldName): void {
    const model = this.data.model[fieldName].split(',');
    const index = model.indexOf(chip);

    if (index >= 0) {
      model.splice(index, 1);
      this.data.model[fieldName] = model.toString();
      this.onChange();
    }
  }
}
