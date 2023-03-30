/* eslint-disable react/display-name */
import React from "react";

type Props = {
  text: string;
  onClick: () => void;
};

//React.memo化
const Openbutton: React.VFC<Props> = React.memo(({ text, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center"
      >
        {text}
      </button>
    </div>
  );
});

export default Openbutton;
