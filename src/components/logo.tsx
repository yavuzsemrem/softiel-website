import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        
        {/* Sol parça - S harfinin sol yarısı */}
        <path
          d="M20 20C20 8.954 28.954 0 40 0C51.046 0 60 8.954 60 20V40C60 51.046 51.046 60 40 60C28.954 60 20 51.046 20 40V20Z"
          fill="url(#logoGradient1)"
        />
        
        {/* Sağ parça - S harfinin sağ yarısı */}
        <path
          d="M60 60C60 48.954 68.954 40 80 40C91.046 40 100 48.954 100 60V80C100 91.046 91.046 100 80 100C68.954 100 60 91.046 60 80V60Z"
          fill="url(#logoGradient2)"
        />
        
        {/* Merkez bağlantı */}
        <path
          d="M55 55C55 50.582 58.582 47 63 47H57C52.582 47 49 50.582 49 55V65C49 69.418 52.582 73 57 73H63C67.418 73 71 69.418 71 65V55C71 50.582 67.418 47 63 47Z"
          fill="url(#logoGradient1)"
        />
      </svg>
    </div>
  );
};

export default Logo;