// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// export class endPointconfig {

//     public static getEnvironmentVariable() {
//         let origin = location.origin;
//         let path = location.href.split('/')[3];
//         let value = origin +'/'+ path;      
//         return value;
//     }
// }

// VALUELIST_REFRESH value is expressed in seconds
import { DATE_DISPLAY_FORMAT } from './formats';

export const environment = {
    production: false, 
    API_ENDPOINT: "http://localhost:8080/",
    VALUELIST_REFRESH: 30,
    DATE_FORMAT: DATE_DISPLAY_FORMAT,
}
