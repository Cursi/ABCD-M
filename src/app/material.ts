import {MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule} from '@angular/material';

import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule]
})
export class MaterialModule { }
