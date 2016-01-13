package controlador;

import controladorjpa.DatosAspiranteJpaController;
import javax.persistence.PersistenceException;
import modelo.DatosAspirante;
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
@RequestMapping(value = {"/tecnico", "psicologo"})
public class DatosAspiranteController {

    @Autowired
    DatosAspiranteJpaController datosAspiranteJpaController;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "datosAspirante.json", method = RequestMethod.POST)
    public ModelAndView insertarDatosAspirante(@RequestBody DatosAspirante datosAspirante) {
        datosAspiranteJpaController.insertarEntidad(datosAspirante);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", datosAspirante);
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "datosAspirante.json", method = RequestMethod.GET)
    public ModelAndView listarDatosAspirante() {
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", datosAspiranteJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "datosAspirante.json/{idDatosAspirante}", method = RequestMethod.PUT)
    public ModelAndView modificarDatosAspirante(@PathVariable int idDatosAspirante, @RequestBody DatosAspirante datosAspirante) {
        ModelMap map = new ModelMap();
        map.put("lista", datosAspiranteJpaController.actualizarEntidad(idDatosAspirante, datosAspirante));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "datosAspirante.json/{idDatosAspirante}", method = RequestMethod.DELETE)
    public ModelAndView eliminarDatosAspirante(@PathVariable int idDatosAspirante) {
        datosAspiranteJpaController.eliminarEntidad(idDatosAspirante);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView tratarExcepcion(Exception e) {
        e.printStackTrace();
        ModelMap modelMap = new ModelMap();
        if (e instanceof JpaSystemException) {
            JpaSystemException jse = (JpaSystemException) e;
            modelMap.put("msg", tratarMensaje(jse.getMostSpecificCause()));
        } else if (e instanceof PersistenceException) {
            JpaSystemException exception = new JpaSystemException((PersistenceException) e);
            modelMap.put("msg", tratarMensaje(exception.getMostSpecificCause()));
        } else {
            modelMap.put("msg", e.getMessage());
        }
        modelMap.put("success", false);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), modelMap);
    }

    private String tratarMensaje(Throwable e) {
        String message = e.getMessage();
        if (message.contains("nombre_unico")) {
            return "Ya existe este nombre de facultad.";
        } else if (message.contains("fk_doctor_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene doctores.";
        } else if (message.contains("fk_departamento_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene departamentos.";
        } else if (message.contains("fk_arm5fsjs2g8acug84tveqswk3")) {
            return "No se puede eliminar el aspirante porque esta relacionado con ";
        } else if (message.contains("fk_13h02m367g8m54fnhosihvq2d")) {
            return "No se puede eliminar esta facultad porque contiene maestrias.";
        } else {
            return message;
        }
    }
}
