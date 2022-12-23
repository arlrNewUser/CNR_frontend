import { useState, useEffect } from "react";
import clientAxios from "../../../config/axios";

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

function sumDay (d, n) {
    let nDay = new Date(d);
    let day = d.getDate();
    nDay.setDate(day + n);
    return nDay;
}

function arrayWeek (i) {
    const d = new Date();
    let day = d.getDay() || 7;  
    let monday = sumDay(d, 1-day+7*i);
    let days = [monday, sumDay(monday, 1), sumDay(monday, 2), sumDay(monday, 3), sumDay(monday, 4), sumDay(monday, 5), sumDay(monday, 6)];
    return days;
}

const selectWithId = (id, menu) => {
    const contents = menu.contents || []
    const content = contents.find(c => c.typeId === id);
    const name = content?.name
    return name
}

const Calendario = () => {

    const [index, setIndex] = useState(0);
    const [menus, setMenus] = useState([]);

    const [charged, setCharged] = useState(false);

    useEffect(() => {
        const getMenus = async () => {
            setCharged(false);
            try {
                const days = arrayWeek(index);
                let result = await Promise.all(days.map(d2axios));
                setMenus(result);
            } catch (error) {
                console.log(error);
            }
            setCharged(true);
        }
        getMenus();
    }, [index]);

    useEffect(() => {
        if (document.getElementById('today')) {
            // document.getElementById('today').scrollIntoView({ behavior: 'smooth' });     
        }
    }, [menus]);

    const Info = () =>{
        return (
            <div className="info">
                <div className="menu">
                    <a className={ charged ? null : "disable" } onClick={() => {
                        setIndex(index-1);
                    }}>
                        <i className="fa-solid fa-angle-left"></i>
                        <i className="fa-solid fa-angle-left"></i>
                    </a>
                    <h2>
                        <a className={ charged ? null : "disable" } onClick={() => {
                            setIndex(0);
                        }}>
                            MENÚ
                        </a>
                    </h2>
                    <a className={ charged ? null : "disable" } onClick={() => {
                        setIndex(index+1);
                    }}>
                        <i className="fa-solid fa-angle-right"></i>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </div>
                <div className="month">
                    <span>{months[menus[0]?.day.getMonth()]}</span>
                </div>
            </div>
        )
    }

    return (
        <main className="calendario">
            <Info />
            <div className="calendar">
                {menus?.map((menu) => {
                    return (
                        <article key={ formatDate(menu.day) } className="card" id={ (formatDate(new Date()) == formatDate(menu.day)) ? "today" : null }>
                            <div className="card__title">
                                <h3>
                                    { week[menu.day.getDay()] + " " +formatDate(menu.day).slice(-2) }
                                    <span>{ selectWithId(1, menu) }</span>
                                </h3>
                            </div>
                            <div className="card__content">
                                <div>
                                    <h4>ENTRADA: </h4>
                                    <span>
                                        { selectWithId(2, menu) }
                                    </span>
                                </div>
                                <div>
                                    <h4>P. FONDO: </h4>
                                    <span>
                                        { selectWithId(3, menu) }
                                    </span>
                                </div>
                                <div>
                                    <h4>BEBIDA: </h4>
                                    <span>
                                        { selectWithId(4, menu) }
                                    </span>
                                </div>
                                <div>
                                    <h4>POSTRE: </h4>
                                    <span>
                                        { selectWithId(5, menu) }
                                    </span>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
            <Info />
        </main>
    );
};

export default Calendario;
