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
    selector: 'object-edit',
    styleUrls: ['object-edit.component.css'],
    templateUrl: 'object-edit.component.html',
})
export class ObjectEditComponent implements OnInit {
    @Input() objectValueId: string;

    keys(dict: any): Array<string> {
        return Object.keys(dict);
    }

    isEdit: boolean = false;

    objectForm: FormGroup;
    objectConfigs: ObjectConfig[] = [];
    selectedObjectConfig: ObjectConfig

    objectValue: ObjectValue = <ObjectValue>{

    };

    propertyType = PropertyType;
    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private configService: ConfigService,
        public dialogRef: MdDialogRef<ObjectEditComponent>
    ) {
        this.setObjectValue();
        this.objectForm = this.setFormGroup();
    }

    ngOnInit() {
        if (this.objectValueId) {
            let sub = this.configService.getObjectValueById(this.objectValueId).subscribe((objectValue) => {
                this.objectValue = objectValue as ObjectValue;

                let getConfigSub = this.configService.getObjectConfigById(this.objectValue.ObjectConfigId).subscribe((objectConfig) => {
                    this.selectedObjectConfig = objectConfig as ObjectConfig;
                    this.objectConfigs.push(this.selectedObjectConfig);

                    this.objectForm = this.setFormGroup();
                    this.isEdit = true;
                    getConfigSub.unsubscribe();
                });

                sub.unsubscribe();
            });
        }
        else {
            let sub = this.configService.getObjectConfigs().subscribe((objectConfigs) => {
                this.objectConfigs = objectConfigs as ObjectConfig[];
                sub.unsubscribe();
            });
        }
    }

    save() {
        this.submitted = true;

        if (this.objectForm.valid) {
            if (this.objectForm.dirty) {
                let objectValueToSave = <ObjectValue>this.objectForm.value;
                objectValueToSave.Properties = {};

                this.objectForm.controls['Properties'].value.forEach((property: { Id: string, Value: string }) => {
                    objectValueToSave.Properties[property.Id] = property.Value;
                });


                if (this.isEdit)
                    this.configService.updateObjectValue(objectValueToSave).subscribe(
                        data => {
                            this.dialogRef.close(true);
                        },
                        error => { });
                else
                    this.configService.createObjectValue(objectValueToSave).subscribe(
                        data => {
                            this.dialogRef.close(true);
                        },
                        error => { });
            }
            else {
                this.dialogRef.close();
            }
        }
    }

    removeObjectProperty(index: number) {
        let control = <FormArray>this.objectForm.controls['Properties'];
        control.removeAt(index);
        control.markAsTouched(true);
        this.objectForm.markAsDirty();
    }

    changeType(objectConfigId: string) {
        this.selectedObjectConfig = this.objectConfigs.find(x => x.Id == objectConfigId);

        this.setObjectValue();
        this.objectForm = this.setFormGroup();
    }

    private setObjectValue() {
        this.objectValue = <ObjectValue>{
            Id: Guid.newGuid(),
            ObjectConfigId: this.selectedObjectConfig ? this.selectedObjectConfig.Id : undefined,
            Properties: []
        };

        if (this.selectedObjectConfig)
            this.selectedObjectConfig.Properties.forEach(x => {
                this.objectValue.Properties[x.Id] = undefined;
            });
    }

    private setFormGroup() {
        return this.formBuilder.group({
            'Id': [this.objectValue.Id],
            'ObjectConfigId': [this.objectValue.ObjectConfigId],
            'Properties': this.formBuilder.array(
                this.initProperties())
        });
    }

    private initProperties() {
        let properties: any[] = [];
        this.keys(this.objectValue.Properties).forEach((key) => {
            properties.push(this.initObjectPropery(key));
        });
        return properties;
    }

    initObjectPropery(propertyId: string) {
        let propertyConfig = this.selectedObjectConfig.Properties.find(x => x.Id == propertyId);

        let validators = [];

        if (propertyConfig.IsRequired)
            validators.push(Validators.required);

        if (propertyConfig.Regex)
            validators.push(Validators.pattern(new RegExp(propertyConfig.Regex)));

        if (propertyConfig.MinValue)
            validators.push(minValueValidator(propertyConfig.MinValue));

        if (propertyConfig.MaxValue)
            validators.push(maxValueValidator(propertyConfig.MaxValue));

        return this.formBuilder.group({
            'Id': [propertyId],
            'Value': [this.objectValue.Properties[propertyId], Validators.compose(validators)],
        });
    }
}


export const minValueValidator = (min: number) => {
    return (control: FormControl) => {
        var num = +control.value;
        if (isNaN(num) || num < min) {
            return {
                minValue: { valid: false }
            };
        }
        return null;
    };
};

export const maxValueValidator = (min: number) => {
    return (control: FormControl) => {
        var num = +control.value;
        if (isNaN(num) || num > min) {
            return {
                maxValue: { valid: false }
            };
        }
        return null;
    };
};