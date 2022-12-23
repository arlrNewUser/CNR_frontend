import { Link } from 'react-router-dom'

const PublicHeader = () => {
    return (
        <header>
            <div className="info">
                <div style={{fontWeight: '600',}}>
                    Nutricionistas especializados con estándares de calidad
                </div>
                <div style={{width: '5%',}}></div>
                <div className="icons">
                    <a href="https://www.facebook.com/Centro-Nutricional-Rodriguez-102559994841758" target="_blank">
                        <i className="fa-brands fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="https://www.instagram.com/centro_nutricional_rodriguez/?hl=es-la" target="_blank">
                        <i className="fa-brands fa-instagram fa-lg"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=51922969240&amp;text=Necesito información" target="_blank">
                        <i className="fa-brands fa-whatsapp fa-lg"></i>
                    </a>
                </div>
                <div className="divisor" style={{borderLeft: '1px solid #42657F',}}></div>
                <div className="cellphone">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                    &nbsp;Cel.: 922969240 / 986294384
                </div>
                <div>
                    <i className="fa-solid fa-envelope"></i>
                    &nbsp;ventas@centronutricionaleodriguez.com
                </div>
            </div>
            <nav>
                <Link className="center" to="/">
                    <img src="/images/logo-1.png" alt="Centro Nutricional Rodriguez" style={{width: '245px',}} />
                </Link>
                <div style={{width: '5%',}}></div>
                <Link className="linkc" to="/">
                    Inicio
                </Link>
                <Link className="linkc" to="/nosotros">
                    Nosotros
                </Link>
                <Link className="linkc" to="/servicios">
                    Servicios que ofrecemos
                </Link>
                <Link className="linkc" to="/blog-nutricional">
                    Blog nutricional
                </Link>
                <Link className="linkc" to="/proyectos-sociales">
                    Proyectos sociales
                </Link>
                <Link className="linkc" to="/contacto">
                    Contáctenos
                </Link>
            </nav>
        </header>
    );
}

export default PublicHeader;