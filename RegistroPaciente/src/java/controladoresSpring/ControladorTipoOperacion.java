package controladoresSpring;

import clases.TipoOperacion;
import clases.TipoOperacionRecurso;
import clasesUtiles.MapeadorObjetos;
import controladoresJpa.TipoOperacionJpaController;
import controladoresJpa.TipoOperacionRecursoJpaController;
import java.util.HashMap;
import java.util.List;
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
public class ControladorTipoOperacion {

    @Autowired
    TipoOperacionJpaController jpaController;

    @Autowired
    TipoOperacionRecursoJpaController controller;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "/tipoOperacion.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarTipoOperacions(int start, int limit, String parametros) {
        ModelMap map = new ModelMap();
        if (parametros == null) {
            map.put("success", true);
            map.put("lista", jpaController.listarTodos(start, limit));
            map.put("total", jpaController.getCantidad());
        } else {
            HashMap<String, Object> hashMap = mapeadorObjetos.readValue(parametros, HashMap.class);
            map.put("success", true);
            map.put("lista", jpaController.findWhereAND(hashMap));
        }
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/tipoOperacion.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarTipoOperacion(@RequestBody TipoOperacion objetoEntidad) {
        jpaController.insertarEntidad(objetoEntidad);
        List<TipoOperacionRecurso> tipoOperacionRecursos = objetoEntidad.getTipoOperacionRecursos();
        for (TipoOperacionRecurso tipoOperacionRecurso : tipoOperacionRecursos) {
            tipoOperacionRecurso.setTipoOperacion(objetoEntidad);
            tipoOperacionRecurso.crearClavePrimaria();
            controller.insertarEntidad(tipoOperacionRecurso);
        }
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoEntidad);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/tipoOperacion.json/{idTipoOperacion}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarTipoOperacion(@PathVariable int idTipoOperacion, @RequestBody TipoOperacion objetoEntidad) {
        TipoOperacion objetoBD = jpaController.actualizarEntidad(idTipoOperacion, objetoEntidad);
        List<TipoOperacionRecurso> tipoOperacionRecursos = objetoEntidad.getTipoOperacionRecursos();
        for (TipoOperacionRecurso tipoOperacionRecurso : tipoOperacionRecursos) {
            tipoOperacionRecurso.setTipoOperacion(objetoEntidad);
            tipoOperacionRecurso.crearClavePrimaria();
            controller.actualizarEntidad(tipoOperacionRecurso.getOperacionRecursoPK(), tipoOperacionRecurso);
        }
        objetoBD.setTipoOperacionRecursos(tipoOperacionRecursos);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/tipoOperacion.json/{idTipoOperacion}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarTipoOperacion(@PathVariable int idTipoOperacion) {
        jpaController.eliminarEntidad(idTipoOperacion);
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
