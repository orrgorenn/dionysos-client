import { MenuIcon } from '@heroicons/react/solid';
import React from 'react';
import useSideMenu from '../hooks/sideMenu';
import { visibility } from '../utils';

type OverlayMenuProps = {
  panel: ReturnType<typeof useSideMenu>,
  chat: ReturnType<typeof useSideMenu>,
}

const OverlayMenu = ({
  panel, chat,
}: OverlayMenuProps) => {
  const iconStyle = 'block p-2 h-8 w-8 bg-light-primary-400 dark:bg-dark-primary-600 rounded-full cursor-pointer text-center opacity-60 hover:opacity-100 transition-opacity';
  const iconMarge = !panel.isOpen && !chat.isOpen ? 'mb-3 last:mb-0' : '';

  return (
    <div className="absolute top-[50%] left-3 z-10 translate-y-[-50%]">
      <MenuIcon className={`${iconStyle} ${iconMarge} ${visibility(!panel.isOpen)}`} onClick={() => panel.toggle()} />
    </div>
  );
};

export default OverlayMenu;
