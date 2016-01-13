package controlador;

import controladorjpa.ControlAspiranteJpaController;
import javax.persistence.PersistenceException;
import modelo.ControlAspirante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/tecnico"})
public class ControlAspiranteController {

    @Autowired
    ControlAspiranteJpaController controlAspiranteJpaController;
    
    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "controlAspirante.json", method = RequestMethod.POST)
    public ModelAndView insertarControlAspirante(@RequestBody ControlAspirante controlAspirante) {
        controlAspiranteJpaController.insertarEntidad(controlAspirante);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", controlAspirante);
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "controlAspirante.json", method = RequestMethod.GET)
    public ModelAndView listarControlAspirante() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", controlAspiranteJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "controlAspirante.json/{idControlAspirante}", method = RequestMethod.PUT)
    public ModelAndView modificarControlAspirante(@PathVariable int idControlAspirante, @RequestBody ControlAspirante controlAspirante) {
        ModelMap map = new ModelMap();
        map.put("lista", controlAspiranteJpaController.actualizarEntidad(idControlAspirante, controlAspirante));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "controlAspirante.json/{idControlAspirante}", method = RequestMethod.DELETE)
    public ModelAndView eliminarControlAspirante(@PathVariable int idControlAspirante) {
        controlAspiranteJpaController.eliminarEntidad(idControlAspirante);
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
        return message;
    }
}
