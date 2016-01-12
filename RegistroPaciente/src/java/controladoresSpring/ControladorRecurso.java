package controladoresSpring;

import clases.Recurso;
import clases.TarjetaEstiba;
import controladoresJpa.RecursoJpaController;
import controladoresJpa.TarjetaEstibaJpaController;
import java.util.Date;
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
public class ControladorRecurso {

    @Autowired
    RecursoJpaController jpaController;

    @Autowired
    TarjetaEstibaJpaController estibaJpaController;

    @RequestMapping(value = "/recurso.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarRecursos(int start, int limit) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/recurso.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarRecurso(@RequestBody Recurso r) {
        Recurso existeRecurso = jpaController.existeRecurso(r.getNombre());
        if (existeRecurso != null) {
            TarjetaEstiba estiba = new TarjetaEstiba(r.getCantidadRestante(), new Date(), true, existeRecurso);
            existeRecurso.getTarjetasEstibas().add(estiba);
            jpaController.actualizarEntidad(existeRecurso.getIdRecurso(), existeRecurso);
            r = existeRecurso;
        } else {
            TarjetaEstiba estiba = new TarjetaEstiba(r.getCantidadRestante(), new Date(), true, r);
            r.getTarjetasEstibas().add(estiba);
            jpaController.insertarEntidad(r);
        }
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", r);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/recurso.json/{idRecurso}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarRecurso(@PathVariable int idRecurso, @RequestBody Recurso objetoEntidad) {
        List<TarjetaEstiba> tarjetasEstibas = objetoEntidad.getTarjetasEstibas();
        if (!tarjetasEstibas.isEmpty()) {
            Recurso recursoBd = jpaController.find(idRecurso);
            for (TarjetaEstiba tarjetasEstiba : tarjetasEstibas) {
                tarjetasEstiba.setRecurso(recursoBd);
                if (tarjetasEstiba.getIdTarjetaEstiba() != null) {
                    tarjetasEstiba = estibaJpaController.actualizarEntidad(tarjetasEstiba.getIdTarjetaEstiba(), tarjetasEstiba);
                } else {
                    tarjetasEstiba.setFecha(new Date());
                    tarjetasEstiba.setOperacion(true);
                    estibaJpaController.insertarEntidad(tarjetasEstiba);
                }
            }
            recursoBd.setCantidadRestante(objetoEntidad.getCantidadRestante());
            recursoBd.setNombre(objetoEntidad.getNombre());
            objetoEntidad = jpaController.actualizarEntidad(idRecurso, recursoBd);
        } else {
            objetoEntidad = jpaController.actualizarEntidad(idRecurso, objetoEntidad);
        }
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoEntidad);
        return map;
    }

    @RequestMapping(value = "/recurso.json/{idRecurso}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarRecurso(@PathVariable int idRecurso) {
        jpaController.eliminarEntidad(idRecurso);
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
