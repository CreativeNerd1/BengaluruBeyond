import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    setTransitionStage("fadeOut");
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }, 200);

    return () => clearTimeout(timeout);
  }, [location, children]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {displayChildren}
    </div>
  );
};

export default PageTransition;
