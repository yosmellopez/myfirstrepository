package controlSpring;

import entidades.TipoAnticonceptivo;
import javax.persistence.PersistenceException;
import jpa.TipoAnticonceptivoJpaController;
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
public class ControladorTipoAnticonceptivo {

    @Autowired
    TipoAnticonceptivoJpaController jpaController;

    @Autowired
    EncriptadorContrasena encriptador;

    @RequestMapping(value = "/tipoAnticonceptivo.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarTipoAnticonceptivos(int start, int limit) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/tipoAnticonceptivo.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarTipoAnticonceptivo(@RequestBody TipoAnticonceptivo tipoAnticonceptivo) {
        jpaController.insertarEntidad(tipoAnticonceptivo);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", tipoAnticonceptivo);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/tipoAnticonceptivo.json/{idTipoAnticonceptivo}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarTipoAnticonceptivo(@PathVariable int idTipoAnticonceptivo, @RequestBody TipoAnticonceptivo tipoAnticonceptivo) {
        TipoAnticonceptivo objetoBD = jpaController.actualizarEntidad(idTipoAnticonceptivo, tipoAnticonceptivo);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/tipoAnticonceptivo.json/{idTipoAnticonceptivo}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarTipoAnticonceptivo(@PathVariable int idTipoAnticonceptivo) {
        jpaController.eliminarEntidad(idTipoAnticonceptivo);
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
