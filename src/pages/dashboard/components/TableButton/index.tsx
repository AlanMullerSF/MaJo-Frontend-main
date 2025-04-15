import { BsDownload, BsTable } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import "./styles.scss";
import { Button } from "react-bootstrap";

type CustomButtonProps = {
  variant: "filled" | "outlined" | "flat";
  label: string;
  icon: "table" | "graphs" | "download";
  onClick?: () => void;
  color: string;
  height?: string;
  width?: string;
};

/**
 * A custom button component that displays an icon and a label.
 * @param {CustomButtonProps} props - The props for the button component.
 * @returns The rendered button component.
 */
const TableButton = ({
  variant,
  icon,
  color,
  onClick,
  height = "40px",
  width,
  label,
}: CustomButtonProps) => {
  const baseStyle = { height, width };
  const style =
    variant === "filled"
      ? { ...baseStyle }
      : {
          color,
          ...baseStyle,
        };

  return (
    <Button className={variant} style={style} onClick={() => onClick?.()}>
      <p className="btn-label" style={{ margin: 0 }}>
        {icon === "download" ? (
          <BsDownload className="icon" />
        ) : icon === "graphs" ? (
          <VscGraph className="icon" />
        ) : (
          <BsTable className="icon" />
        )}
        {label}
      </p>
    </Button>
  );
};

export default TableButton;
