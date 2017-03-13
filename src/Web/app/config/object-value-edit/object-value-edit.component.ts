import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { ObjectConfig, ObjectPropery, PropertyType, ObjectValue } from '../config.interface';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { ConfigService } from '../config.service';
import { Guid } from '../../common/helpers/guid';


@Component({
    moduleId: module.id,
    selector: 'object-value-edit',
    styleUrls: ['object-value-edit.component.css'],
    templateUrl: 'object-value-edit.component.html',
})
export class ObjectValueEditComponent {
    @Input() objectValue: FormGroup;
    @Input() objectConfig: ObjectConfig;
    @Input() submitted: boolean;


    propertyConfig(id: string) {
        return this.objectConfig.Properties.find(x => x.Id == id);
    }

    markFormDirty() {
        this.objectValue.markAsDirty();
    }
}