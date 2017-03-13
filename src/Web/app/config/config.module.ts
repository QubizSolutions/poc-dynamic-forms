import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { CommonModule } from '../common/common.module';

//Components
import { ConfigComponent } from './config.component';
import { ConfigEditComponent } from './config-edit/config-edit.component';
import { ObjectEditComponent } from './object-edit/object-edit.component';
import { ObjectValueEditComponent } from './object-value-edit/object-value-edit.component';
import { PropertyValueComponent } from './property-value/property-value.component'

//Services
import { ConfigService } from './config.service';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, MaterialModule, CommonModule],
    declarations: [ConfigComponent, ConfigEditComponent, ObjectEditComponent, ObjectValueEditComponent, PropertyValueComponent],
    exports: [ConfigComponent, ConfigEditComponent, ObjectEditComponent, ObjectValueEditComponent, PropertyValueComponent],
    entryComponents: [ConfigEditComponent, ObjectEditComponent],
    providers: [ConfigService]
})
export class ConfigModule { }