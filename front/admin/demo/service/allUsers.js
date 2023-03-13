import getConfig from 'next/config';

export class allUsers {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getUsers() {
        return fetch(this.contextPath + '/dummyData/data/users.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

}
