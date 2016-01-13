package controlador;

import controladorjpa.SolicitudJpaController;
import javax.persistence.PersistenceException;
import modelo.Solicitud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/tecnico"})
public class SolicitudController {

    @Autowired
    SolicitudJpaController solicitudJpaController;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "solicitud.json", method = RequestMethod.POST)
    public ModelAndView insertarSolicitud(@RequestBody Solicitud solicitud) {
        solicitudJpaController.insertarEntidad(solicitud);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", solicitud);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), modelMap);
    }

    @RequestMapping(value = "solicitud.json", method = RequestMethod.GET)
    public ModelAndView listarSolicitud() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", solicitudJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), modelMap);
    }

    @RequestMapping(value = "solicitud.json/{idSolicitud}", method = RequestMethod.PUT)
    public ModelAndView modificarSolicitud(@PathVariable int idSolicitud, @RequestBody Solicitud solicitud) {
        ModelMap map = new ModelMap();
        map.put("lista", solicitudJpaController.actualizarEntidad(idSolicitud, solicitud));
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "solicitud.json/{idSolicitud}", method = RequestMethod.DELETE)
    public ModelAndView eliminarSolicitud(@PathVariable int idSolicitud) {
        solicitudJpaController.eliminarEntidad(idSolicitud);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView tratarExcepcion(Exception e) {
        ModelMap modelMap = new ModelMap();
        if (e instanceof JpaSystemException) {
            JpaSystemException jse = (JpaSystemException) e;
            modelMap.put("msg", tratarMensaje(jse));
        } else if (e instanceof PersistenceException) {
            JpaSystemException exception = new JpaSystemException((PersistenceException) e);
            modelMap.put("msg", tratarMensaje(exception));
        } else {
            modelMap.put("msg", e.getMessage());
        }
        modelMap.put("success", false);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), modelMap);
    }

    private String tratarMensaje(JpaSystemException e) {
        String message = e.getMostSpecificCause().getMessage();
        if (message.contains("nombre_unico")) {
            return "Ya existe este nombre de facultad.";
        } else if (message.contains("fk_doctor_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene doctores.";
        } else if (message.contains("fk_departamento_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene departamentos.";
        } else if (message.contains("fk_usuario_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene usuarios.";
        } else if (message.contains("fk_maestria_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene maestrias.";
        } else {
            return message;
        }
    }
}
