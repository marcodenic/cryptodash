import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";

const Layout = ({ children, title = "Crypto Dash" }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="node_modules\flowbite\dist\flowbite.min.js" />
      </Head>
      <header className="header dark">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 w-full py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap  max-w-screen-xl">
            <Link href="/" passHref className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {title}
              </span>
            </Link>
          </div>
          {/* <SearchBar type="text" className="dark" placeholder="Search" /> */}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
