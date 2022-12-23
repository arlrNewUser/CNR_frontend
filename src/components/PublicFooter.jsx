import { Link } from 'react-router-dom'

const PublicFooter = () => {
    return (
        <footer> 
            <div className="info">
                <div> 
                    <h5>
                        Dónde estamos
                    </h5>
                    <a href="#">
                        Calle Francisco Villareal 605<br />San Isidro
                    </a>
                </div>
                <div> 
                    <h5>
                        Llámanos
                    </h5>
                    <a href="#">
                        <i className="fa fa-phone" /> 
                        &nbsp;Celular: 922 969 240
                    </a>
                    <a href="#">
                        <i className="fa fa-phone" /> 
                        &nbsp;Celular: 986 294 384
                    </a>
                    <a href="#">
                        Te llamamos nosotros
                    </a>
                </div>
                <div> 
                    <h5>
                        Escríbanos
                    </h5>
                    <a href="#">
                        Por correo electrónico
                    </a>
                </div>
                <div> 
                    <h5>
                        Síguenos
                    </h5>
                    <div className="social">
                        <a href="#"><i className="fab fa-facebook-f" /></a>
                        <a href="#"><i className="fab fa-instagram" /></a>
                        <a href="#"><i className="fab fa-twitter" /></a>
                        <a href="#"><i className="fab fa-youtube" /></a>
                    </div>
                </div>
            </div>
            <div className="foot"> 
                <div>
                    <img src="/images/logo-2.png" alt="Centro Nutricional Rodríguez" style={{width: '150px'}} />
                </div>
                <a href="#">© Copyright 2022</a>
                <a href="#">Aviso Legal</a>
                <a href="#">Política de privacidad</a>
                <a href="#">Política de cookies</a>
                <a href="#">Política de devoluciones</a>
            </div>
        </footer>
    );
}

export default PublicFooter;
