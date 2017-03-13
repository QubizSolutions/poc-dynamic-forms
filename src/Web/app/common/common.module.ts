import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

//Components
//import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';

//Services
import { HttpUtilityService } from './helpers/http-utility.service';

@NgModule({
    imports: [BrowserModule, FormsModule, MaterialModule],
    declarations: [],
    exports: [],
    providers: [HttpUtilityService],
    entryComponents: []
})
export class CommonModule { }
