// Set VALUELIST_REFRESH to 0 to turn off the API calls for data lists.
import { DATE_DISPLAY_FORMAT } from './formats';

export const environment = {
	production: false, 
	API_ENDPOINT: "http://backend:8000/",
    VALUELIST_REFRESH: 0,
    DATE_FORMAT: DATE_DISPLAY_FORMAT,
};
