export default function HeroTypeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden hidden lg:flex items-end justify-end z-0 pb-6"
    >
      <span
        className="font-display font-bold leading-none whitespace-nowrap"
        style={{
          fontSize: "clamp(120px, 13vw, 240px)",
          color: "transparent",
          WebkitTextStroke: "2px rgba(253,184,19,0.2)",
          transform: "translateX(10%)",
        }}
      >
        SOUTHERN
      </span>
    </div>
  );
}
