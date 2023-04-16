import React, { Suspense, lazy  } from 'react';
import { useSelector } from "react-redux";
import themeConfigs from './configs/theme.configs';
import  CssBaseline  from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "#25c2a0",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 350,
  left: 0,
  right: 0,
  bottom: 0,
};

const MainLayout = lazy(() => delayLayout(import("./components/layout/MainLayout")));

function delayLayout(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

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
              path='/'
              element={
                <>
                  <Suspense
                    fallback=
                    {
                      <ClipLoader
                        size={45}
                        cssOverride={override}
                      />
                    }
                  >
                    <MainLayout />
                  </Suspense>
                </>
              }
            >

            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
