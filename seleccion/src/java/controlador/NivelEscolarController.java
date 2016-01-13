package controlador;

import controladorjpa.NivelEscolarJpaController;
import javax.persistence.PersistenceException;
import modelo.NivelEscolar;
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
public class NivelEscolarController {

    @Autowired
    NivelEscolarJpaController nivelEscolarJpaController;
    
    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "nivelEscolar.json", method = RequestMethod.POST)
    public ModelAndView insertarNivelEscolar(@RequestBody NivelEscolar nivelEscolar) {
        nivelEscolarJpaController.insertarEntidad(nivelEscolar);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", nivelEscolar);
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "nivelEscolar.json", method = RequestMethod.GET)
    public ModelAndView listarNivelEscolar() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", nivelEscolarJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "nivelEscolar.json/{idNivelEscolar}", method = RequestMethod.PUT)
    public ModelAndView modificarNivelEscolar(@PathVariable int idNivelEscolar, @RequestBody NivelEscolar nivelEscolar) {
        ModelMap map = new ModelMap();
        map.put("lista", nivelEscolarJpaController.actualizarEntidad(idNivelEscolar, nivelEscolar));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "nivelEscolar.json/{idNivelEscolar}", method = RequestMethod.DELETE)
    public ModelAndView eliminarNivelEscolar(@PathVariable int idNivelEscolar) {
        nivelEscolarJpaController.eliminarEntidad(idNivelEscolar);
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
