const VDashLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(265 85% 65%)" />
          <stop offset="100%" stopColor="hsl(295 85% 60%)" />
        </linearGradient>
        <linearGradient id="vGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="hsl(265 30% 90%)" />
        </linearGradient>
      </defs>
      
      {/* Outer glow circle */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="url(#logoGradient)"
        className="drop-shadow-lg"
      />
      
      {/* Inner darker circle for depth */}
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="hsl(265 50% 25%)"
        fillOpacity="0.3"
      />
      
      {/* Stylized V */}
      <path
        d="M12 12L20 28L28 12"
        stroke="url(#vGradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Dash element */}
      <line
        x1="14"
        y1="20"
        x2="26"
        y2="20"
        stroke="url(#vGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
};

export default VDashLogo;
