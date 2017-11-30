import { Http } from '@angular/http';

import { DownloadService } from 'app/_services/download.service';


describe('Download Service: ', () => {    
    //Test Download Service methods/functions
    let downloadService = new DownloadService();

    it('#formatContent returns correct string', () => {
        // Verify formatContent() response string has correct format.
        const test_text = 'content rule two';
        const test_key = 'test.key';
        const test_index = 1000;

        let exportData = {
            filename: '',
            nwKey: '',
            nwIndex: 0,
            platform: '',
            rule: [{'content': test_text}],
        };

        const text = downloadService.formatContent(exportData);
        expect(text).toContain(test_text);
        
        // test file inserts key and index variables for any netwitness
        let exportNetwitness = {
            filename: '',
            nwKey: 'test.key',
            nwIndex: 1000,
            platform: 'netwitness',
            rule: [{'content': test_text}],
        };

        const netText = downloadService.formatContent(exportNetwitness);
        expect(netText).toContain(test_key);
        expect(netText).toContain(test_index);
    });

    it('#filenameWithDate returns correct string', () => {
        // Verify filenameWithDate() response string has Year, Month, Day.
        const today = new Date();
        const filename = downloadService.filenameWithDate();
        expect(filename).toContain(today.getFullYear());
        expect(filename).toContain(today.getMonth()+1);
        expect(filename).toContain(today.getDate());
    });

});