import "./PerformanceCards.css";
import StatCard from "../PerformanceStatCard/PerformanceStatCard";
import { statCards } from "../../data/performanceData";

const PerformanceCards = () => {
  return (
    <div className="cards-grid">
      {statCards.map((card) => {
        const Icon = card.icon;

        return (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={<Icon color={card.iconColor} size={18} />}
            iconBg={card.iconBg}
          />
        );
      })}
    </div>
  );
};

export default PerformanceCards;