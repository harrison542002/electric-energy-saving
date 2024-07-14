import React from "react";

type Props = { children: React.ReactNode; className?: string };

const Heading = (props: Props) => {
  return (
    <h2 className={"text-lg font-semibold mt-1 mb-2 " + props.className}>
      {props.children}
    </h2>
  );
};

export default Heading;
