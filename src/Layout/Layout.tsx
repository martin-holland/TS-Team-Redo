import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';

function Layout() {
    return (
    <>       
        <Navbar/> 
        <main>
            <Outlet />
            {/* <h1>Typescript Mini Games</h1> */}
        </main>
    </>

    );
}

export default Layout;