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
var forms_1 = require("@angular/forms");
var config_interface_1 = require("../../config/config.interface");
var PropertyValueComponent = (function () {
    function PropertyValueComponent() {
        this.markFormDirty = new core_1.EventEmitter();
        this.propertyType = config_interface_1.PropertyType;
    }
    PropertyValueComponent.prototype.keys = function (dict) {
        return Object.keys(dict);
    };
    PropertyValueComponent.prototype.checkboxChange = function (checked, checkboxValue) {
        var value = this.valueControl.controls['Value'];
        if (!value.value || !value.value.find) {
            value.setValue([]);
        }
        if (checked) {
            value.value.push(checkboxValue);
        }
        else {
            value.setValue(value.value.filter(function (x) { return x !== checkboxValue; }));
        }
        this.markFormDirty.emit();
    };
    PropertyValueComponent.prototype.isValueChecked = function (key) {
        var value = this.valueControl.controls['Value'];
        if (value.value && value.value.find) {
            var item = value.value.find(function (x) { return x == key; });
            return item ? true : false;
        }
        return false;
    };
    return PropertyValueComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.AbstractControl)
], PropertyValueComponent.prototype, "valueControl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PropertyValueComponent.prototype, "propertyConfig", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PropertyValueComponent.prototype, "submitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PropertyValueComponent.prototype, "markFormDirty", void 0);
PropertyValueComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'property-value',
        templateUrl: 'property-value.component.html',
        styleUrls: ['property-value.component.css'],
    })
], PropertyValueComponent);
exports.PropertyValueComponent = PropertyValueComponent;
//# sourceMappingURL=property-value.component.js.map