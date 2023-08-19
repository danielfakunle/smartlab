import { logoHeaderDark, logoHeaderWhite } from '../assets';

type LogoProps = {
  size?: 'base' | 'large';
  page?: string;
};

function Logo({ size = 'base', page = '' }: LogoProps) {
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
      className={`${determineSize(size)}`}
      src={page === 'landing-page' ? logoHeaderWhite : logoHeaderDark}
      alt='logo'
    />
  );
}

export default Logo;
