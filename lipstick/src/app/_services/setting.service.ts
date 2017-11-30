import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

    constructor() {
    }

    get(name: string) {
        // Return settings value from local storage for the given name
        let settings = this.readSettings();
        
        for(let setting of settings) {
            if(setting.name==name) {
                return setting.value;
            }
        }
        // name not found in settings
        return undefined;
    }

    private readSettings() {
        // Return the settings from localStorage
        return JSON.parse(localStorage.getItem('settings'));
    }
}