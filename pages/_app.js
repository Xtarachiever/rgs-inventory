import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }) {
  return(
    <SessionProvider session={pageProps}>
      <Provider store={store}>
        <Component {...pageProps.session} />
      </Provider>
    </SessionProvider>
  )
}
