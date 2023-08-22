import { Menu } from '@headlessui/react';
import { defaultUser } from '../assets';

type UserDropdownProps = {
  type: 'landing-page' | 'app';
};

function UserDropdown({ type }: UserDropdownProps) {
  return (
    <Menu>
      <Menu.Button
        className={`rounded-full h-12 w-12 bg-gray-100 cursor-pointer ${
          type === 'app' ? 'flex' : 'hidden'
        } justify-center items-center`}
      >
        <img src={defaultUser} alt='user' />
      </Menu.Button>
      <Menu.Items className='absolute right-16 md:right-2 top-[120%] z-40 font-normal bg-white rounded-lg shadow h-fit py-2 w-44'>
        <Menu.Item>
          {({ active }) => (
            <p className={`${active && 'bg-gray-100'} px-4 py-2`}>Sign out</p>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default UserDropdown;
