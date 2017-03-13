"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var config_interface_1 = require("../config.interface");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var config_service_1 = require("../config.service");
var guid_1 = require("../../common/helpers/guid");
var ObjectEditComponent = (function () {
    function ObjectEditComponent(formBuilder, configService, dialogRef) {
        this.formBuilder = formBuilder;
        this.configService = configService;
        this.dialogRef = dialogRef;
        this.isEdit = false;
        this.objectConfigs = [];
        this.objectValue = {};
        this.propertyType = config_interface_1.PropertyType;
        this.submitted = false;
        this.setObjectValue();
        this.objectForm = this.setFormGroup();
    }
    ObjectEditComponent.prototype.keys = function (dict) {
        return Object.keys(dict);
    };
    ObjectEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.objectValueId) {
            var sub_1 = this.configService.getObjectValueById(this.objectValueId).subscribe(function (objectValue) {
                _this.objectValue = objectValue;
                var getConfigSub = _this.configService.getObjectConfigById(_this.objectValue.ObjectConfigId).subscribe(function (objectConfig) {
                    _this.selectedObjectConfig = objectConfig;
                    _this.objectConfigs.push(_this.selectedObjectConfig);
                    _this.objectForm = _this.setFormGroup();
                    _this.isEdit = true;
                    getConfigSub.unsubscribe();
                });
                sub_1.unsubscribe();
            });
        }
        else {
            var sub_2 = this.configService.getObjectConfigs().subscribe(function (objectConfigs) {
                _this.objectConfigs = objectConfigs;
                sub_2.unsubscribe();
            });
        }
    };
    ObjectEditComponent.prototype.save = function () {
        var _this = this;
        this.submitted = true;
        if (this.objectForm.valid) {
            if (this.objectForm.dirty) {
                var objectValueToSave_1 = this.objectForm.value;
                objectValueToSave_1.Properties = {};
                this.objectForm.controls['Properties'].value.forEach(function (property) {
                    objectValueToSave_1.Properties[property.Id] = property.Value;
                });
                if (this.isEdit)
                    this.configService.updateObjectValue(objectValueToSave_1).subscribe(function (data) {
                        _this.dialogRef.close(true);
                    }, function (error) { });
                else
                    this.configService.createObjectValue(objectValueToSave_1).subscribe(function (data) {
                        _this.dialogRef.close(true);
                    }, function (error) { });
            }
            else {
                this.dialogRef.close();
            }
        }
    };
    ObjectEditComponent.prototype.removeObjectProperty = function (index) {
        var control = this.objectForm.controls['Properties'];
        control.removeAt(index);
        control.markAsTouched(true);
        this.objectForm.markAsDirty();
    };
    ObjectEditComponent.prototype.changeType = function (objectConfigId) {
        this.selectedObjectConfig = this.objectConfigs.find(function (x) { return x.Id == objectConfigId; });
        this.setObjectValue();
        this.objectForm = this.setFormGroup();
    };
    ObjectEditComponent.prototype.setObjectValue = function () {
        var _this = this;
        this.objectValue = {
            Id: guid_1.Guid.newGuid(),
            ObjectConfigId: this.selectedObjectConfig ? this.selectedObjectConfig.Id : undefined,
            Properties: []
        };
        if (this.selectedObjectConfig)
            this.selectedObjectConfig.Properties.forEach(function (x) {
                _this.objectValue.Properties[x.Id] = undefined;
            });
    };
    ObjectEditComponent.prototype.setFormGroup = function () {
        return this.formBuilder.group({
            'Id': [this.objectValue.Id],
            'ObjectConfigId': [this.objectValue.ObjectConfigId],
            'Properties': this.formBuilder.array(this.initProperties())
        });
    };
    ObjectEditComponent.prototype.initProperties = function () {
        var _this = this;
        var properties = [];
        this.keys(this.objectValue.Properties).forEach(function (key) {
            properties.push(_this.initObjectPropery(key));
        });
        return properties;
    };
    ObjectEditComponent.prototype.initObjectPropery = function (propertyId) {
        var propertyConfig = this.selectedObjectConfig.Properties.find(function (x) { return x.Id == propertyId; });
        var validators = [];
        if (propertyConfig.IsRequired)
            validators.push(forms_1.Validators.required);
        if (propertyConfig.Regex)
            validators.push(forms_1.Validators.pattern(new RegExp(propertyConfig.Regex)));
        if (propertyConfig.MinValue)
            validators.push(exports.minValueValidator(propertyConfig.MinValue));
        if (propertyConfig.MaxValue)
            validators.push(exports.maxValueValidator(propertyConfig.MaxValue));
        return this.formBuilder.group({
            'Id': [propertyId],
            'Value': [this.objectValue.Properties[propertyId], forms_1.Validators.compose(validators)],
        });
    };
    return ObjectEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ObjectEditComponent.prototype, "objectValueId", void 0);
ObjectEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'object-edit',
        styleUrls: ['object-edit.component.css'],
        templateUrl: 'object-edit.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        config_service_1.ConfigService,
        material_1.MdDialogRef])
], ObjectEditComponent);
exports.ObjectEditComponent = ObjectEditComponent;
exports.minValueValidator = function (min) {
    return function (control) {
        var num = +control.value;
        if (isNaN(num) || num < min) {
            return {
                minValue: { valid: false }
            };
        }
        return null;
    };
};
exports.maxValueValidator = function (min) {
    return function (control) {
        var num = +control.value;
        if (isNaN(num) || num > min) {
            return {
                maxValue: { valid: false }
            };
        }
        return null;
    };
};
//# sourceMappingURL=object-edit.component.js.map