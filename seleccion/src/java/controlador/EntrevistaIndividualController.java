package controlador;

import controladorjpa.EntrevistaIndividualJpaController;
import controladorjpa.ResidenciaJpaController;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.PersistenceException;
import modelo.EntrevistaIndividual;
import modelo.Residencia;
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
@RequestMapping(value = {"/tecnico"})
public class EntrevistaIndividualController {

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @Autowired
    EntrevistaIndividualJpaController entrevistaIndividualJpaController;

    @Autowired
    ResidenciaJpaController residenciaJpaController;

    @RequestMapping(value = "entrevistaIndividual.json", method = RequestMethod.POST)
    public ModelAndView insertarEntrevistaIndividual(@RequestBody EntrevistaIndividual entrevistaIndividual) {
//        List<Residencia> residencias = entrevistaIndividual.getResidencias();
//        List<Residencia> residenciasNuevas = new ArrayList<>();
//        for (Residencia residencia : residencias) {
//            residenciasNuevas.add(residenciaJpaController.find(residencia.getIdResidencia()));
//        }
//        entrevistaIndividual.setResidencias(residenciasNuevas);
        entrevistaIndividualJpaController.insertarEntidad(entrevistaIndividual);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", entrevistaIndividual);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), modelMap);
    }

    @RequestMapping(value = "entrevistaIndividual.json", method = RequestMethod.GET)
    public ModelAndView listarEntrevistaIndividual() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", entrevistaIndividualJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), modelMap);
    }

    @RequestMapping(value = "entrevistaIndividual.json/{idEntrevistaIndividual}", method = RequestMethod.PUT)
    public ModelAndView modificarEntrevistaIndividual(@PathVariable int idEntrevistaIndividual, @RequestBody EntrevistaIndividual entrevistaIndividual) {
        ModelMap map = new ModelMap();
        map.put("lista", entrevistaIndividualJpaController.actualizarEntidad(idEntrevistaIndividual, entrevistaIndividual));
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "entrevistaIndividual.json/{idEntrevistaIndividual}", method = RequestMethod.DELETE)
    public ModelAndView eliminarEntrevistaIndividual(@PathVariable int idEntrevistaIndividual) {
        entrevistaIndividualJpaController.eliminarEntidad(idEntrevistaIndividual);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
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
