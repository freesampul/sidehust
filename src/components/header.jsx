import { ReactComponent as CrwnLogo } from '../assets/crown.svg';
import { Outlet } from 'react-router-dom';
const Header = () => {
    return (
        <header className='bg-dark-bckground sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-gray-500 p-8'>
        <CrwnLogo className='w-8 h-8' />
        <Outlet />
        </header>
    );
    }
    export default Header;