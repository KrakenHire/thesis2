import React from 'react';
import AppConfig from '../../layout/AppConfig';

const LandingPage = () => {
    return (
        <div>
            <h1>PlaceHolder</h1>
        </div>
    );
};

LandingPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};

export default LandingPage;
