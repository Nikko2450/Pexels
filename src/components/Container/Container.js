import { useRef } from "react";

export const Container = ({ children }) => {
  const elementRef = useRef();
  return (
    <div className="container" ref={elementRef}>
      {children}
    </div>
  );
};
