import React from "react";

type Props = { kpiResults: any[] };

const KPICards = (props: Props) => {
  const [rank, average_saving, previous_month_saving, total_cost] =
    props.kpiResults;
  return (
    <div className="flex gap-2">
      <div className="bg-slate-50 p-2 rounded-md shadow-sm">
        <h3 className="text-sm text-gray-500">Average saving</h3>
        <p className="text-lg font-bold">£ {average_saving}</p>
      </div>
      <div className="bg-slate-50 p-2 rounded-md shadow-sm">
        <h3 className="text-sm text-gray-500">Saving last month</h3>
        <p className="text-lg font-bold">£ {previous_month_saving}</p>
      </div>
      <div className="bg-slate-50 p-2 rounded-md shadow-sm">
        <h3 className="text-sm text-gray-500">Total cost on energy </h3>
        <p className="text-lg font-bold">£ {total_cost}</p>
      </div>
      <div className="bg-slate-50 p-2 rounded-md shadow-sm">
        <h3 className="text-sm text-gray-500">Rank this month</h3>
        <p className="text-lg font-bold">{rank?.rankPlace}</p>
      </div>
    </div>
  );
};

export default KPICards;
