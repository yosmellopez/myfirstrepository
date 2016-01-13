package controlador;

import controladorjpa.IntegracionRevolucionariaJpaController;
import javax.persistence.PersistenceException;
import modelo.IntegracionRevolucionaria;
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
@RequestMapping(value = {"/admin", "/psicologo", "/tecnico"})
public class IntegracionRevolucionariaController {

    @Autowired
    IntegracionRevolucionariaJpaController integracionRevolucionariaJpaController;
    
    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "integracionRevolucionaria.json", method = RequestMethod.POST)
    public ModelAndView insertarIntegracionRevolucionaria(@RequestBody IntegracionRevolucionaria integracionRevolucionaria) {
        integracionRevolucionariaJpaController.insertarEntidad(integracionRevolucionaria);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", integracionRevolucionaria);
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "integracionRevolucionaria.json", method = RequestMethod.GET)
    public ModelAndView listarIntegracionRevolucionaria() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", integracionRevolucionariaJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "integracionRevolucionaria.json/{idIntegracionRevolucionaria}", method = RequestMethod.PUT)
    public ModelAndView modificarIntegracionRevolucionaria(@PathVariable int idIntegracionRevolucionaria, @RequestBody IntegracionRevolucionaria integracionRevolucionaria) {
        ModelMap map = new ModelMap();
        map.put("lista", integracionRevolucionariaJpaController.actualizarEntidad(idIntegracionRevolucionaria, integracionRevolucionaria));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "integracionRevolucionaria.json/{idIntegracionRevolucionaria}", method = RequestMethod.DELETE)
    public ModelAndView eliminarIntegracionRevolucionaria(@PathVariable int idIntegracionRevolucionaria) {
        integracionRevolucionariaJpaController.eliminarEntidad(idIntegracionRevolucionaria);
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
