package aspectos;

import entidades.Traza;
import entidades.Usuario;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import jpa.UsuarioJpaController;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Aspect
public class TrazaAspecto {

    @Autowired
    HttpServletRequest request;

    @Autowired
    UsuarioJpaController repositorio;

    @AfterReturning("execution(* controlSpring.*.*(..))")
    public void doAccessCheck(JoinPoint punto) {
        try {
//            String nombreMetodo = punto.getSignature().getName();
            String nombreControlador = punto.getTarget().getClass().getName();
            String metodo = request.getMethod();
            String accion = accion(nombreControlador, request.getRequestURI(), metodo);
            String url = request.getRequestURI();
            if (puedeInsertarse(url, metodo)) {
                if (!url.contains("reporteTarjetaPrueba")) {
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                    if (authentication != null && authentication.isAuthenticated()) {
                        Object authenticado = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                        if (authenticado instanceof Usuario) {
                            Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                            if (usuario != null) {
                                Traza traza = new Traza(url, new Date(), accion, usuario);
                                repositorio.insertarTraza(traza);
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            Logger.getLogger(TrazaAspecto.class.getName()).log(Level.SEVERE, null, e);
        }

    }

    private int caso(String contr) {
        return contr.contains("ControladorCama") ? 1 : contr.contains("ControladorConsultorio") ? 2 : contr.contains("ControladorEnfermedadTransmisionSexual") ? 3
                : contr.contains("ControladorEstadistica") ? 4 : contr.contains("ControladorIngreso") ? 5 : contr.contains("ControladorInicio") ? 6
                : contr.contains("ControladorMunicipio") ? 7 : contr.contains("ControladorPaciente") ? 8 : contr.contains("ControladorProvincia") ? 9
                : contr.contains("ControladorReporte") ? 10 : contr.contains("ControladorResponsableMuestra") ? 11 : contr.contains("ControladorSala") ? 12
                : contr.contains("ControladorTarjetaPrueba") ? 13 : contr.contains("ControladorTipoAnticonceptivo") ? 14 : contr.contains("ControladorUsuario") ? 15 : 16;
    }

    private String accion(String cont, String nombreMetodo, String metodo) {
        int caso = caso(cont);
        String accion = "";
        switch (caso) {
            case 1:
                if (nombreMetodo.contains("listar")) {
                    if (nombreMetodo.equals("listarGrupos")) {
                        accion = "Listar Grupos";
                    } else {
                        accion = "Listar bases de datos indexadas";
                    }
                } else {
                    accion = crearAccion(metodo, nombreMetodo);
                }
                break;
            case 2:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 3:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 4:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 5:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 6:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 7:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 8:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 9:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 10:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 11:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 12:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 13:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 14:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 15:
                accion = crearAccion(metodo, nombreMetodo);
                break;
            case 16:
                accion = crearAccion(metodo, nombreMetodo);
                break;
        }
        return accion;
    }

    private String crearAccion(String metodo, String controlador) {
        if (metodo.contains("get") || metodo.contains("GET")) {
            return "Listar " + controlador.toLowerCase().substring(controlador.lastIndexOf("/"), controlador.indexOf("[.]"));
        } else if (metodo.contains("put") || metodo.contains("PUT")) {
            return "Modificar " + controlador.toLowerCase().substring(controlador.lastIndexOf("/"), controlador.indexOf("[.]"));
        } else if (metodo.contains("post") || metodo.contains("POST")) {
            return "Insertar " + controlador.toLowerCase().substring(controlador.lastIndexOf("/"), controlador.indexOf("[.]"));
        } else {
            return "Eliminar " + controlador.toLowerCase().substring(controlador.lastIndexOf("/"), controlador.indexOf("[.]"));
        }
    }

    private boolean puedeInsertarse(String url, String metodo) {
        return !(url.contains(".json") && !metodo.contains("get"));
    }
}
