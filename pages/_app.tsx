import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";

import { useRouter } from "next/router";
import LayoutClient from "@/components/Layout";
import LayoutAdmin from "@/components/sp_admin/Layout";

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isAdminPath = router.pathname.startsWith('/sp_admin');

    return (
        <Provider store={store}>
            {isAdminPath ? (
                <LayoutAdmin>
                    <Component {...pageProps} />
                </LayoutAdmin>
            ) : (
                <LayoutClient>
                    <Component {...pageProps} />
                </LayoutClient>
            )}
        </Provider>
    );
}

export default App;
