import { FaRegTrashCan, FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { LuUserPlus } from "react-icons/lu";

import Spinner from "react-bootstrap/Spinner";
import "./styles.scss";

type Icon = "user" | "trash-can" | "email" | "right-arrow";

type RoundButtonProps = {
  label: string;
  onClick?: () => void;
  rightIcon?: Icon;
  leftIcon?: Icon;
  variant: "outlined" | "flat" | "filled";
  type?: "submit" | "button" | "reset";
  loading?: boolean;
  expand?: boolean;
  disabled?: boolean;
};

type CustomIconProps = {
  name: Icon;
};

/**
 * A round button component with customizable properties.
 * @param {RoundButtonProps} props - The properties for the round button.
 * @returns The rendered round button component.
 */
const RoundButton = ({
  label,
  onClick,
  rightIcon,
  leftIcon,
  variant,
  type = "button",
  loading,
  expand,
  disabled,
}: RoundButtonProps) => {
  return (
    <button
      type={type}
      className={
        `custom-btn ${variant} ${expand ? "expand-container" : ""}` +
        `${disabled ? "disabled" : null}`
      }
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon?.length ? (
        <span style={{ display: "flex", alignSelf: "center" }}>
          <CustomIcon name={leftIcon} />
        </span>
      ) : null}
      {loading ? <Spinner animation="border" role="status" /> : label}
      {rightIcon?.length ? (
        <span style={{ display: "flex", alignSelf: "center" }}>
          <CustomIcon name={rightIcon} />
        </span>
      ) : null}
    </button>
  );
};

const CustomIcon = ({ name }: CustomIconProps) => {
  if (name === "trash-can") {
    return <FaRegTrashCan className="icon" />;
  }
  if (name === "email") {
    return <AiOutlineMail className="icon" />;
  }
  if (name === "right-arrow") {
    return <FaArrowRightLong className="icon" />;
  }
  return <LuUserPlus className="icon" />;
};

export default RoundButton;
