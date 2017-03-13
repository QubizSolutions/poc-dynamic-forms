import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpUtilityService } from '../common/helpers/http-utility.service';
import { ObjectConfig, ObjectValue } from './config.interface';

@Injectable()
export class ConfigService {
    private url = 'api/Config';  // URL to web API
    constructor(private http: Http, private httpUtilityService: HttpUtilityService) { }
    
    getObjectConfigs(): Observable<ObjectConfig[]> {
        return this.http.get(`${this.url}/GetObjectConfigs`)
            .map(this.httpUtilityService.extractData)
            .catch(this.httpUtilityService.handleError);
    }
    
    getObjectConfigById(id: string): Observable<ObjectConfig> {
        let params = new URLSearchParams();
        params.set('id', id);
        return this.http.get(`${this.url}/GetObjectConfigById`, { search: params })
            .map(this.httpUtilityService.extractData)
            .catch(this.httpUtilityService.extractData);
    }

    updateObjectConfig(objectConfig: ObjectConfig): Observable<any> {
        return this.http.post(`${this.url}/UpdateObjectConfig`, objectConfig)
            .catch(this.httpUtilityService.extractData);
    }

    createObjectConfig(objectConfig: ObjectConfig): Observable<any> {
        return this.http.put(`${this.url}/CreateObjectConfig`, objectConfig)
            .catch(this.httpUtilityService.extractData);
    }

    getObjectValues(): Observable<ObjectValue[]> {
        return this.http.get(`${this.url}/GetObjectValues`)
            .map(this.httpUtilityService.extractData)
            .catch(this.httpUtilityService.handleError);
    }

    getObjectValueById(id: string): Observable<ObjectValue> {
        let params = new URLSearchParams();
        params.set('id', id);
        return this.http.get(`${this.url}/GetObjectValueById`, { search: params })
            .map(this.httpUtilityService.extractData)
            .catch(this.httpUtilityService.extractData);
    }

    updateObjectValue(objectValue: ObjectValue): Observable<any> {
        return this.http.post(`${this.url}/UpdateObjectValue`, objectValue)
            .catch(this.httpUtilityService.extractData);
    }

    createObjectValue(objectValue: ObjectValue): Observable<any> {
        return this.http.put(`${this.url}/CreateObjectValue`, objectValue)
            .catch(this.httpUtilityService.extractData);
    }
}
