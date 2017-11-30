// API server SimpleList model for custominput, log, packet, platform, etc.
export interface SimpleListInterface {
    created: Date;
    description: string;
    enabled: boolean;
    id: number;
    last_updated: Date;
    name: string;
    value: string;
}
