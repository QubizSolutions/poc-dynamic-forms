"use strict";
var router_1 = require("@angular/router");
var config_component_1 = require("./config/config.component");
var display_component_1 = require("./display/display.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/config',
        pathMatch: 'full',
    },
    {
        path: 'config',
        component: config_component_1.ConfigComponent
    },
    {
        path: 'display',
        component: display_component_1.DisplayComponent
    }
];
exports.Routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map