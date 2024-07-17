import React from "react";

type Props = {
  children: React.ReactNode;
};

function DashboardComponentLayout({ children }: Props) {
  return <div className="max-w-[1200px] mx-auto p-4">{children}</div>;
}

export default DashboardComponentLayout;
