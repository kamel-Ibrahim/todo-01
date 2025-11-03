import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function MermaidChart({ chart, dark = true }) {
  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: dark ? "dark" : "default",
      themeVariables: {
        primaryColor: "#004643",
        primaryTextColor: "#fffffe",
        lineColor: "#abd1c6",
        textColor: "#fffffe",
        pie1: "#f9bc60", // completed
        pie2: "#e16162", // missed
      },
      securityLevel: "loose",
    });

    if (!containerRef.current) return;

  
    containerRef.current.innerHTML = "";
    const id = "mm_" + Math.random().toString(36).slice(2);
    mermaid.render(id, chart).then(({ svg }) => {
      containerRef.current.innerHTML = svg;
    });
  }, [chart, dark]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: 420,
        background: "transparent",
      }}
    />
  );
}
