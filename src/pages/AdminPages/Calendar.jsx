import { useReducer } from "react";
import { useState, useEffect } from "react";
import clientAxios from "../../../config/axios";
import { range, map } from "lodash";
import CreatableSelect from 'react-select/creatable';


const months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
const week = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];

function formatDate (d) {
    let month = (d.getMonth() + 1).toString();
    let day = (d.getDate()).toString();
    let year = (d.getFullYear()).toString();

    if (month.length < 2){
        month = '0' + month;
    }        
    if (day.length < 2){
        day = '0' + day;
    }
    let fecha=[year, month, day].join('-');
    return fecha;
}

function firstDay (d, i) {
    return (new Date(d.getFullYear(), d.getMonth()+i, 1));
}

function monthLenght (d) {
    return (new Date(d.getFullYear(), d.getMonth()+1, 0)).getDate();
}

function sumDay (d, n) {
    let nDay = new Date(d);
    let day = d.getDate();
    nDay.setDate(day + n);
    return nDay;
}

async function d2axios (d) {
    let date = formatDate(d);
    let data;
    try {
        ({ data } = await clientAxios(`/menus/${date}`));
    } catch {
        data={};
        // console.clear();
    }
    data.day=d;
    return data;
}

function arrayMonth (d, i) {
    const fDay = firstDay(d, i);
    const k = fDay.getDay();
    let days = map(range(-k,42-k), (n) => {
        let nDay = new Date(fDay);
        let day = fDay.getDate();
        nDay.setDate(day + n);
        return nDay;
    });
    return days;
}

function conditionalDate (e) {
    return e.filter((a) => a[1]).map((a) => a[0]).join(" ");
}


const Calendar = () => {

    const [index, setIndex] = useState(0);
    const [date, setDate] = useState();

    const [menus, setMenus] = useState([]);
    const [menu, setMenu] = useState();

    const [contents, setContents] = useState([])

    const [charged, setCharged] = useState(false);
    const [fcharged, setFcharged] = useState(false);

    useEffect(() => {
        const getMenus = async () => {
            setCharged(false);
            try {
                const d = new Date();
                const days = arrayMonth(d, index);
                let result = await Promise.all(days.map(d2axios));
                setMenus(result);
                setDate(firstDay(d, index));
            } catch (error) {
                console.log(error);
            }
            setCharged(true);
        }
        getMenus();
    }, [index]);

    useEffect(() => {
        const settMenu = async () => {
        if (!fcharged) {
       
            menus?.map((e) => {
                if (formatDate(e.day) == formatDate(new Date())) {
                    setMenu(e);
                }
            });
            if (menu) {
                setFcharged(true);
            }   
            }
        }
        settMenu();
    }, [menus]);


    useEffect(() => {
        const getContents = async () => {
            let data;
            try {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjcxNDE5MTY0LCJleHAiOjE2NzQwMTExNjR9.akdMUnenY-jMMDQtPbFdv2iS9Q8c54R3cql5oQNZ0sw";
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                ({ data } = await clientAxios("/menus/contents", config));
            } catch {
                console.log("Error al registrar los datos")
            }
            setContents(data);
        };
        getContents();
    }, []);

    const CalendarHead = () => {
        return (
            <div className="calendar__head">
                <div style={{textAlign: "left"}}>
                    <a style={charged ? {cursor: "pointer"} : {pointerEvents: "none", color: "gray"}} onClick={() => {
                        setIndex(index-1);
                    }}>
                        <i className="fa-solid fa-angle-left"></i>
                        <i className="fa-solid fa-angle-left"></i>
                    </a>
                </div>
                <div style={{textAlign: "center"}}>
                    <a style={charged ? {cursor: "pointer"} : {pointerEvents: "none", color: "gray"}} onClick={() => {
                        setIndex(0);
                    }}>
                        {date && months[date.getMonth()] + " " + date.getFullYear()}
                    </a>
                </div>

                <div style={{textAlign: "right"}}>
                    <a style={charged ? {cursor: "pointer"} : {pointerEvents: "none", color: "gray"}} onClick={() => {
                        setIndex(index+1);
                    }}>
                        <i className="fa-solid fa-angle-right"></i>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </div>
            </div>
        );
    }

    const CalendarBody = () => {
        return (
            <div className="calendar__body">
                {week.map((i) => {
                    return (
                        <div key={i.slice(0, 2)}>
                            {i.slice(0, 2)}
                        </div>
                    )
                })}

                {menus?.map((m) => {
                    return (
                        <div
                            key={formatDate(m.day)}
                            className={conditionalDate([
                                ["pndate", m.day.getMonth() != date.getMonth()],
                                ["exists", m.date],
                                ["clicked", menu && (formatDate(m.day) == formatDate(menu.day))]
                            ])}
                        >
                            <a onClick={() => {
                                setMenu(m);
                            }}>
                                {m.day.getDate()}
                            </a>
                        </div>
                    )
                }
                )}
            </div>
        );
    }

    const Calendar = () => {
        return (
            <div className="calendar">
                <CalendarHead />
                <CalendarBody />
            </div>
        );
    }

    async function savMenu (menu) {
        // const token = localStorage.getItem('token');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjcxNDE5MTY0LCJleHAiOjE2NzQwMTExNjR9.akdMUnenY-jMMDQtPbFdv2iS9Q8c54R3cql5oQNZ0sw";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
    
        if(menu.date) {
            try {
                const { data } = await clientAxios.put(`/menus/${menu.date}`, menu, config);
                data.day=menu.day;
                const menuUpdated = menus.map( menuState => {
                    if (formatDate(menuState.day) === data.date) {
                        
                        return data;
                    }
                    return menuState;
                });
                setMenu(data);
                setMenus(menuUpdated);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                menu.date = formatDate(menu.day);
                const { data } = await clientAxios.post('/menus', menu, config);
                data.day=menu.day;
                const menuUpdated = menus.map( menuState => {
                    if (formatDate(menuState.day) === data.date) {
                        return data;
                    }
                    return menuState;
                });
                setMenu(data);
                setMenus(menuUpdated);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    async function delMenu (menu) {
        // const token = localStorage.getItem('token');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjcxNDE5MTY0LCJleHAiOjE2NzQwMTExNjR9.akdMUnenY-jMMDQtPbFdv2iS9Q8c54R3cql5oQNZ0sw";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const data = {
                day: menu.day,
            }
            await clientAxios.delete(`/menus/${menu.date}`, config);
            const menuUpdated = menus.map( menuState => {
                if (formatDate(menuState.day) === formatDate(data.day)) {
                    return data;
                }
                return menuState;
            });
            setMenu(data);
            setMenus(menuUpdated);
        } catch (error) {
            console.log(error);
        }
    }

    async function savContent (content) {
        // const token = localStorage.getItem('token');
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjcxNDE5MTY0LCJleHAiOjE2NzQwMTExNjR9.akdMUnenY-jMMDQtPbFdv2iS9Q8c54R3cql5oQNZ0sw";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const { data } = await clientAxios.post("/menus/contents", content, config);
            return data;
        } catch (error) {
            console.log(error);
        }        
    }

    const Menu = () => {

        const [saveMenu, setSaveMenu] = useState();

        const createOption = (content) => ({
            label: content.name,
            value: content.id,
        })

        useEffect(() => {
            let contents = (menu.contents || []).map(m => m.id);
            if(menu.date){
                if (!contents) {
                    contents = [];
                }
                setSaveMenu({
                    day: menu.day,
                    date: menu.date,
                    contents
                });
            } else {
                setSaveMenu({
                    day: menu.day,
                    contents
                });
            }
        }, [menu]);

        useEffect(() => {
            console.log("menu")
            console.log(menu)
        }, [menu])

        useEffect(() => {
            console.log("saveMenu")
            console.log(saveMenu)
        }, [saveMenu])

        useEffect(() => {
            console.log("contents")
            console.log(contents)
        }, [contents])

        const CreatableWithId = ({typeId}) => {
            const [isLoading, setIsLoading] = useState(false);

            const cts = contents.filter(c => c.typeId == typeId).map(createOption);
            const menuContents = saveMenu?.contents || [];
            const value = cts.find(c => menuContents.includes(c.value));

            const handleChange = (input) => {
                const menuContents = saveMenu?.contents || [];
                const ctss = cts.map(c => c.value);
                const a = menuContents.filter(c => !ctss.includes(c))
                const newContent = input ? [...a, input.value] : a

                setSaveMenu({
                    ...saveMenu,
                    contents: newContent
                });
            };
            const handleCreate = input => {
                setIsLoading(true);
                const data = savContent({
                    typeId,
                    name: input
                });
                setContents([...contents, data]);
                setIsLoading(false);
                setSaveMenu({
                    ...saveMenu,
                    contents: newContent
                });
            };

            return (
                <CreatableSelect
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={handleChange}
                    onCreateOption={handleCreate}
                    options={cts}
                    value={value}
                />
            )
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            savMenu(saveMenu);
        };

        const handleReset = (e) => {
            e.preventDefault();
            delMenu(saveMenu)

        }

        return (
            <article className="card">
                <form onSubmit={ handleSubmit } onReset={ handleReset }>
                    <div className="card__title">
                        <h3>
                            { week[menu.day.getDay()] + " " + formatDate(menu.day).slice(-2) }
                            <span>
                                <CreatableWithId
                                    typeId={1}
                                />
                            </span>
                        </h3>
                    </div>
                    <div className="card__content">
                        <div>
                            <h4>ENTRADA: </h4>
                            <span>
                                <CreatableWithId
                                    typeId={2}
                                />
                            </span>
                        </div>
                        <div>
                            <h4>P. FONDO: </h4>
                            <span>
                                <CreatableWithId
                                    typeId={3}
                                />
                            </span>
                        </div>
                        <div>
                            <h4>BEBIDA: </h4>
                            <span>
                                <CreatableWithId
                                    typeId={4}
                                />
                            </span>
                        </div>
                        <div>
                            <h4>POSTRE: </h4>
                            <span>
                                <CreatableWithId
                                    typeId={5}
                                />
                            </span>
                        </div>
                        <input type="submit" value={menu.date ? "Guardar cambios" : "Agregar menú"}/>
                        { menu.date && <input type="reset" value={"Eliminar menú"}/> }
                    </div>
                </form>
            </article>
        );
    }

    const Charging = () => {
        return (
            <div className="charging">
                Cargando ...
            </div>
        );
    }

    return (
        <main className="calendar">
            {menu ?
                <>
                    <Calendar />
                    <Menu />
                </>
            : 
                <Charging />
            }
        </main>
    );
};

export default Calendar;
