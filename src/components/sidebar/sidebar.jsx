import { NavLink } from 'react-router-dom';
import './sidebar.css';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Student', path: '/student' },
  { name: 'Companies', path: '/companies' },
  { name: 'Placements', path: '/placements' },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Placement Hub</h2>
        <p>Student Portal</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <strong>Need help?</strong>
        <p>Contact support for placement guidance.</p>
      </div>
    </aside>
  );
}

export default Sidebar;