import {MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule, MatSnackBarModule, MatDialogModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule, MatSnackBarModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule, MatSnackBarModule, MatDialogModule]
})
export class MaterialModule { }
