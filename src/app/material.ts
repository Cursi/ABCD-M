import {MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule, MatSnackBarModule} from '@angular/material';

import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule, MatSnackBarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule, MatSnackBarModule]
})
export class MaterialModule { }
