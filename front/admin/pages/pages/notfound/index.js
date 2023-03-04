import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React from 'react';
import AppConfig from '../../../layout/AppConfig';

const NotFoundPage = () => {
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();

    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <div style={{ borderRadius: '30px', padding: '2rem', background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0))' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                    <img src={`${contextPath}/layout/images/Kraken-logo-dark.png`} alt="kraken logo" className="mb-5 w-6rem flex-shrink-0"/>
                        <span className="text-blue-500 font-bold text-3xl">404</span>
                        <h1 className="text-900 font-bold text-5xl mb-2">Not Found</h1>
                        <div className="text-600 mb-5">Requested resource is not available</div>

                    </div>
                </div>
            </div>
        </div> 
    );
};

NotFoundPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig />
        </React.Fragment>
    );
};

export default NotFoundPage;
