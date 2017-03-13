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
var ConfigEditComponent = (function () {
    function ConfigEditComponent(formBuilder, configService, dialogRef) {
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
        this.configForm = this.setFormGroup();
    }
    ConfigEditComponent.prototype.keys = function (dict) {
        return Object.keys(dict);
    };
    ConfigEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.objectConfigId) {
            var sub = this.configService.getObjectConfigById(this.objectConfigId).subscribe(function (objectConfig) {
                _this.objectConfig = objectConfig;
                _this.isEdit = true;
                _this.configForm = _this.setFormGroup();
            });
        }
        else {
            this.configForm = this.setFormGroup();
        }
    };
    ConfigEditComponent.prototype.save = function () {
        var _this = this;
        this.submitted = true;
        if (this.configForm.valid) {
            if (this.configForm.dirty) {
                var objectConfigToSave_1 = this.configForm.value;
                this.configForm.controls['Properties'].value.forEach(function (property) {
                    if (property.Type == config_interface_1.PropertyType.List) {
                        var prop_1 = objectConfigToSave_1.Properties.find(function (x) { return x.Id == property.Id; });
                        var listItems = Object.assign([], property.ListItems);
                        prop_1.ListItems = {};
                        listItems.forEach(function (x) {
                            prop_1.ListItems[x.Id] = x.Value;
                        });
                    }
                });
                if (this.isEdit)
                    this.configService.updateObjectConfig(objectConfigToSave_1).subscribe(function (data) {
                        _this.dialogRef.close(true);
                    }, function (error) { });
                else
                    this.configService.createObjectConfig(objectConfigToSave_1).subscribe(function (data) {
                        _this.dialogRef.close(true);
                    }, function (error) { });
            }
            else {
                this.dialogRef.close();
            }
        }
    };
    ConfigEditComponent.prototype.addProperty = function (id) {
        var control = this.configForm.controls['Properties'];
        control.push(this.initObjectPropery({
            Id: guid_1.Guid.newGuid(),
            Name: '',
            Type: config_interface_1.PropertyType.Number,
            IsRequired: false,
            MinValue: undefined,
            MaxValue: undefined,
            Regex: undefined,
            ListItems: {}
        }));
        control.markAsTouched(true);
        this.configForm.markAsDirty();
    };
    ConfigEditComponent.prototype.removeObjectProperty = function (index) {
        var control = this.configForm.controls['Properties'];
        control.removeAt(index);
        control.markAsTouched(true);
        this.configForm.markAsDirty();
    };
    ConfigEditComponent.prototype.changeType = function (propertyIndex, propertyType) {
        var controlArray = this.configForm.controls['Properties'];
        var control = controlArray.at(propertyIndex);
        control.controls['MinValue'].setValue(undefined);
        control.controls['MinValueErrorMessage'].setValue(undefined);
        control.controls['MaxValue'].setValue(undefined);
        control.controls['MaxValueErrorMessage'].setValue(undefined);
        control.controls['ListItems'].setValue([]);
        if (propertyType == config_interface_1.PropertyType.List) {
            var listItemsControl = control.controls['ListItems'];
            listItemsControl.push(this.initListProperty(guid_1.Guid.newGuid(), ''));
        }
    };
    ConfigEditComponent.prototype.addListItem = function (propertyIndex) {
        var controlArray = this.configForm.controls['Properties'];
        var control = controlArray.at(propertyIndex);
        var listItemsControl = control.controls['ListItems'];
        listItemsControl.push(this.initListProperty(guid_1.Guid.newGuid(), ''));
    };
    ConfigEditComponent.prototype.removeListProperty = function (propertyIndex, listItemIndex) {
        var controlArray = this.configForm.controls['Properties'];
        var control = controlArray.at(propertyIndex);
        var listItemsControl = control.controls['ListItems'];
        listItemsControl.removeAt(listItemIndex);
        listItemsControl.markAsTouched(true);
        this.configForm.markAsDirty();
    };
    ConfigEditComponent.prototype.setFormGroup = function () {
        return this.formBuilder.group({
            'Id': [this.objectConfig.Id],
            'Title': [this.objectConfig.Title, forms_1.Validators.required],
            'Properties': this.formBuilder.array(this.initProperties(), forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1)]))
        });
    };
    ConfigEditComponent.prototype.initProperties = function () {
        var _this = this;
        var properties = [];
        this.objectConfig.Properties.forEach(function (prop) {
            properties.push(_this.initObjectPropery(prop));
        });
        return properties;
    };
    ConfigEditComponent.prototype.initObjectPropery = function (objectProperty) {
        return this.formBuilder.group({
            'Id': [objectProperty.Id],
            'Name': [objectProperty.Name, forms_1.Validators.required],
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
            'ListItems': this.formBuilder.array(this.initListItems(objectProperty.ListItems))
        });
    };
    ConfigEditComponent.prototype.initListItems = function (listItems) {
        var _this = this;
        var properties = [];
        if (listItems) {
            this.keys(listItems).forEach(function (key) {
                properties.push(_this.initListProperty(key, listItems[key]));
            });
        }
        return properties;
    };
    ConfigEditComponent.prototype.initListProperty = function (id, value) {
        return this.formBuilder.group({
            'Id': [id],
            'Value': [value, forms_1.Validators.required]
        });
    };
    return ConfigEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ConfigEditComponent.prototype, "objectConfigId", void 0);
ConfigEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'config-edit',
        styleUrls: ['config-edit.component.css'],
        templateUrl: 'config-edit.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        config_service_1.ConfigService,
        material_1.MdDialogRef])
], ConfigEditComponent);
exports.ConfigEditComponent = ConfigEditComponent;
//# sourceMappingURL=config-edit.component.js.map