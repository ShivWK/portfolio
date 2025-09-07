import { useEffect } from "react";

const useIntersection = (ref, setReady, threshold = 0.3) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setReady(true);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, setReady, threshold]);
};

export default useIntersection;
