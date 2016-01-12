package controlSpring;

import entidades.Cama;
import java.util.HashMap;
import javax.persistence.PersistenceException;
import jpa.CamaJpaController;
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
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/admin", "/secretaria", "/patologo"})
public class ControladorCama {

    @Autowired
    CamaJpaController jpaController;

    @Autowired
    EncriptadorContrasena encriptador;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "/cama.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarCamas(int start, int limit, boolean todos, String parametros, ModelMap map) {
        if (parametros != null) {
            HashMap hashMap = mapeadorObjetos.readValue(parametros, HashMap.class);
            map.put("lista", jpaController.findWhereAND(hashMap));
            map.put("total", jpaController.getCantidad());
        } else {
            map.put("success", true);
            map.put("lista", todos ? jpaController.listarTodos() : jpaController.listarTodos(start, limit));
            map.put("total", jpaController.getCantidad());
        }
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/cama.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarCama(@RequestBody Cama cama) {
        jpaController.insertarEntidad(cama);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", cama);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/cama.json/{idCama}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarCama(@PathVariable int idCama, @RequestBody Cama cama) {
        Cama objetoBD = jpaController.actualizarEntidad(idCama, cama);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/cama.json/{idCama}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarCama(@PathVariable int idCama) {
        jpaController.eliminarEntidad(idCama);
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
