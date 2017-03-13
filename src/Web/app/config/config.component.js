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
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var config_service_1 = require("./config.service");
var config_edit_component_1 = require("./config-edit/config-edit.component");
var object_edit_component_1 = require("./object-edit/object-edit.component");
var ConfigComponent = (function () {
    function ConfigComponent(configService, router, dialog) {
        this.configService = configService;
        this.router = router;
        this.dialog = dialog;
        this.objectConfigs = [];
        this.objectValues = [];
    }
    ConfigComponent.prototype.ngOnInit = function () {
        this.getObjectConfigs();
    };
    ConfigComponent.prototype.getObjectConfigs = function () {
        var _this = this;
        var obs = this.configService.getObjectConfigs().subscribe(function (objectConfigs) {
            _this.objectConfigs = objectConfigs;
            _this.getObjectValues();
            obs.unsubscribe();
        });
    };
    ConfigComponent.prototype.getObjectValues = function () {
        var _this = this;
        var obs = this.configService.getObjectValues().subscribe(function (objectValues) {
            _this.objectValues = objectValues;
            obs.unsubscribe();
        });
    };
    ConfigComponent.prototype.addObjectConfig = function () {
        var _this = this;
        var config = {
            width: '500px',
            disableClose: true
        };
        var dialogRef = this.dialog.open(config_edit_component_1.ConfigEditComponent, config);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result)
                _this.getObjectConfigs();
        });
    };
    ConfigComponent.prototype.editObjectConfig = function (objectConfigId) {
        var _this = this;
        var config = {
            width: '500px',
            disableClose: true
        };
        var dialogRef = this.dialog.open(config_edit_component_1.ConfigEditComponent, config);
        dialogRef.componentInstance.objectConfigId = objectConfigId;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result)
                _this.getObjectConfigs();
        });
    };
    ConfigComponent.prototype.addObject = function () {
        var _this = this;
        var config = {
            width: '500px',
            disableClose: true
        };
        var dialogRef = this.dialog.open(object_edit_component_1.ObjectEditComponent, config);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result)
                _this.getObjectValues();
        });
    };
    ConfigComponent.prototype.editObjectValue = function (objectValueId) {
        var _this = this;
        var config = {
            width: '500px',
            disableClose: true
        };
        var dialogRef = this.dialog.open(object_edit_component_1.ObjectEditComponent, config);
        dialogRef.componentInstance.objectValueId = objectValueId;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result)
                _this.getObjectValues();
        });
    };
    ConfigComponent.prototype.objectConfigById = function (id) {
        return this.objectConfigs.find(function (x) { return x.Id == id; });
    };
    return ConfigComponent;
}());
ConfigComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'config',
        styleUrls: ['config.component.css'],
        templateUrl: 'config.component.html',
        providers: [material_1.MdDialog]
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        router_1.Router,
        material_1.MdDialog])
], ConfigComponent);
exports.ConfigComponent = ConfigComponent;
//# sourceMappingURL=config.component.js.map