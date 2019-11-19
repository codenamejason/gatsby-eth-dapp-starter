// Frameworks
import React from 'react';
import { navigate } from 'gatsby';
import { map } from 'lodash';

// Wallet Interface
import Wallet from './wallets';

// Login Route
function Login() {
    const wallet = Wallet.instance();

    const _walletConnect = (walletType) => async () => {
        try {
            await wallet.init(walletType);
            await wallet.connect();
            navigate(`/app/`);
        }
        catch (err) {
            console.error(err);
        }
    };

    const walletButtons = map(Wallet.typeMap(), (wallet, walletType) => {
        const disabled = !wallet.isEnabled();
        return (
            <p key={walletType}>
                <button onClick={_walletConnect(walletType)} disabled={disabled}>{walletType}</button>
            </p>
        );
    });

    return (
        <>
            <h1>Log in</h1>
            {walletButtons}
        </>
    )
}

export default Login;
