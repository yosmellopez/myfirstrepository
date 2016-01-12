package controladoresSpring;

import clases.Especialidad;
import controladoresJpa.RolJpaController;
import controladoresJpa.EspecialidadJpaController;
import javax.persistence.PersistenceException;
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

@Controller
public class ControladorEspecialidad {

    @Autowired
    EspecialidadJpaController jpaController;

    @RequestMapping(value = "/especialidad.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarEspecialidads(int start, int limit) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/especialidad.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarEspecialidad(@RequestBody Especialidad objetoEntidad) {
        jpaController.insertarEntidad(objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoEntidad);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/especialidad.json/{idEspecialidad}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarEspecialidad(@PathVariable int idEspecialidad, @RequestBody Especialidad objetoEntidad) {
        Especialidad objetoBD = jpaController.actualizarEntidad(idEspecialidad, objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/especialidad.json/{idEspecialidad}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarEspecialidad(@PathVariable int idEspecialidad) {
        jpaController.eliminarEntidad(idEspecialidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        return map;
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
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
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
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
