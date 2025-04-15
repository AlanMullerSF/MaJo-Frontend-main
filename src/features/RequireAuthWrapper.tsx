import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { selectCurrentToken } from "./auth/authSlice";
import Header from "../pages/dashboard/components/Header";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

/**
 * A wrapper component that requires authentication before rendering its children.
 * If the user is authenticated, it renders the children wrapped in a Header component.
 * If the user is not authenticated, it redirects to the login page.
 * @returns JSX.Element - The rendered component.
 */
export const RequireAuthWrapper = () => {
  const token = useAppSelector(selectCurrentToken);
  //   const role = useAppSelector(selectCurrentUserRole);
  const location = useLocation();
  const { t } = useTranslation();

  const getDropdownTitle = useCallback(() => {
    switch (location.pathname) {
      case "/informacion-personal":
        return t("personal info");
      case "/padres-madres-o-tutores":
        return t("parents tutors");
      case "/informacion-complementaria":
        return t("complementary info");
      case "/escolaridad":
        return t("schooling");
      case "/diagnostico-y-padecimientos":
        return t("ailments and diagnoses");
      case "/control-panel":
        return t("control panel");
      case "/":
      default:
        return t("home");
    }
  }, [location.pathname, t]);

  const dropdownTitle = getDropdownTitle();

  return token ? (
    <Header dropdownTitle={dropdownTitle}>
      <Outlet />
    </Header>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
