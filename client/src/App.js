import React, { Suspense, lazy } from 'react';
import { useSelector } from "react-redux";
import themeConfigs from './configs/theme.configs';
import  CssBaseline  from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <>
      <ThemeProvider
        theme={themeConfigs.custom({ mode: themeMode })}
      >
        {/*--------------------Config Toast React-------------------- */}
        <ToastContainer
          position='bottom-left'
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme={themeMode}
        />
        {/* --------------------MUI CSS baseline--------------------- */}
        <CssBaseline />

        {/* --------------------AppRouter---------------------------- */}
        <BrowserRouter>
          <Routes>
            <Route
              path='/' element={<MainLayout />}
            >
              
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
