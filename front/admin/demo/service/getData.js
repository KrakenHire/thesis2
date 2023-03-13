import { useEffect, useState } from "react";

export default function home () {
    const [providers, setProviders] = useState([]);
    useEffect (() => {
        async function getPageDataForProviders() {
            const apiUrlEndpoint = 'http://localhost:3000/admin/providers';
            const response = await fetch(apiUrlEndpoint);
            const res = await response.json();
            setProviders(res);
        }
        getPageDataForProviders();
    }, []);
    return (
        <div>{providers.map((e) => e.username)}</div>
    ) 
}