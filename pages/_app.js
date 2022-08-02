import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store, wrapper } from '../ReduxStore';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                {Component.auth ? (
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                    <Component {...pageProps} />
                )}
            </Provider>
        </SessionProvider>
    );
}

function Auth({ children }) {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/unauthorized?message=login required');
        },
    });
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return children;
}

export default wrapper.withRedux(MyApp);
