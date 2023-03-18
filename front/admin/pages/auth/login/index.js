import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', {'p-input-filled': layoutConfig.inputStyle === 'filled'});

    const handleSignIn = () => {
        // Check if email and password match the specific values
        if (email === 'karakenhire@gmail.com' && password === 'azerty123') {
            // Navigate to home page
            router.push('/');
        } else {
            // Show error message
            setShowDialog(true);
        }
    };

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div style={{ borderRadius: '56px', padding: '1.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 90%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                        <img src={`${contextPath}/layout/images/Kraken-logo-${layoutConfig.colorScheme !== 'light' ? 'light' : 'indigo'}.png`} alt="logo" className="mb-5 w-6rem flex-shrink-0"/>
                            <div className="text-900 text-3xl font-medium mb-3">Welcome back!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText inputid="email1" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask feedback={false} className="w-full mb-5" inputClassName='w-full p-3 md:w-30rem'></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="me-2"></Checkbox>
<label htmlFor="rememberme1" className="block text-900 font-medium text-lg">
Remember me
</label>
</div>
<a href="#" className="text-600 font-medium text-lg">Forgot password?</a>
</div>
<Button onClick={handleSignIn} label="Sign In" className="w-full btn-primary mb-5" />
</div>
</div>
</div>
</div>
<Dialog header="Invalid credentials" visible={showDialog} onHide={() => setShowDialog(false)}>
<div className="text-600">Please check your email and password and try again.</div>
</Dialog>
</div>
);
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};

export default LoginPage;