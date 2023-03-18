import getConfig from 'next/config';

export class serviceDS {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getServicesDash() {
        return fetch(this.contextPath + '/dummyData/data/services-dash.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getServices() {
        return fetch(this.contextPath + '/dummyData/data/services.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
