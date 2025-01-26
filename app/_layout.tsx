import './globals.css'
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import Layout from "../src/components/Layout";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Layout>
        <Slot />
      </Layout>
    </Provider>
  );
}