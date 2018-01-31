import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRecordPage } from './new-record';

@NgModule({
  declarations: [
    NewRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRecordPage),
  ],
  entryComponents:[NewRecordPage]
})
export class NewRecordPageModule {}
