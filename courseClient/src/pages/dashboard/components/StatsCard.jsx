import { memo } from "react";

const StatsCard = memo(({ title, value, subtitle }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 hover:bg-white/15 transition-all">
    <h3 className="text-sm font-medium text-white/70">{title}</h3>
    <p className="text-3xl font-bold text-white mt-2">{value}</p>
    {subtitle && <p className="text-sm text-white/60 mt-1">{subtitle}</p>}
  </div>
));

export default StatsCard;