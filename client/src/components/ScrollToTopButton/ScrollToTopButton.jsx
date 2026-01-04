import { useEffect, useState } from "react";
import './ScrollToTopButton.css';


const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
          top: 0,
      behavior: "smooth"
    });
  };
  return (
    <>
    <button
      onClick={scrollToTop}
      className={`scroll_to_top ${visible ? "show" : ""}`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
    </>
  )
}

export default ScrollToTopButton