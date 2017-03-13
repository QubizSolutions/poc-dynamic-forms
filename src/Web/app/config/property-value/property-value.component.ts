import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ConfigService } from '../../config/config.service';
import { ObjectConfig, ObjectPropery, PropertyType } from '../../config/config.interface';

@Component({
    moduleId: module.id,
    selector: 'property-value',
    templateUrl: 'property-value.component.html',
    styleUrls: ['property-value.component.css'],
})
export class PropertyValueComponent {
    @Input() valueControl: AbstractControl;
    @Input() propertyConfig: ObjectPropery;
    @Input() submitted: ObjectPropery;
    @Output() markFormDirty: EventEmitter<any> = new EventEmitter<any>();
    propertyType = PropertyType;

    keys(dict: any): Array<string> {
        return Object.keys(dict);
    }

    checkboxChange(checked: boolean, checkboxValue: string) {
        let value = <FormControl>(<FormGroup>this.valueControl).controls['Value'];
        if (!value.value || !(<string[]>value.value).find) {
            value.setValue([]);
        }
        if (checked) {
            value.value.push(checkboxValue);
        }
        else {
            value.setValue((<string[]>value.value).filter(x => x !== checkboxValue));
        }
        this.markFormDirty.emit();
    }

    isValueChecked(key: string) {
        let value = <FormControl>(<FormGroup>this.valueControl).controls['Value'];
        if (value.value && (<string[]>value.value).find) {
            let item = (<string[]>value.value).find(x => x == key);
            return item ? true : false;
        }
        return false;
    }
}