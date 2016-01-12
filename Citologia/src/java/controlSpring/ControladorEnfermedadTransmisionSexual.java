package controlSpring;

import entidades.EnfermedadTransmisionSexual;
import javax.persistence.PersistenceException;
import jpa.EnfermedadTransmisionSexualJpaController;
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
import utiles.EncriptadorContrasena;

@Controller
@RequestMapping(value = {"/admin", "/secretaria", "/usuario"})
public class ControladorEnfermedadTransmisionSexual {

    @Autowired
    EnfermedadTransmisionSexualJpaController jpaController;

    @Autowired
    EncriptadorContrasena encriptador;

    @RequestMapping(value = "/enfermedadTransmisionSexual.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarEnfermedadTransmisionSexuals(int start, int limit) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/enfermedadTransmisionSexual.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarEnfermedadTransmisionSexual(@RequestBody EnfermedadTransmisionSexual enfermedadTransmisionSexual) {
        jpaController.insertarEntidad(enfermedadTransmisionSexual);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", enfermedadTransmisionSexual);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/enfermedadTransmisionSexual.json/{idEnfermedadTransmisionSexual}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarEnfermedadTransmisionSexual(@PathVariable int idEnfermedadTransmisionSexual, @RequestBody EnfermedadTransmisionSexual enfermedadTransmisionSexual) {
        EnfermedadTransmisionSexual objetoBD = jpaController.actualizarEntidad(idEnfermedadTransmisionSexual, enfermedadTransmisionSexual);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/enfermedadTransmisionSexual.json/{idEnfermedadTransmisionSexual}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarEnfermedadTransmisionSexual(@PathVariable int idEnfermedadTransmisionSexual) {
        jpaController.eliminarEntidad(idEnfermedadTransmisionSexual);
        ModelMap map = new ModelMap();
        map.put("success", true);
        return map;
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ModelMap tratarExcepcion(Exception e) {
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
        return modelMap;
    }

    private String tratarMensaje(JpaSystemException e) {
        String message = e.getMostSpecificCause().getMessage();
        if (message.contains("fk_formacion_cientifica_id_departamento")) {
            return "No se puede eliminar este departamento porque contiene registros de formación científica.";
        } else if (message.contains("fk_postgrado_id_departamento")) {
            return "No se puede eliminar este departamento porque contiene postgrados.";
        } else {
            return message;
        }
    }

}
