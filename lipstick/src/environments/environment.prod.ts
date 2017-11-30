// VALUELIST_REFRESH value is expressed in seconds
// In production, refresh every 30 minutes
import { DATE_DISPLAY_FORMAT } from './formats';

export const environment = {
    production: true,
    API_ENDPOINT: location.origin + ":8000/",
    VALUELIST_REFRESH: 60*30,
    DATE_FORMAT: DATE_DISPLAY_FORMAT,
};
