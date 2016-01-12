package controladoresSpring;

import clases.Operacion;
import clases.Recurso;
import clases.TarjetaEstiba;
import clases.TipoOperacion;
import clases.TipoOperacionRecurso;
import clasesUtiles.MapeadorObjetos;
import controladoresJpa.OperacionJpaController;
import controladoresJpa.RecursoJpaController;
import controladoresJpa.TarjetaEstibaJpaController;
import controladoresJpa.TipoOperacionJpaController;
import java.util.ArrayList;
import java.util.Date;
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
public class ControladorOperacion {

    @Autowired
    OperacionJpaController jpaController;

    @Autowired
    TipoOperacionJpaController operacionJpaController;

    @Autowired
    RecursoJpaController recursoJpaController;

    @Autowired
    TarjetaEstibaJpaController estibaJpaController;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "/operacion.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarOperacions(int start, int limit, String parametros) {
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

    @RequestMapping(value = "/operacion.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarOperacion(@RequestBody Operacion objetoEntidad) {
        TipoOperacion tipoOperacion = objetoEntidad.getTipoOperacion();
        TipoOperacion operacionTipoBD = operacionJpaController.find(tipoOperacion.getIdTipoOperacion());
        List<TipoOperacionRecurso> tipoOperacionRecursos = operacionTipoBD.getTipoOperacionRecursos();
        String mensaje = "";
        boolean valido = true;
        List<TarjetaEstiba> estibas = new ArrayList<>();
        for (TipoOperacionRecurso tipoOperacionRecurso : tipoOperacionRecursos) {
            Recurso recurso = tipoOperacionRecurso.getRecurso();
            int cantidadRestanteRecurso = recursoJpaController.cantidadRestanteRecurso(recurso);
            if (cantidadRestanteRecurso > tipoOperacionRecurso.getCantidad()) {
                TarjetaEstiba estiba = new TarjetaEstiba(tipoOperacionRecurso.getCantidad(), new Date(), false, recurso);
                estibas.add(estiba);
            } else {
                valido = false;
                mensaje += "No se pudo insertar la operacion porque el recurso" + recurso.getNombre();
            }
        }
        ModelMap map = new ModelMap();
        if (valido) {
            jpaController.insertarEntidad(objetoEntidad);
            for (TarjetaEstiba estiba : estibas) {
                estibaJpaController.insertarEntidad(estiba);
            }
            map.put("success", true);
            map.put("lista", objetoEntidad);
            return new ModelAndView(new MappingJackson2JsonView(), map);
        } else {
            map.put("success", false);
            map.put("msg", mensaje);
            return new ModelAndView(new MappingJackson2JsonView(), map);
        }
    }

    @RequestMapping(value = "/operacion.json/{idOperacion}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarOperacion(@PathVariable int idOperacion, @RequestBody Operacion objetoEntidad) {
        Operacion objetoBD = jpaController.actualizarEntidad(idOperacion, objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/operacion.json/{idOperacion}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarOperacion(@PathVariable int idOperacion) {
        jpaController.eliminarEntidad(idOperacion);
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
