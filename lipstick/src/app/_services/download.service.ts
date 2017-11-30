import { Injectable } from '@angular/core';

@Injectable()
export class DownloadService {

    constructor(
    ) { }

    decodeHTMLChars (string) {
        // replace special characters with escaped values for import
        var optTemp = 0;
        var i = 0;
        var noquotes = false
        var quoteStyle: number = 2;
        string = string.toString()
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
        string = string.replace(/&#0*39;/g, "'");
        string = string.replace(/&apos;|&#x0*27;/g, "'");
        string = string.replace(/&quot;/g, '"');

        // Put this in last place to avoid escape being double-decoded
        string = string.replace(/&amp;/g, '&');
        return string;
    }

    exportContent(exportData) {
        // Export the formatted content with the given filename.
        var exportText = this.formatContent(exportData);
        this.saveTextAsFile(exportText, exportData.filename);
    }

    filename(client: string, appliance: any) {
        // Format a filename from submited file fileData with attributes   
        //  - client (string)
        //  - appliance (object)

        var exportFilename = client + '-'; 
        exportFilename += appliance.name + '-';
        exportFilename += this.filenameWithDate();

        let platform = appliance.workflows===undefined ? appliance.platform.name : appliance.workflows[0].deployments[0].rule.platform;
        let netwitness = platform.match(/netwitness/i) ? true : false;
        exportFilename += netwitness ? '.nwr': '.txt';

        return exportFilename;
    }

    filenameWithDate() {
        // Return yyyy-mm-dd string.
        const d = new Date();        
        var filename = d.getFullYear() + '-';
        filename += (d.getMonth()+1) + '-';
        filename += d.getDate();
        return filename;
    }

    formatContent(exportData) {
        // Format the array of exportContent based on the platform.
        // if platform contains 'netwitness' perform special formatting.
        var exportText: string = '';
        // is netwitness in the platform?
        var netwitness = exportData.platform.match(/netwitness/i) ? true: false;
        switch(netwitness) { 
            case true: {
                // file formatting based on previous system export
                // https://bitbucket.dev.fgsec.local/projects/CXE/repos/content-exchange-php/browse/c_searchproc_exp.php
                for(let deployment of exportData.rule) {
                    let rule = 'name="' + deployment.title + '_' + '" ';
                    rule += 'rule="' + this.decodeHTMLChars(deployment.content) + '" ';
                    rule += 'alert="' + exportData.nwKey + '" ';
                    rule += 'order="' + exportData.nwIndex + '" ';
                    rule += 'type="application"';
                    let temp = this.decodeHTMLChars(this.stripTags(rule,''));
                    exportText += temp + '\r\n';
                    exportData.index++;
                };
                break; 
            } 
            default: { 
                exportData.rule.forEach(function(deployment) {
                    exportText += deployment.content + '\n\n';
                });
                break; 
            } 
        } 
        return exportText;
    }

    saveTextAsFile(text, filename) {
        //Download the given text to the client and save in the given file.
        var textToSaveAsBlob = new Blob([text], {type:"text/plain"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var downloadLink = document.createElement("a");
        downloadLink.download = filename;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    stripTags(content, keep) {
        // strips tags out of submitted content and keeps 'good' tags
        keep = (((keep || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
        let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
        let comments = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
        return content.replace(comments, '').replace(tags, function ($0, $1) {
            return keep.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
        })
    }

}