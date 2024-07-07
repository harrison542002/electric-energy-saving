import React from "react";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = (props: Props) => {
  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="mx-4 xl:mx-0 grid-cols-2 md:grid py-5 gap-2">
        {props.children}
      </div>
    </div>
  );
};

export default PublicLayout;
