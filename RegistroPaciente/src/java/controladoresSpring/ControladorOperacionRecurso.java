package controladoresSpring;

import clases.TipoOperacionRecurso;
import clases.TipoOperacionRecursoPK;
import controladoresJpa.TipoOperacionRecursoJpaController;
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
public class ControladorOperacionRecurso {

    @Autowired
    TipoOperacionRecursoJpaController jpaController;

    @RequestMapping(value = "/operacionRecurso.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarOperacionRecursos(int start, int limit) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/operacionRecurso.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarOperacionRecurso(@RequestBody TipoOperacionRecurso objetoEntidad) {
        jpaController.insertarEntidad(objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoEntidad);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/operacionRecurso.json/{idOperacionRecurso}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarOperacionRecurso(@PathVariable String idOperacionRecurso, @RequestBody TipoOperacionRecurso objetoEntidad) {
        TipoOperacionRecursoPK operacionRecursoPK = jpaController.crearClavePrimaria(idOperacionRecurso);
        TipoOperacionRecurso objetoBD = jpaController.actualizarEntidad(operacionRecursoPK, objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/operacionRecurso.json/{idOperacionRecurso}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarOperacionRecurso(@PathVariable String idOperacionRecurso) {
        TipoOperacionRecursoPK operacionRecursoPK = jpaController.crearClavePrimaria(idOperacionRecurso);
        jpaController.eliminarEntidad(operacionRecursoPK);
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
