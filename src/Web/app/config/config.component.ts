import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ConfigService } from './config.service';
import { ObjectConfig, ObjectPropery, PropertyType, ObjectValue } from './config.interface';
import { ConfigEditComponent } from './config-edit/config-edit.component';
import { ObjectEditComponent } from './object-edit/object-edit.component';

@Component({
    moduleId: module.id,
    selector: 'config',
    styleUrls: ['config.component.css'],
    templateUrl: 'config.component.html',
    providers: [MdDialog]
})
export class ConfigComponent {
    objectConfigs: ObjectConfig[] = [];
    objectValues: ObjectValue[] = [];

    constructor(
        private configService: ConfigService,
        private router: Router,
        private dialog: MdDialog) { }

    ngOnInit() {
        this.getObjectConfigs();
    }

    private getObjectConfigs() {
        let obs = this.configService.getObjectConfigs().subscribe(objectConfigs => {
            this.objectConfigs = objectConfigs as ObjectConfig[];
            this.getObjectValues();
            obs.unsubscribe();
        });
    }

    private getObjectValues() {
        let obs = this.configService.getObjectValues().subscribe(objectValues => {
            this.objectValues = objectValues as ObjectValue[];
            obs.unsubscribe();
        });
    }

    addObjectConfig() {
        let config: MdDialogConfig = {
            width: '500px',
            disableClose: true
        };

        let dialogRef = this.dialog.open(ConfigEditComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.getObjectConfigs();
        });
    }

    editObjectConfig(objectConfigId: string) {
        let config: MdDialogConfig = {
            width: '500px',
            disableClose: true
        };

        let dialogRef = this.dialog.open(ConfigEditComponent, config);
        dialogRef.componentInstance.objectConfigId = objectConfigId;
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.getObjectConfigs();
        });
    }

    addObject() {
        let config: MdDialogConfig = {
            width: '500px',
            disableClose: true
        };

        let dialogRef = this.dialog.open(ObjectEditComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.getObjectValues();
        });
    }

    editObjectValue(objectValueId: string) {
        let config: MdDialogConfig = {
            width: '500px',
            disableClose: true
        };

        let dialogRef = this.dialog.open(ObjectEditComponent, config);
        dialogRef.componentInstance.objectValueId = objectValueId;
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.getObjectValues();
        });
    }

    objectConfigById(id: string) {
        return this.objectConfigs.find(x => x.Id == id);
    }
}