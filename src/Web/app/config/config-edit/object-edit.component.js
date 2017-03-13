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
        this.objectConfig = {
            Id: guid_1.Guid.newGuid(),
            Title: '',
            Properties: []
        };
        this.propertyType = config_interface_1.PropertyType;
        this.submitted = false;
        this.objectForm = this.setFormGroup();
    }
    ObjectEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.objectConfigId) {
            var sub = this.configService.getObjectConfigById(this.objectConfigId).subscribe(function (objectConfig) {
                _this.objectConfig = objectConfig;
                _this.isEdit = true;
                _this.objectForm = _this.setFormGroup();
            });
        }
        else {
            this.objectForm = this.setFormGroup();
        }
    };
    ObjectEditComponent.prototype.save = function () {
        var _this = this;
        this.submitted = true;
        if (this.objectForm.valid) {
            if (this.objectForm.dirty) {
                if (this.isEdit)
                    this.configService.updateObjectConfig(this.objectForm.value).subscribe(function (data) {
                        _this.dialogRef.close(true);
                    }, function (error) { });
                else
                    this.configService.createObjectConfig(this.objectForm.value).subscribe(function (data) {
                        _this.dialogRef.close(true);
                    }, function (error) { });
            }
            else {
                this.dialogRef.close();
            }
        }
    };
    ObjectEditComponent.prototype.addObjectProperty = function (id) {
        var control = this.objectForm.controls['Properties'];
        control.push(this.initObjectPropery({
            Id: guid_1.Guid.newGuid(),
            Name: '',
            Type: config_interface_1.PropertyType.Number,
            IsRequired: false,
            MinValue: undefined,
            MaxValue: undefined,
            Regex: undefined
        }));
        control.markAsTouched(true);
        this.objectForm.markAsDirty();
    };
    ObjectEditComponent.prototype.removeObjectProperty = function (index) {
        var control = this.objectForm.controls['Properties'];
        control.removeAt(index);
        control.markAsTouched(true);
        this.objectForm.markAsDirty();
    };
    ObjectEditComponent.prototype.changeType = function (propertyIndex) {
        var controlArray = this.objectForm.controls['Properties'];
        var control = controlArray.at(propertyIndex);
        control.controls['MinValue'].setValue(undefined);
        control.controls['MinValueErrorMessage'].setValue(undefined);
        control.controls['MaxValue'].setValue(undefined);
        control.controls['MaxValueErrorMessage'].setValue(undefined);
    };
    ObjectEditComponent.prototype.setFormGroup = function () {
        return this.formBuilder.group({
            'Id': [this.objectConfig.Id],
            'Title': [this.objectConfig.Title, forms_1.Validators.required],
            'Properties': this.formBuilder.array(this.initProperties(), forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1)]))
        });
    };
    ObjectEditComponent.prototype.initProperties = function () {
        var _this = this;
        var properties = [];
        this.objectConfig.Properties.forEach(function (prop) {
            properties.push(_this.initObjectPropery(prop));
        });
        return properties;
    };
    ObjectEditComponent.prototype.initObjectPropery = function (objectProperty) {
        return this.formBuilder.group({
            'Id': [objectProperty.Id],
            'Name': [objectProperty.Name, forms_1.Validators.required],
            'Type': [config_interface_1.PropertyType.Number],
            'IsRequired': [false],
            'MinValue': [undefined],
            'MaxValue': [undefined],
            'Regex': [undefined],
            'IsRequiredErrorMessage': [undefined],
            'RegexErrorMessage': [undefined],
            'MinValueErrorMessage': [undefined],
            'MaxValueErrorMessage': [undefined],
        });
    };
    return ObjectEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ObjectEditComponent.prototype, "objectConfigId", void 0);
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
//# sourceMappingURL=object-edit.component.js.map