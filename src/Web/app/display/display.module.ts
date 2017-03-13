import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

//Components
import { DisplayComponent } from './display.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, MaterialModule],
    declarations: [DisplayComponent],
    exports: [DisplayComponent],
})
export class DisplayModule { }