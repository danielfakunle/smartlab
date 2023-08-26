type ButtonProps = {
  type?: 'button' | 'submit';
  size?: string;
  children: React.ReactNode;
  style?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

function Button({
  type = 'button',
  size = 'base',
  children,
  style = 'default',
  className = '',
  onClick,
  disabled = false,
}: ButtonProps) {
  const determineSize = (size: string) => {
    switch (size) {
      case 'base':
        return 'px-5 py-2.5 text-sm';
      case 'large':
        return 'px-5 py-3 text-base';
      case 'extra large':
        return 'px-6 py-3.5 text-base';
    }
  };
  const determineStyle = (style: string) => {
    switch (style) {
      case 'default':
        return 'text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-center';
      case 'alternative':
        return 'font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${determineSize(size)} ${determineStyle(style)} ${className}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
