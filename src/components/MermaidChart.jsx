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

   
    const src = (chart || "").trim(); 
    if (!src) {
      containerRef.current.innerHTML =
        "<em style='opacity:.7'>No chart data</em>";
      return;
    }
    try {
      mermaid.parse(src);
    } catch (e) {
      containerRef.current.innerHTML = `
        <div style="opacity:.75">
          Mermaid parse error<br/>
          <code style="font-size:.9rem">${String(e?.message || e)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code>
        </div>`;
      return;
    }

    containerRef.current.innerHTML = "";
    const id = "mm_" + Math.random().toString(36).slice(2);

    mermaid
      .render(id, src)
      .then(({ svg }) => {
        containerRef.current.innerHTML = svg;
      })
      .catch((e) => {
        containerRef.current.innerHTML = `
          <div style="opacity:.75">
            Mermaid render error<br/>
            <code style="font-size:.9rem">${String(e?.message || e)
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")}</code>
          </div>`;
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
