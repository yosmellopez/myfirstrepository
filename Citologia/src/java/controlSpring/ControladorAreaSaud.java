package controlSpring;

import entidades.AreaSalud;
import javax.persistence.PersistenceException;
import jpa.AreaSaludJpaController;
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

//Indica que esto es un controlador
@Controller
//Indica que si la URL contiene admin o secretaria o usuario este controlador se ejecutara
@RequestMapping(value = {"/admin", "/secretaria", "/usuario"})
public class ControladorAreaSaud {

    //Se inyecta un bean
    @Autowired
    AreaSaludJpaController jpaController;

    @Autowired
    EncriptadorContrasena encriptador;

    @RequestMapping(value = "/areaSalud.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarAreaSaluds(int start, int limit) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/areaSalud.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarAreaSalud(@RequestBody AreaSalud areaSalud) {
        jpaController.insertarEntidad(areaSalud);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", areaSalud);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/areaSalud.json/{idAreaSalud}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarAreaSalud(@PathVariable int idAreaSalud, @RequestBody AreaSalud areaSalud) {
        AreaSalud objetoBD = jpaController.actualizarEntidad(idAreaSalud, areaSalud);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/areaSalud.json/{idAreaSalud}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarAreaSalud(@PathVariable int idAreaSalud) {
        jpaController.eliminarEntidad(idAreaSalud);
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
        } else if (message.contains("fk_e72xemmdak0654msfpum97a4f")) {
            return "No se puede eliminar esta área de salud porque se está referenciada desde un consultorio.";
        } else {
            return message;
        }
    }

}
