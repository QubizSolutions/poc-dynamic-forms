import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config/config.component';
import { DisplayComponent } from './display/display.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/config',
        pathMatch: 'full',
    },
    {
        path: 'config',
        component: ConfigComponent
    },
    {
        path: 'display',
        component: DisplayComponent
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });