import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const useKeyEvent = ({ setIsOpen }: Props) => {
  useEffect(() => {
    // open modal when hit ctrl + m
    const handleOpen = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "m") setIsOpen((prev) => !prev);
    };

    document.addEventListener("keydown", handleOpen);
    return () => {
      document.removeEventListener("keydown", handleOpen);
    };
  }, []);
};
export default useKeyEvent;
