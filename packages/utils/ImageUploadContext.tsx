import React from "react";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  createcontextObjectURL: string;
  onChange: any;
};

//React.memo化
const ImageUploadContext: React.VFC<Props> = ({
  onChange,
  createcontextObjectURL,
}) => {
  return (
    <div>
      <img
        className="flex justify-center items-center m-auto  w-full"
        src={createcontextObjectURL}
        alt="サムネイル"
      />
      <label
        htmlFor="file-input"
        className="bg-primary-900 text-white-900 dark:bg-dark-900 flex justify-center items-center px-4 py-2 rounded mb-6 w-full"
      ></label>
      <input
        id="file-input"
        className="hidde
        n"
        type="file"
        multiple
        accept="image/*,.png,.jpg,.jpeg,.gif"
        name="myImage"
        onChange={onChange}
      />
    </div>
  );
};

export default ImageUploadContext
