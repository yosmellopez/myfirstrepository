package controlador;

import controladorjpa.DocumentoAprobatorioJpaController;
import javax.persistence.PersistenceException;
import modelo.DocumentoAprobatorio;
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
public class DocumentoAprobatorioController {

    @Autowired
    DocumentoAprobatorioJpaController documentoAprobatorioJpaController;
    
    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "documentoAprobatorio.json", method = RequestMethod.POST)
    public ModelAndView insertarDocumentoAprobatorio(@RequestBody DocumentoAprobatorio documentoAprobatorio) {
        documentoAprobatorioJpaController.insertarEntidad(documentoAprobatorio);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", documentoAprobatorio);
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "documentoAprobatorio.json", method = RequestMethod.GET)
    public ModelAndView listarDocumentoAprobatorio() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", documentoAprobatorioJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "documentoAprobatorio.json/{idDocumentoAprobatorio}", method = RequestMethod.PUT)
    public ModelAndView modificarDocumentoAprobatorio(@PathVariable int idDocumentoAprobatorio, @RequestBody DocumentoAprobatorio documentoAprobatorio) {
        ModelMap map = new ModelMap();
        map.put("lista", documentoAprobatorioJpaController.actualizarEntidad(idDocumentoAprobatorio, documentoAprobatorio));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "documentoAprobatorio.json/{idDocumentoAprobatorio}", method = RequestMethod.DELETE)
    public ModelAndView eliminarDocumentoAprobatorio(@PathVariable int idDocumentoAprobatorio) {
        documentoAprobatorioJpaController.eliminarEntidad(idDocumentoAprobatorio);
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
