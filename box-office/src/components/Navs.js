import React from 'react';
import { Link } from 'react-router-dom';

// Array of links to associate with the components
const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];
// Navigation links for pages
const Navs = () => {
  return (
    <div>
      <ul>
        {LINKS.map(item => (
          <li key={item.to}>
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
