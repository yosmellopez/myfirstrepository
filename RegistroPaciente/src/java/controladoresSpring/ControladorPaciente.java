package controladoresSpring;

import clases.Paciente;
import clasesUtiles.MapeadorObjetos;
import controladoresJpa.RolJpaController;
import controladoresJpa.PacienteJpaController;
import java.util.HashMap;
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
public class ControladorPaciente {

    @Autowired
    PacienteJpaController jpaController;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "/paciente.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarPacientes(int start, int limit, String parametros) {
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

    @RequestMapping(value = "/paciente.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarPaciente(@RequestBody Paciente objetoEntidad) {
        jpaController.insertarEntidad(objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoEntidad);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/paciente.json/{idPaciente}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarPaciente(@PathVariable int idPaciente, @RequestBody Paciente objetoEntidad) {
        Paciente objetoBD = jpaController.actualizarEntidad(idPaciente, objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/paciente.json/{idPaciente}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarPaciente(@PathVariable int idPaciente) {
        jpaController.eliminarEntidad(idPaciente);
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
