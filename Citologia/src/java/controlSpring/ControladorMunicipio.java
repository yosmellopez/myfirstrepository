package controlSpring;

import entidades.Municipio;
import javax.persistence.PersistenceException;
import jpa.MunicipioJpaController;
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

@Controller
@RequestMapping(value = {"/admin", "/secretaria", "/usuario"})
public class ControladorMunicipio {

    @Autowired
    MunicipioJpaController jpaController;

    @Autowired
    EncriptadorContrasena encriptador;

    @RequestMapping(value = "/municipio.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarMunicipios(int start, int limit, boolean municipiosTodos) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", municipiosTodos ? jpaController.listarTodos() : jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/municipio.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarMunicipio(@RequestBody Municipio municipio) {
        jpaController.insertarEntidad(municipio);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", municipio);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/municipio.json/{idMunicipio}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarMunicipio(@PathVariable int idMunicipio, @RequestBody Municipio municipio) {
        Municipio objetoBD = jpaController.actualizarEntidad(idMunicipio, municipio);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/municipio.json/{idMunicipio}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarMunicipio(@PathVariable int idMunicipio) {
        jpaController.eliminarEntidad(idMunicipio);
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
        if (message.contains("municipiounico")) {
            return "Ya existe un municipio con ese nombre.";
        } else if (message.contains("fk_postgrado_id_departamento")) {
            return "No se puede eliminar este departamento porque contiene postgrados.";
        } else {
            return message;
        }
    }

}
