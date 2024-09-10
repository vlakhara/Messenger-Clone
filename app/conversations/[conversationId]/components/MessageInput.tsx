"use client";

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  errors: FieldErrors;
}

const MessageInput: FC<MessageInputProps> = ({
  errors,
  id,
  register,
  placeholder,
  required,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
