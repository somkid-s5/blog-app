"use client";
import { useState, FC } from "react";

interface InputBoxProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  id: string;
  icon: string;
}

const InputBox: FC<InputBoxProps> = ({
  name,
  type,
  placeholder,
  value,
  id,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative w-full mb-4">
      <input
        name={name}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="w-full rounded-md p-4 bg-gray-100 pl-12 border border-grey focus:bg-transparent placeholder:text-black"
      />
      <i
        className={"fi " + icon + " absolute left-4 top-1/2 -translate-y-1/2"}
      ></i>

      {type === "password" ? (
        <i
          className={`fi fi-rr-eye${
            !showPassword ? "-crossed" : ""
          } absolute  top-1/2 -translate-y-1/2 left-auto right-4  cursor-pointer`}
          onClick={() => setShowPassword((currentVal) => !currentVal)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
