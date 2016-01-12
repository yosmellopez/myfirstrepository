package controladoresSpring;

import clases.Recurso;
import clases.TarjetaEstiba;
import controladoresJpa.RecursoJpaController;
import controladoresJpa.RolJpaController;
import controladoresJpa.TarjetaEstibaJpaController;
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
public class ControladorTarjetaEstiba {
    
    @Autowired
    TarjetaEstibaJpaController jpaController;
    
    @Autowired
    RecursoJpaController recursoJpaController;
    
    @RequestMapping(value = "/tarjetaEstiba.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarTarjetaEstibas(int start, int limit) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }
    
    @RequestMapping(value = "/tarjetaEstiba.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarTarjetaEstiba(@RequestBody TarjetaEstiba objetoEntidad) {
        Recurso recurso = objetoEntidad.getRecurso();
        Recurso existeRecurso = recursoJpaController.existeRecurso(recurso.getNombre());
        if (existeRecurso != null) {
            objetoEntidad.setRecurso(existeRecurso);
        }
        jpaController.insertarEntidad(objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoEntidad);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }
    
    @RequestMapping(value = "/tarjetaEstiba.json/{idTarjetaEstiba}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarTarjetaEstiba(@PathVariable int idTarjetaEstiba, @RequestBody TarjetaEstiba objetoEntidad) {
        TarjetaEstiba objetoBD = jpaController.actualizarEntidad(idTarjetaEstiba, objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }
    
    @RequestMapping(value = "/tarjetaEstiba.json/{idTarjetaEstiba}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarTarjetaEstiba(@PathVariable int idTarjetaEstiba) {
        jpaController.eliminarEntidad(idTarjetaEstiba);
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
