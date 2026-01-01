const VoxOpsLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="voxLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(265 85% 65%)" />
          <stop offset="100%" stopColor="hsl(295 85% 60%)" />
        </linearGradient>
        <linearGradient id="voxIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="hsl(265 30% 90%)" />
        </linearGradient>
      </defs>
      
      {/* Outer glow circle */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="url(#voxLogoGradient)"
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
      
      {/* Voice wave / sound icon representing "Vox" */}
      <path
        d="M14 20C14 20 16 16 20 16C24 16 26 20 26 20"
        stroke="url(#voxIconGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M11 20C11 20 14 12 20 12C26 12 29 20 29 20"
        stroke="url(#voxIconGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M17 20C17 20 18 18 20 18C22 18 23 20 23 20"
        stroke="url(#voxIconGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Center dot - represents voice origin */}
      <circle
        cx="20"
        cy="24"
        r="2.5"
        fill="url(#voxIconGradient)"
      />
    </svg>
  );
};

export default VoxOpsLogo;
