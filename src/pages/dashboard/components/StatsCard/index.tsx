import { useTranslation } from "react-i18next";
import { ICard } from "../../../../types";
import "./styles.scss";

type StatsCardProps = ICard;

/**
 * A component that displays a stats card with a title and description.
 * @param {StatsCardProps} props - The props for the StatsCard component.
 * @param {string} props.title - The title of the stats card.
 * @param {string} props.description - The description of the stats card.
 * @returns The rendered StatsCard component.
 */
const StatsCard = ({ title, description }: StatsCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="stats-card">
      <h3>{t(title)}</h3>
      <p>{description}</p>
    </div>
  );
};

export default StatsCard;
