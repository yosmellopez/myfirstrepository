package aspectos;

import controladorjpa.TrazaJpaController;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import modelo.Traza;
import modelo.Usuario;
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
    TrazaJpaController repositorio;

    @AfterReturning("execution(* controlador.*.*(..))")
    public void doAccessCheck(JoinPoint punto) {
        try {
            String nombreControlador = punto.getTarget().getClass().getName();
            String nombreMetodo = punto.getSignature().getName();
            String metodo = request.getMethod();
            String accion = accion(nombreControlador, nombreMetodo, metodo);
            String url = request.getRequestURI();
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                Object authenticado = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                if (authenticado instanceof Usuario) {
                    Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                    if (usuario != null) {
                        if (noEstaEnLista(url)) {
                            Traza traza = new Traza(url, new Date(), accion, usuario);
                            repositorio.insertarEntidad(traza);
                        }
                    }
                }
            }
        } catch (Exception e) {
            Logger.getLogger(TrazaAspecto.class.getName()).log(Level.SEVERE, null, e);
        }

    }

    private boolean noEstaEnLista(String url) {
        return !url.contains("rol.json") && !url.contains("pertinencia.json") && !url.contains("tipos.json") && !url.contains("categoriaCientifica.json") && !url.contains("categoriaDocente.json");
    }

    private int caso(String contr) {
        return contr.contains("ArchivoControl") ? 1 : contr.contains("BalanceControl") ? 2 : contr.contains("ClaustroControl") ? 3
                : contr.contains("ContactoControl") ? 4 : contr.contains("DepartamentoControl") ? 5 : contr.contains("DoctorControl") ? 6
                                        : contr.contains("FacultadControl") ? 7 : contr.contains("FormacionCientificaControl") ? 8 : contr.contains("MaestriaClaustroControl") ? 9
                                                                : contr.contains("MaestriaControl") ? 10 : contr.contains("PostgradoControl") ? 11 : contr.contains("ReporteControl") ? 12
                                                                                        : contr.contains("SedeControl") ? 13 : contr.contains("UsuarioControl") ? 14 : contr.contains("CorreoControl") ? 15
                                                                                                                : contr.contains("DestinatarioControl") ? 16 : contr.contains("NoticiaControl") ? 17
                                                                                                                                : contr.contains("NotificacionControl") ? 18 : 19;
    }

    private String accion(String cont, String nombreMetodo, String metodo) {
        int caso = caso(cont);
        String accion = "";
        switch (caso) {
            case 1:
                accion = crearAccion(metodo, cont);
                break;
            case 2:
                accion = crearAccion(metodo, cont);
                break;
            case 3:
                accion = crearAccion(metodo, cont);
                break;
            case 4:
                accion = crearAccion(metodo, cont);
                break;
            case 5:
                accion = crearAccion(metodo, cont);
                break;
            case 6:
                accion = crearAccion(metodo, cont);
                break;
            case 7:
                accion = crearAccion(metodo, cont);
                break;
            case 8:
                accion = crearAccion(metodo, cont);
                break;
            case 9:
                accion = crearAccion(metodo, cont);
                break;
            case 10:
                accion = crearAccion(metodo, cont);
                break;
            case 11:
                accion = crearAccion(metodo, cont);
                break;
            case 12:
                accion = crearAccion(metodo, cont);
                break;
            case 13:
                accion = crearAccion(metodo, cont);
                break;
            case 14:
                if (nombreMetodo.contains("listarTrazas")) {
                    accion = "Listar Trazas";
                } else {
                    accion = crearAccion(metodo, cont);
                }
                break;
            case 15:
                accion = crearAccion(metodo, cont);
                break;
            case 16:
                accion = crearAccion(metodo, cont);
                break;
            case 17:
                accion = crearAccion(metodo, cont);
                break;
            case 18:
                accion = crearAccion(metodo, cont);
                break;
            case 19:
                accion = crearAccion(metodo, cont);
                break;
        }
        return accion;
    }

    private String crearAccion(String metodo, String controlador) {
        if (metodo.contains("get") || metodo.contains("GET")) {
            return "Listar " + limpiarControlador(controlador.toLowerCase()) + "s";
        } else if (metodo.contains("put") || metodo.contains("PUT")) {
            return "Modificar " + limpiarControlador(controlador.toLowerCase());
        } else if (metodo.contains("post") || metodo.contains("POST")) {
            return "Insertar " + limpiarControlador(controlador.toLowerCase());
        } else {
            return "Eliminar " + limpiarControlador(controlador.toLowerCase());
        }
    }

    private String limpiarControlador(String nombre) {
        String[] split = nombre.split("[.]");
        String a = split[1];
        a = a.substring(0, a.indexOf("control"));
        return a;
    }
}
