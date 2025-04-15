import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/dashboard/Login/index.tsx";
import { ThemeProvider } from "react-bootstrap";
import "./sass/styles.scss";
import ControlPanel from "./pages/dashboard/ControlPanel/index.tsx";
import PersonalInfo from "./pages/dashboard/PersonalInfo/index.tsx";
import RegistrationForm from "./pages/registration-form/RegistrationForm/index.tsx";
import "./i18n/i18n.ts";
import ErrorPage from "./misc/ErrorPage.tsx";
import { persistor, store } from "./app/store.ts";
import { Provider } from "react-redux";
import { RequireAuthWrapper } from "./features/RequireAuthWrapper.tsx";
import { PersistGate } from "redux-persist/integration/react";
import HomePage from "./pages/dashboard/Home/index.tsx";
import Schooling from "./pages/dashboard/Schooling/index.tsx";
import AilmentsAndDiagnoses from "./pages/dashboard/AilmentsAndDiagnoses/index.tsx";
import ComplementaryInfo from "./pages/dashboard/ComplementaryInfo/index.tsx";
import ParentsTutors from "./pages/dashboard/ParentsTutors/index.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      <Route element={<RequireAuthWrapper />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/control-panel" element={<ControlPanel />} />
        <Route path="/informacion-personal" element={<PersonalInfo />} />
        <Route path="/escolaridad" element={<Schooling />} />
        <Route
          path="/diagnostico-y-padecimientos"
          element={<AilmentsAndDiagnoses />}
        />
        <Route
          path="/informacion-complementaria"
          element={<ComplementaryInfo />}
        />
        <Route path="/padres-madres-o-tutores" element={<ParentsTutors />} />
      </Route>
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
