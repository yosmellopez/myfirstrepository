package controlador;

import controladorjpa.AspiranteJpaController;
import controladorjpa.DatosAspiranteJpaController;
import controladorjpa.ResumenExpedienteJpaController;
import java.util.HashMap;
import javax.persistence.PersistenceException;
import modelo.Aspirante;
import modelo.DatosAspirante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
public class AspiranteController {

    @Autowired
    AspiranteJpaController aspiranteJpaController;

    @Autowired
    DatosAspiranteJpaController datosAspiranteJpaController;

    @Autowired
    ResumenExpedienteJpaController jpaController;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "aspirante.json", method = RequestMethod.POST)
    public ModelAndView insertarAspirante(@RequestBody Aspirante aspirante) {
        DatosAspirante datosAspirante = aspirante.getDatosAspirante();
        datosAspirante.setAspirante(aspirante);
        aspiranteJpaController.insertarEntidad(aspirante);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", aspirante);
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
    }

    @RequestMapping(value = "aspirante.json", method = RequestMethod.GET)
    public ModelAndView listarAspirante(int start, int limit, String parametros, ModelMap map) {
        if (parametros != null) {
            HashMap hashMap = mapeadorObjetos.readValue(parametros, HashMap.class);
            map.put("lista", aspiranteJpaController.findWhereAND(hashMap));
            map.put("total", aspiranteJpaController.getCantidad());
        } else {
            map.put("success", true);
            map.put("lista", aspiranteJpaController.listarTodos(start, limit));
            map.put("total", aspiranteJpaController.getCantidad());
        }
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "aspirante.json/{idAspirante}", method = RequestMethod.PUT)
    public ModelAndView modificarAspirante(@PathVariable int idAspirante, @RequestBody Aspirante aspirante) {
        DatosAspirante datosAspirante = aspirante.getDatosAspirante();
        Aspirante find = aspiranteJpaController.find(idAspirante);
        datosAspirante.setAspirante(find);
        if (datosAspirante.getIdDatosAspirante() == null) {
            datosAspiranteJpaController.insertarEntidad(datosAspirante);
        } else {
            datosAspiranteJpaController.actualizarEntidad(datosAspirante.getIdDatosAspirante(), datosAspirante);
        }
        ModelMap map = new ModelMap();
        map.put("lista", aspiranteJpaController.actualizarEntidad(idAspirante, aspirante));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "aspirante.json/{idAspirante}", method = RequestMethod.DELETE)
    public ModelAndView eliminarAspirante(@PathVariable int idAspirante) {
        aspiranteJpaController.eliminarEntidad(idAspirante);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView tratarExcepcion(Exception e) {
        ModelMap modelMap = new ModelMap();
        if (e instanceof JpaSystemException) {
            JpaSystemException jse = (JpaSystemException) e;
            modelMap.put("msg", tratarMensaje(jse.getMostSpecificCause()));
        } else if (e instanceof PersistenceException) {
            JpaSystemException exception = new JpaSystemException((PersistenceException) e);
            modelMap.put("msg", tratarMensaje(exception.getMostSpecificCause()));
        } else if (e instanceof DataIntegrityViolationException) {
            DataIntegrityViolationException exception = (DataIntegrityViolationException) e;
            modelMap.put("msg", tratarMensaje(exception.getMostSpecificCause()));
        } else {
            modelMap.put("msg", e.getMessage());
        }
        modelMap.put("success", false);
        modelMap.put("excepcion", e.toString());
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
