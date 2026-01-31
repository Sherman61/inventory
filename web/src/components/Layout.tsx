import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/boxes', label: 'Boxes' },
  { to: '/scan', label: 'Scan' },
];

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Inventory Tracker</div>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main>{children}</main>
      <nav className="bottom-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
