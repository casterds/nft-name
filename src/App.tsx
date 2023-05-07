import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import { useCollections } from "./app/reducers/collections/hooks"
import { useNames } from './app/reducers/names/hooks';
import Layout from './container/Layout';
import NftDetail from './pages/nft-detail';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      index: true,
      element: <Home />
    }, {
      path: "nft-detail/:address/:tokenId",
      element: <NftDetail />
    }]
  }
]);

function App() {
  const { dispatchFetchCollections } = useCollections();
  const { dispatchFetchNames } = useNames()
  useEffect(() => {
    dispatchFetchCollections()
    dispatchFetchNames();
  }, [dispatchFetchCollections, dispatchFetchNames]);
  return <RouterProvider router={router} />
}

export default App;
