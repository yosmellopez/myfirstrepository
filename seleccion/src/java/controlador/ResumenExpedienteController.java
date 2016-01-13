package controlador;

import controladorjpa.AspiranteJpaController;
import controladorjpa.ResumenExpedienteJpaController;
import javax.persistence.PersistenceException;
import modelo.Aspirante;
import modelo.ResumenExpediente;
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
public class ResumenExpedienteController {

    @Autowired
    ResumenExpedienteJpaController resumenExpedienteJpaController;

    @Autowired
    AspiranteJpaController jpaController;
    
    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "resumenExpediente.json", method = RequestMethod.POST)
    public ModelAndView insertarResumenExpediente(@RequestBody ResumenExpediente resumenExpediente) {
        resumenExpedienteJpaController.insertarEntidad(resumenExpediente);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", resumenExpediente);
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "resumenExpediente.json", method = RequestMethod.GET)
    public ModelAndView listarResumenExpediente() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", resumenExpedienteJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "resumenExpediente.json/{idResumenExpediente}", method = RequestMethod.PUT)
    public ModelAndView modificarResumenExpediente(@PathVariable int idResumenExpediente, @RequestBody ResumenExpediente resumenExpediente) {
        ModelMap map = new ModelMap();
        map.put("lista", resumenExpedienteJpaController.actualizarEntidad(idResumenExpediente, resumenExpediente));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "resumenExpediente.json/{idResumenExpediente}", method = RequestMethod.DELETE)
    public ModelAndView eliminarResumenExpediente(@PathVariable int idResumenExpediente) {
        resumenExpedienteJpaController.eliminarEntidad(idResumenExpediente);
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
