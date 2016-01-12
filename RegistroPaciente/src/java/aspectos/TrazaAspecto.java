package aspectos;

import clases.Traza;
import clases.Usuario;
import controladoresJpa.TrazaJpaController;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
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

    @AfterReturning("execution(* controladoresJpa.*.*(..))")
    public void hacerAccessCheck() {
        try {
            String nombreMetodo = ""/*punto.getSignature().getName()*/;
            String nombreControlador = ""/*punto.getTarget().getClass().getName()*/;
            String metodo = request.getMethod();
            String accion = accion(nombreControlador, nombreMetodo, metodo);
            String url = request.getRequestURI();
            if (!url.contains("guardarParamentos.json") && !url.contains("instalar.htm")) {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (authentication != null && authentication.isAuthenticated()) {
                    Object authenticado = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                    if (authenticado instanceof Usuario) {
                        Usuario usuario = (Usuario) authenticado;
                        Traza traza = new Traza(url, new Date(), accion, usuario);
                        repositorio.insertarEntidad(traza);
                    }
                }
            }
        } catch (Exception e) {
            Logger.getLogger(TrazaAspecto.class.getName()).log(Level.SEVERE, null, e);
        }

    }

    private int caso(String contr) {
        return contr.contains("ControladorAreaSalud") ? 1 : contr.contains("ControladorCausa") ? 2 : contr.contains("ControladorEspecialidad") ? 3
                : contr.contains("ControladorEspecialista") ? 4 : contr.contains("ControladorGrupo") ? 5 : contr.contains("ControladorListaEspera") ? 6
                : contr.contains("ControladorOperacion") ? 7 : contr.contains("ControladorOperacionRecurso") ? 8 : contr.contains("ControladorPaciente") ? 9
                : contr.contains("ControladorRecurso") ? 10 : contr.contains("ControladorTarjetaEstiba") ? 11 : contr.contains("ControladorUsuario") ? 12 : 13;
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
                    accion = crearAccion(metodo, cont);
                }
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
        }
        return accion;
    }

    private String crearAccion(String metodo, String controlador) {
        if (metodo.contains("get")) {
            return "Listar " + controlador.toLowerCase();
        } else if (metodo.contains("put")) {
            return "Modificar " + controlador.toLowerCase();
        } else if (metodo.contains("pos")) {
            return "Insertar " + controlador.toLowerCase();
        } else {
            return "Eliminar " + controlador.toLowerCase();
        }
    }
}
