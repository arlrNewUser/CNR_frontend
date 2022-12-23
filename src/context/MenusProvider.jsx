import { createContext, useState, useEffect } from "react";
import clientAxios from "../../config/axios";

const MenusContext = createContext();

export const MenusProvider = ({children}) => {

    const [types, setTypes] = useState([]);
    const [contents, setContents] = useState([]);
    const [menus, setMenus] = useState([]);
    const {menu, setMenu} = useState({});

    useEffect(() => {
        // const token = localStorage.getItem('token');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjcxNDE5MTY0LCJleHAiOjE2NzQwMTExNjR9.akdMUnenY-jMMDQtPbFdv2iS9Q8c54R3cql5oQNZ0sw";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        const getData = async () => {
            try {
                const data = async (path) => {
                    return (await clientAxios(path, config)).data
                }

                const [menus, contents] = Promise.all(["/menus", "/menus/contents"].map(data))

                setMenus(menus);
                setContents(contents);
    
            } catch (e) {
                console.log(e);
            }
        } 
        getData();
    }, []);

    const setEdition = (menu) => {
        setMenu(menu);
    }

    const saveMenu = async (menu) => {
        // const token = localStorage.getItem('token');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjcxNDE5MTY0LCJleHAiOjE2NzQwMTExNjR9.akdMUnenY-jMMDQtPbFdv2iS9Q8c54R3cql5oQNZ0sw";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        if(menu.id) {
            try {
                const { data } = await clientAxios.put(`/menus/${menu.id}`, menu, config);
                const menusUpdated = menus.map( menuState => menuState.id === data.id ? data : menuState);
                setMenus(menusUpdated);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await clientAxios.post('/menus', menu, config);
                const menusUpdated = [data, ...menus]
                setMenus(menusUpdated);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const delMenu = async (menu) => {
        // const token = localStorage.getItem('token');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjcxNDE5MTY0LCJleHAiOjE2NzQwMTExNjR9.akdMUnenY-jMMDQtPbFdv2iS9Q8c54R3cql5oQNZ0sw";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        try {
            await clientAxios.delete(`/menus/${menu.id}`, config);
            const menusUpdated = menus.filter( menuState => menuState.id !== menu.id )
            setMenus(menusUpdated);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MenusContext.Provider
            value={{
                menus,
                menu,
                setEdition,
                saveMenu,                
                delMenu,
            }}
        >
            {children}
        </MenusContext.Provider>
    )
}

export default MenusContext;
