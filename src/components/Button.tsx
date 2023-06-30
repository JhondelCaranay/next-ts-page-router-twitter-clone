import { clsx } from "clsx";

type Props = {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
};

const Button = ({
  label,
  secondary,
  fullWidth,
  onClick,
  large,
  disabled,
  outline,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
      rounded-full
      border-2
      font-semibold
      transition
      hover:opacity-80
      disabled:cursor-not-allowed
      disabled:opacity-70
      ${clsx(
        fullWidth ? "w-full" : "w-fit",
        secondary
          ? "border-black bg-white text-black"
          : "border-sky-500 bg-sky-500 text-white",
        large ? "px-5 py-3 text-xl" : "px-4 py-2 text-base",
        outline ? "border-white bg-transparent text-white" : ""
      )}`}
    >
      {label}
    </button>
  );
};
export default Button;
