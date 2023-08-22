import { useState } from 'react';
import {
  burgerMenu,
  burgerMenuWhite,
  closeIcon,
  closeIconWhite,
} from '../assets';

type MobileMenuProps = {
  page: string;
  type?: 'landing-page' | 'app';
};

function MobileMenu({ page = '', type = 'landing-page' }: MobileMenuProps) {
  const [menu, toggleMenu] = useState(false);

  return (
    <>
      <button
        className={`md:hidden w-10 h-10 p-2 rounded-lg focus:outline-none focus:ring-2 ${
          page === 'landing-page'
            ? 'hover:bg-blue-950 focus:ring-blue-900/40'
            : 'hover:bg-gray-100 focus:ring-gray-200'
        }`}
        onClick={() => toggleMenu(!menu)}
      >
        {menu ? (
          <img src={page === 'landing-page' ? closeIconWhite : closeIcon} />
        ) : (
          <img src={page === 'landing-page' ? burgerMenuWhite : burgerMenu} />
        )}
      </button>
      {/* Mobile Menu */}
      {menu && (
        <div
          className={`h-fit ${
            page === 'landing-page'
              ? 'bg-blue-950'
              : 'bg-white border-t-2 border-gray-100'
          } absolute inset-0 pt-4 px-4 top-full z-20`}
        >
          <ul
            className={`border-2 ${
              page === 'landing-page'
                ? 'bg-blue-900/40 border-blue-800/20'
                : 'bg-gray-100 border-gray-200'
            } rounded-lg h-full p-4`}
          >
            {type === 'app' ? (
              <>
                <li
                  className={`p-3 text-sm font-medium ${
                    page === 'landing-page'
                      ? 'text-white hover:bg-blue-950/30'
                      : 'text-gray-900 hover:bg-gray-200'
                  } rounded-md`}
                >
                  Home
                </li>
                <li
                  className={`p-3 text-sm font-medium ${
                    page === 'landing-page'
                      ? 'text-white hover:bg-blue-950/30'
                      : 'text-gray-900 hover:bg-gray-200'
                  } rounded-md`}
                >
                  Leaderboard
                </li>
              </>
            ) : (
              <>
                <li
                  className={`p-3 text-sm font-medium ${
                    page === 'landing-page'
                      ? 'text-white hover:bg-blue-950/30'
                      : 'text-gray-900 hover:bg-gray-200'
                  } rounded-md`}
                >
                  Log in
                </li>
                <li
                  className={`p-3 text-sm font-medium ${
                    page === 'landing-page'
                      ? 'text-white hover:bg-blue-950/30'
                      : 'text-gray-900 hover:bg-gray-200'
                  } rounded-md`}
                >
                  Sign up
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
