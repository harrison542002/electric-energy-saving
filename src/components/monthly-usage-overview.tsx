import Heading from "@/components/heading";
import Link from "next/link";
import React from "react";

type Props = {
  monthly_usage: {
    id: number;
    total_energy_bill: number;
    electric_kWh: number;
    gas_kWh: number;
    household_id: string;
    date: Date;
  }[];
};

function MonthlyUsageOverview({ monthly_usage }: Props) {
  return (
    <div className="w-full">
      <Heading className="text-center">Monthly Usage Overview</Heading>
      <div>
        <table className="border text-sm shadow-sm bg-slate-50 w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-2 py-2 font-semibold">Electric usage (kwh)</th>
              <th className="px-2 py-2  font-semibold">Gas usage (kwh)</th>
              <th className="px-2 py-2 font-semibold">Bill (£)</th>
              <th className="px-2 py-2 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {monthly_usage &&
              monthly_usage.map((usage) => (
                <tr key={usage.id} className="border border-b">
                  <td className="px-2 py-0.5">
                    {usage.electric_kWh.toFixed(2)}
                  </td>
                  <td className="px-2 py-0.5">{usage.gas_kWh.toFixed(2)}</td>
                  <td className="px-2 py-0.5">
                    {usage.total_energy_bill.toFixed(2)}
                  </td>
                  <td className="px-2 py-0.5">
                    {new Date(usage.date).toDateString()}
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan={4}>
                <Link
                  href={"/monthly-usage"}
                  className="block w-full text-center py-2 bg-primary text-white shadow-md hover:bg-primary/85"
                >
                  See More
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyUsageOverview;
