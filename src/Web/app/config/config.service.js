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
var http_1 = require("@angular/http");
var http_utility_service_1 = require("../common/helpers/http-utility.service");
var ConfigService = (function () {
    function ConfigService(http, httpUtilityService) {
        this.http = http;
        this.httpUtilityService = httpUtilityService;
        this.url = 'api/Config'; // URL to web API
    }
    ConfigService.prototype.getObjectConfigs = function () {
        return this.http.get(this.url + "/GetObjectConfigs")
            .map(this.httpUtilityService.extractData)
            .catch(this.httpUtilityService.handleError);
    };
    ConfigService.prototype.getObjectConfigById = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('id', id);
        return this.http.get(this.url + "/GetObjectConfigById", { search: params })
            .map(this.httpUtilityService.extractData)
            .catch(this.httpUtilityService.extractData);
    };
    ConfigService.prototype.updateObjectConfig = function (objectConfig) {
        return this.http.post(this.url + "/UpdateObjectConfig", objectConfig)
            .catch(this.httpUtilityService.extractData);
    };
    ConfigService.prototype.createObjectConfig = function (objectConfig) {
        return this.http.put(this.url + "/CreateObjectConfig", objectConfig)
            .catch(this.httpUtilityService.extractData);
    };
    ConfigService.prototype.getObjectValues = function () {
        return this.http.get(this.url + "/GetObjectValues")
            .map(this.httpUtilityService.extractData)
            .catch(this.httpUtilityService.handleError);
    };
    ConfigService.prototype.getObjectValueById = function (id) {
        var params = new http_1.URLSearchParams();
        params.set('id', id);
        return this.http.get(this.url + "/GetObjectValueById", { search: params })
            .map(this.httpUtilityService.extractData)
            .catch(this.httpUtilityService.extractData);
    };
    ConfigService.prototype.updateObjectValue = function (objectValue) {
        return this.http.post(this.url + "/UpdateObjectValue", objectValue)
            .catch(this.httpUtilityService.extractData);
    };
    ConfigService.prototype.createObjectValue = function (objectValue) {
        return this.http.put(this.url + "/CreateObjectValue", objectValue)
            .catch(this.httpUtilityService.extractData);
    };
    return ConfigService;
}());
ConfigService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_utility_service_1.HttpUtilityService])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map