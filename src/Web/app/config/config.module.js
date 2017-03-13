"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var common_module_1 = require("../common/common.module");
//Components
var config_component_1 = require("./config.component");
var config_edit_component_1 = require("./config-edit/config-edit.component");
var object_edit_component_1 = require("./object-edit/object-edit.component");
var object_value_edit_component_1 = require("./object-value-edit/object-value-edit.component");
var property_value_component_1 = require("./property-value/property-value.component");
//Services
var config_service_1 = require("./config.service");
var ConfigModule = (function () {
    function ConfigModule() {
    }
    return ConfigModule;
}());
ConfigModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, material_1.MaterialModule, common_module_1.CommonModule],
        declarations: [config_component_1.ConfigComponent, config_edit_component_1.ConfigEditComponent, object_edit_component_1.ObjectEditComponent, object_value_edit_component_1.ObjectValueEditComponent, property_value_component_1.PropertyValueComponent],
        exports: [config_component_1.ConfigComponent, config_edit_component_1.ConfigEditComponent, object_edit_component_1.ObjectEditComponent, object_value_edit_component_1.ObjectValueEditComponent, property_value_component_1.PropertyValueComponent],
        entryComponents: [config_edit_component_1.ConfigEditComponent, object_edit_component_1.ObjectEditComponent],
        providers: [config_service_1.ConfigService]
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map