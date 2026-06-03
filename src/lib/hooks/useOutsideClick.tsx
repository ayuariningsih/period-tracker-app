import { useEffect } from "react";

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener, true);
    return () => document.removeEventListener("mousedown", listener, true);
  }, [ref, handler]);
};

export default useOutsideClick;
