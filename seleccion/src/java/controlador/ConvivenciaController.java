package controlador;

import controladorjpa.ConvivenciaJpaController;
import javax.persistence.PersistenceException;
import modelo.Convivencia;
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
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/admin", "/tecnico"})
public class ConvivenciaController {

    @Autowired
    ConvivenciaJpaController convivenciaJpaController;
    
    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "convivencia.json", method = RequestMethod.POST)
    public ModelAndView insertarConvivencia(@RequestBody Convivencia convivencia) {
        convivenciaJpaController.insertarEntidad(convivencia);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", convivencia);
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "convivencia.json", method = RequestMethod.GET)
    public ModelAndView listarConvivencia() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", convivenciaJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "convivencia.json/{idConvivencia}", method = RequestMethod.PUT)
    public ModelAndView modificarConvivencia(@PathVariable int idConvivencia, @RequestBody Convivencia convivencia) {
        ModelMap map = new ModelMap();
        map.put("lista", convivenciaJpaController.actualizarEntidad(idConvivencia, convivencia));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "convivencia.json/{idConvivencia}", method = RequestMethod.DELETE)
    public ModelAndView eliminarConvivencia(@PathVariable int idConvivencia) {
        convivenciaJpaController.eliminarEntidad(idConvivencia);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @ExceptionHandler(Exception.class)
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
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), modelMap);
    }

    private String tratarMensaje(JpaSystemException e) {
        String message = e.getMostSpecificCause().getMessage();
        if (message.contains("nombre_unico")) {
            return "Ya existe este nombre de facultad.";
        } else if (message.contains("fk_doctor_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene doctores.";
        } else if (message.contains("fk_departamento_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene departamentos.";
        } else if (message.contains("fk_usuario_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene usuarios.";
        } else if (message.contains("fk_maestria_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene maestrias.";
        } else {
            return message;
        }
    }
}
