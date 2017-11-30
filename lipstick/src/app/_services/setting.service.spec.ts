import { Http } from '@angular/http';

import { SettingService } from 'app/_services/setting.service';


describe('Setting Service: ', () => {    
    //Test Setting Service methods/functions
    const test_days = '90';
    let settings = new SettingService();
    let testSettings = [
        { "name": "RULE_ARCHIVE_DAYS", "value": test_days },
        { "name": "RULE_EXPIRATION_DAYS", "value": "180"}
    ];
    localStorage.setItem('settings', JSON.stringify(testSettings));

    it('#get returns correct day count', () => {
        // Verifies that the retrieval of a setting variable is working
        expect(settings.get('RULE_ARCHIVE_DAYS')).toEqual(test_days);
    });

    it('#get returns correct error message', () => {
        // Verifies that settings.get returns proper error message
        expect(settings.get('PEB7268')).toEqual(undefined);
    });

});