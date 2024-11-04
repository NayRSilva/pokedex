import { NavLink } from 'react-router-dom';

interface NavProps {
  path: string;
  name: string;
}

const NavButton = ({ path, name }: NavProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? ' rounded-t-md py-2 px-4 hover:bg-amber-600  border-b-blue-950 border-b-2 hover:border-b-amber-300 '
          : ' rounded-t-md  border-b-2 border-b-amber-600 hover:border-b-amber-300 py-2 px-4 hover:bg-amber-600 '
      }
    >
      <button className="">{name}</button>
    </NavLink>
  );
};

export default NavButton;
