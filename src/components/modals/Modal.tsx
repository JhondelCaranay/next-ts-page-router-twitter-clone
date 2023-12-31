import { AiOutlineClose } from "react-icons/ai";
import { useCallback, useEffect } from "react";
import Button from "../forms/Button";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
};
const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}: Props) => {
  useEffect(() => {
    // close when hit escape
    const handleEscape = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800 bg-opacity-70 outline-none focus:outline-none"
      onDoubleClick={(e) => {
        onClose();
      }}
    >
      <div
        className="relative mx-auto my-6 h-full w-full lg:h-auto lg:w-3/6 lg:max-w-3xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* modal content */}
        <div className="relative flex h-full w-full flex-col rounded-lg border-0 bg-black shadow-lg outline-none focus:outline-none lg:h-auto">
          {/* header */}
          <div className="flex items-center justify-between rounded-t p-10">
            <h3 className="text-3xl font-semibold text-white">{title}</h3>
            <button
              className="ml-auto border-0 p-1 text-white transition hover:opacity-70"
              onClick={handleClose}
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          {/* body */}
          <div className="relative flex-auto p-10">{body}</div>
          <div className="flex flex-col gap-2 p-10">
            <Button
              disabled={disabled}
              label={actionLabel}
              secondary
              fullWidth
              large
              onClick={handleSubmit}
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
