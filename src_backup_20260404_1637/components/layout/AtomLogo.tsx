interface AtomLogoProps {
  size?: number;
  className?: string;
}

export function AtomLogo({ size = 100, className = "" }: AtomLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        {/* Main gradient for orbits */}
        <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        <linearGradient id="orbitGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        {/* Nucleus gradient */}
        <radialGradient id="nucleusGrad">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
        </radialGradient>

        {/* Glow filters */}
        <filter id="atomGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="nucleusGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Electron orbits - elliptical paths */}
      {/* Orbit 1 - tilted ellipse */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="12"
        fill="none"
        stroke="url(#orbitGrad1)"
        strokeWidth="2.5"
        transform="rotate(0 50 50)"
        opacity="0.9"
        filter="url(#atomGlow)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="8s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Orbit 2 - tilted 60 degrees */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="12"
        fill="none"
        stroke="url(#orbitGrad2)"
        strokeWidth="2.5"
        transform="rotate(60 50 50)"
        opacity="0.85"
        filter="url(#atomGlow)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="60 50 50"
          to="420 50 50"
          dur="8s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Orbit 3 - tilted 120 degrees */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="12"
        fill="none"
        stroke="url(#orbitGrad3)"
        strokeWidth="2.5"
        transform="rotate(120 50 50)"
        opacity="0.85"
        filter="url(#atomGlow)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="120 50 50"
          to="480 50 50"
          dur="8s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Electrons - animated dots on orbits */}
      {/* Electron 1 on orbit 1 */}
      <circle r="3" fill="#06b6d4" filter="url(#nucleusGlow)">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M15,50 Q50,30 85,50 Q50,70 15,50"
        />
        <animate
          attributeName="opacity"
          values="1;0.6;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Electron 2 on orbit 2 */}
      <circle r="3" fill="#ec4899" filter="url(#nucleusGlow)">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          begin="1.33s"
          path="M32.5,10.4 Q67.5,30 67.5,50 Q67.5,70 32.5,89.6 Q-2.5,70 32.5,50 Q67.5,30 32.5,10.4"
          transform="rotate(60 50 50)"
        />
        <animate
          attributeName="opacity"
          values="1;0.6;1"
          dur="2.3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Electron 3 on orbit 3 */}
      <circle r="3" fill="#10b981" filter="url(#nucleusGlow)">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          begin="2.66s"
          path="M32.5,89.6 Q67.5,70 67.5,50 Q67.5,30 32.5,10.4 Q-2.5,30 32.5,50 Q67.5,70 32.5,89.6"
          transform="rotate(120 50 50)"
        />
        <animate
          attributeName="opacity"
          values="1;0.6;1"
          dur="2.1s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Nucleus - glowing protons/neutrons */}
      <g filter="url(#nucleusGlow)">
        {/* Core proton */}
        <circle cx="50" cy="50" r="6" fill="url(#nucleusGrad)">
          <animate
            attributeName="r"
            values="6;7;6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Inner particles */}
        <circle cx="46" cy="47" r="2.5" fill="#8b5cf6" opacity="0.9">
          <animate
            attributeName="opacity"
            values="0.9;0.5;0.9"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="54" cy="47" r="2.5" fill="#06b6d4" opacity="0.9">
          <animate
            attributeName="opacity"
            values="0.9;0.5;0.9"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="50" cy="54" r="2.5" fill="#10b981" opacity="0.9">
          <animate
            attributeName="opacity"
            values="0.9;0.5;0.9"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Quantum field effect - subtle pulsing rings */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="url(#orbitGrad1)"
        strokeWidth="0.5"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values="40;45;40"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
