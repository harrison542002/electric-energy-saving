"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SavingCharts = ({ rewards }: { rewards: any[] | undefined }) => {
  const data = rewards?.map((reward) => {
    return {
      name: reward.expired_date.toDateString(),
      total_saving: reward.total_saving,
    };
  });
  return (
    <>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis yAxisId="left" fontSize={12} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="total_saving"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default SavingCharts;
