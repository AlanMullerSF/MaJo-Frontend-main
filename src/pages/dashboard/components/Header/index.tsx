import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BiUser } from "react-icons/bi";
import "./styles.scss";
import { SyntheticEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logOut,
  selectCurrentUserRole,
} from "../../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { useTranslation } from "react-i18next";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Searchbar from "../Searchbar";
import groupPng from "../../../../assets/Group.png";

type HeaderProps = {
  dropdownTitle: string;
  children?: React.ReactNode;
};

/**
 * A functional component that represents a header section.
 * @param {HeaderProps} dropdownTitle - The title of the dropdown menu.
 * @param {ReactNode} children - The child components to render within the header.
 * @returns The rendered header component.
 */
const Header = ({ dropdownTitle, children }: HeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const target = useRef(null);
  const [showLogout, setShowLogout] = useState(false);

  const role = useAppSelector(selectCurrentUserRole);

  const handleChooseDropdownOption = useCallback(
    (e: SyntheticEvent) => {
      // @ts-expect-error text comes inside the event
      switch (e.target.text) {
        case t("personal info"):
          navigate("/informacion-personal");
          break;
        case t("schooling"):
          navigate("/escolaridad");
          break;
        case t("ailments and diagnoses"):
          navigate("/diagnostico-y-padecimientos");
          break;
        case t("parents tutors"):
          navigate("/padres-madres-o-tutores");
          break;
        case t("control panel"):
          navigate("/control-panel");
          break;
        case t("complementary info"):
          navigate("/informacion-complementaria");
          break;
        default:
          navigate("/");
      }
    },
    [navigate, t],
  );

  // TODO add function to hide logout on click outside
  // useEffect(() => {
  //   const hideTooltip = () => {
  //     if (showLogout) {
  //       setShowLogout((prevState) => !prevState);
  //     }
  //   };

  //   document.addEventListener("click", hideTooltip);

  //   return () => document.removeEventListener("click", () => null);
  // }, [showLogout]);

  return (
    <>
      <header>
        <div className="navigation-search-container">
          <div className="logo-container">
            <img
              onClick={() => navigate("/")}
              className="logo"
              src={groupPng}
              alt="logo-mjspw"
            />
          </div>
          <div className="search-bar">
            <Searchbar />
          </div>
        </div>
        <div className="cta">
          <a
            onClick={() => navigate("/")}
            className="go-to-control-panel active"
          >
            {t("home")}
          </a>
          <DropdownButton
            className="go-to-options"
            title={dropdownTitle}
            drop="down-centered"
          >
            <Dropdown.Item onClick={handleChooseDropdownOption}>
              {t("personal info")}
            </Dropdown.Item>
            <Dropdown.Divider color="#FFF2FC" />
            <Dropdown.Item onClick={handleChooseDropdownOption}>
              {t("schooling")}
            </Dropdown.Item>
            <Dropdown.Divider color="#FFF2FC" />
            <Dropdown.Item onClick={handleChooseDropdownOption}>
              {t("ailments and diagnoses")}
            </Dropdown.Item>
            <Dropdown.Divider color="#FFF2FC" />
            <Dropdown.Item onClick={handleChooseDropdownOption}>
              {t("complementary info")}
            </Dropdown.Item>
            <Dropdown.Divider color="#FFF2FC" />
            <Dropdown.Item onClick={handleChooseDropdownOption}>
              {t("parents tutors")}
            </Dropdown.Item>
            {role === "ADMIN" ? (
              <>
                <Dropdown.Divider color="#FFF2FC" />
                <Dropdown.Item onClick={handleChooseDropdownOption}>
                  {t("control panel")}
                </Dropdown.Item>
              </>
            ) : (
              <></>
            )}
          </DropdownButton>

          <div ref={target} className="user-icon-container">
            <BiUser
              onClick={() => setShowLogout((prevState) => !prevState)}
              className="user-icon"
            />
          </div>
          <Overlay target={target.current} show={showLogout} placement="bottom">
            {(props) => (
              <Tooltip
                // id="overlay-example"
                {...props}
                onClick={() => dispatch(logOut())}
              >
                {t("logout")}
              </Tooltip>
            )}
          </Overlay>
        </div>
      </header>
      {children}
    </>
  );
};

export default Header;
