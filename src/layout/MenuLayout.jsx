import { Outlet } from "react-router-dom"
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

const MenuLayout = () => {
    return (
        <>
            <PublicHeader />
            <Outlet />
            <PublicFooter />
        </>
    );
};

export default MenuLayout;
