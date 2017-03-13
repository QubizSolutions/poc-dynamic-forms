import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { ObjectConfig, ObjectPropery, PropertyType } from '../config.interface';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { ConfigService } from '../config.service';
import { Guid } from '../../common/helpers/guid';


@Component({
    moduleId: module.id,
    selector: 'config-edit',
    styleUrls: ['config-edit.component.css'],
    templateUrl: 'config-edit.component.html',
})
export class ConfigEditComponent implements OnInit {
    @Input() objectConfigId: string;

    isEdit: boolean = false;

    configForm: FormGroup;
    objectConfig: ObjectConfig = <ObjectConfig>{
        Id: Guid.newGuid(),
        Title: '',
        Properties: []
    };
    propertyType = PropertyType
    submitted: boolean = false;

    keys(dict: any): Array<string> {
        return Object.keys(dict);
    }

    constructor(
        private formBuilder: FormBuilder,
        private configService: ConfigService,
        public dialogRef: MdDialogRef<ConfigEditComponent>
    ) {
        this.configForm = this.setFormGroup();
    }

    ngOnInit() {
        if (this.objectConfigId) {
            let sub = this.configService.getObjectConfigById(this.objectConfigId).subscribe((objectConfig) => {
                this.objectConfig = objectConfig as ObjectConfig;
                this.isEdit = true;
                this.configForm = this.setFormGroup();
            });
        } else {
            this.configForm = this.setFormGroup();
        }
    }

    save() {
        this.submitted = true;

        if (this.configForm.valid) {
            if (this.configForm.dirty) {
                let objectConfigToSave = <ObjectConfig>this.configForm.value;

                this.configForm.controls['Properties'].value.forEach((property: any) => {
                    if (property.Type == PropertyType.List) {
                        let prop = objectConfigToSave.Properties.find(x => x.Id == property.Id);
                        let listItems = <any[]>Object.assign([], property.ListItems)
                        prop.ListItems = {};
                        listItems.forEach(x => {
                            prop.ListItems[x.Id] = x.Value;
                        });
                    }

                });


                if (this.isEdit)
                    this.configService.updateObjectConfig(objectConfigToSave).subscribe(
                        data => {
                            this.dialogRef.close(true);
                        },
                        error => { });
                else
                    this.configService.createObjectConfig(objectConfigToSave).subscribe(
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

    addProperty(id: string) {
        let control = <FormArray>this.configForm.controls['Properties'];

        control.push(this.initObjectPropery(<ObjectPropery>{
            Id: Guid.newGuid(),
            Name: '',
            Type: PropertyType.Number,
            IsRequired: false,
            MinValue: undefined,
            MaxValue: undefined,
            Regex: undefined,
            ListItems: {}
        }));
        control.markAsTouched(true);
        this.configForm.markAsDirty();
    }

    removeObjectProperty(index: number) {
        let control = <FormArray>this.configForm.controls['Properties'];
        control.removeAt(index);
        control.markAsTouched(true);
        this.configForm.markAsDirty();
    }

    changeType(propertyIndex: number, propertyType: PropertyType) {
        let controlArray = <FormArray>this.configForm.controls['Properties'];

        let control = <FormGroup>controlArray.at(propertyIndex);

        control.controls['MinValue'].setValue(undefined);
        control.controls['MinValueErrorMessage'].setValue(undefined);
        control.controls['MaxValue'].setValue(undefined);
        control.controls['MaxValueErrorMessage'].setValue(undefined);
        control.controls['ListItems'].setValue([]);

        if (propertyType == PropertyType.List) {
            let listItemsControl = <FormArray>control.controls['ListItems'];
            listItemsControl.push(this.initListProperty(Guid.newGuid(), ''));
        }
    }

    addListItem(propertyIndex: number) {
        let controlArray = <FormArray>this.configForm.controls['Properties'];
        let control = <FormGroup>controlArray.at(propertyIndex);
        let listItemsControl = <FormArray>control.controls['ListItems'];
        listItemsControl.push(this.initListProperty(Guid.newGuid(), ''));
    }

    removeListProperty(propertyIndex: number, listItemIndex: number) {
        let controlArray = <FormArray>this.configForm.controls['Properties'];
        let control = <FormGroup>controlArray.at(propertyIndex);
        let listItemsControl = <FormArray>control.controls['ListItems'];
        listItemsControl.removeAt(listItemIndex);

        listItemsControl.markAsTouched(true);
        this.configForm.markAsDirty();
    }

    private setFormGroup() {
        return this.formBuilder.group({
            'Id': [this.objectConfig.Id],
            'Title': [this.objectConfig.Title, Validators.required],
            'Properties': this.formBuilder.array(
                this.initProperties(),
                Validators.compose([Validators.required, Validators.minLength(1)]))
        });
    }

    private initProperties() {
        let properties: any[] = [];
        this.objectConfig.Properties.forEach((prop) => {
            properties.push(this.initObjectPropery(prop));
        });
        return properties;
    }

    initObjectPropery(objectProperty: ObjectPropery) {
        return this.formBuilder.group({
            'Id': [objectProperty.Id],
            'Name': [objectProperty.Name, Validators.required],
            'Type': [objectProperty.Type],
            'IsRequired': [objectProperty.IsRequired],
            'Regex': [objectProperty.Regex],
            'MinValue': [objectProperty.MinValue],
            'MaxValue': [objectProperty.MaxValue],
            'IsRequiredErrorMessage': [objectProperty.IsRequiredErrorMessage],
            'RegexErrorMessage': [objectProperty.RegexErrorMessage],
            'MinValueErrorMessage': [objectProperty.MinValueErrorMessage],
            'MaxValueErrorMessage': [objectProperty.MaxValueErrorMessage],
            'IsMultiSelect': [objectProperty.IsMultiSelect],
            'ListItems': this.formBuilder.array(
                this.initListItems(objectProperty.ListItems))
        });
    }

    private initListItems(listItems: { [id: string]: any; }) {
        let properties: any[] = [];
        if (listItems) {
            this.keys(listItems).forEach((key) => {
                properties.push(this.initListProperty(key, listItems[key]));
            });
        }
        return properties;
    }

    initListProperty(id: string, value: string) {
        return this.formBuilder.group({
            'Id': [id],
            'Value': [value, Validators.required]
        });
    }
}