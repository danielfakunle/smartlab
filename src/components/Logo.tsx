import { logoHeaderDark, logoHeaderWhite } from '../assets';

type LogoProps = {
  size?: 'base' | 'large';
  page?: string;
  className?: string;
  onClick?: () => void;
};

function Logo({
  size = 'base',
  page = '',
  className = '',
  onClick,
}: LogoProps) {
  const determineSize = (size: string) => {
    switch (size) {
      case 'base':
        return 'h-6';
      case 'large':
        return 'h-8';
    }
  };

  return (
    <img
      onClick={onClick}
      className={`${determineSize(size)} ${className} cursor-pointer`}
      src={page === 'landing-page' ? logoHeaderWhite : logoHeaderDark}
      alt='logo'
    />
  );
}

export default Logo;
