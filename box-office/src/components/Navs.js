import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavList, LinkStyled } from './Navs.styled';

// Array of links to associate with the components
const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];
// Navigation links for pages
const Navs = () => {
  // Used to highlight the current menu item
  const location = useLocation();
  return (
    <div>
      <NavList>
        {LINKS.map(item => (
          <li key={item.to}>
            <LinkStyled
              to={item.to}
              className={item.to === location.pathname ? 'active' : ''}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default memo(Navs);
