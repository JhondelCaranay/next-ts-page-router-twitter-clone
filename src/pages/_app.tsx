import useKeyEvent from "@/components/hooks/useKeyEvent";
import Layout from "@/components/layout/Layout";
import LoginModal from "@/components/modals/LoginModal";
import Modal from "@/components/modals/Modal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import EditModal from "@/components/modals/EditModal";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [isOpen, setIsOpen] = useState(false);
  useKeyEvent({ setIsOpen });

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>CloneApp</title>
      </Head>
      <Toaster />
      <LoginModal />
      <RegisterModal />
      <EditModal />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => {}}
        actionLabel="Submit"
        title="Modal Title"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
