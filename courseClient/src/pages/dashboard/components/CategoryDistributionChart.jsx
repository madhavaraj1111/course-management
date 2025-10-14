import { memo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const CategoryDistributionChart = memo(({ courses }) => {
  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
  ];

  const categoryData = courses.reduce((acc, course) => {
    const category = course.category || "Uncategorized";
    const existing = acc.find((item) => item.name === category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, []);

  if (!categoryData.length) {
    return (
      <div className="flex items-center justify-center h-64 text-white/60">
        No course data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="45%"
          labelLine={false}
          label={false}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Legend
          wrapperStyle={{ color: "#fff", fontSize: "14px" }}
          iconType="circle"
          formatter={(value, entry) => `${value}: ${entry.payload.value}`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});

export default CategoryDistributionChart;