/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import controladorjpa.AspiranteJpaController;
import controladorjpa.ControlAspiranteJpaController;
import controladorjpa.CronogramaCursoJpaController;
import controladorjpa.DatosAspiranteJpaController;
import controladorjpa.DocumentoAprobatorioJpaController;
import controladorjpa.EntrevistaIndividualJpaController;
import controladorjpa.ResumenExpedienteJpaController;
import controladorjpa.ResumenSicometricoJpaController;
import controladorjpa.SolicitudJpaController;
import javax.persistence.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import utiles.MapeadorObjetos;

@Controller
public class ReporteController {

    @Autowired
    AspiranteJpaController aspiranteJpaController;

    @Autowired
    ControlAspiranteJpaController controlAspiranteJpaController;

    @Autowired
    CronogramaCursoJpaController cronogramaCursoJpaController;

    @Autowired
    DatosAspiranteJpaController datosAspiranteJpaController;

    @Autowired
    EntrevistaIndividualJpaController individualJpaController;

    @Autowired
    ResumenExpedienteJpaController resumenExpedienteJpaController;

    @Autowired
    ResumenSicometricoJpaController resumenSicometricoJpaController;

    @Autowired
    DocumentoAprobatorioJpaController documentoAprobatorioJpaController;

    @Autowired
    SolicitudJpaController solicitudJpaController;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "/{tipo}/{idAspirante}/controlAspirante", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView controlAspirante(@PathVariable String tipo, @PathVariable int idAspirante) {
        ModelMap map = new ModelMap();
        map.put("datasource", null);
        map.put("controlAspirante", controlAspiranteJpaController.find(idAspirante));
        map.put("format", tipo);
        return new ModelAndView("reporteControlAspirante", map);
    }

    @RequestMapping(value = "/{tipo}/reporteCronogramaCurso", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView cronogramaCurso(@PathVariable String tipo) {
        ModelMap map = new ModelMap();
        map.put("datasource", cronogramaCursoJpaController.listarTodos());
        map.put("format", tipo);
        return new ModelAndView("reporteCronogramaCurso", map);
    }

    @RequestMapping(value = "/{tipo}/{idDatosAspirante}/datosAspirante", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView datosAspirante(@PathVariable String tipo, @PathVariable int idDatosAspirante) {
        ModelMap map = new ModelMap();
        map.put("datasource", null);
        map.put("datosAspirante", datosAspiranteJpaController.find(idDatosAspirante));
        map.put("format", tipo);
        return new ModelAndView("datos", map);
    }

    @RequestMapping(value = "/{tipo}/{idEntrevista}/reporteEntrevistaIndividual", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView entrevistaIndividual(@PathVariable String tipo, @PathVariable int idEntrevista) {
        ModelMap map = new ModelMap();
        map.put("datasource", null);
        map.put("entrevistaIndividual", individualJpaController.find(idEntrevista));
        map.put("format", tipo);
        return new ModelAndView("entrevistaIndividualReporte", map);
    }

    @RequestMapping(value = "/{tipo}/{idResumen}/resumenExpedienteReporte", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView resumenExpediente(@PathVariable String tipo, @PathVariable int idResumen) {
        ModelMap map = new ModelMap();
        map.put("datasource", null);
        map.put("resumenExpediente", resumenExpedienteJpaController.find(idResumen));
        map.put("format", tipo);
        return new ModelAndView("resumenExpedienteReporte", map);
    }

    @RequestMapping(value = "/{tipo}/{idResumen}/resumenSicometrico", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView resumenSicometrico(@PathVariable String tipo, @PathVariable int idResumen) {
        ModelMap map = new ModelMap();
        map.put("datasource", null);
        map.put("resumenSicometrico", resumenSicometricoJpaController.find(idResumen));
        map.put("format", tipo);
        return new ModelAndView("resumenSicometrico", map);
    }

    @RequestMapping(value = "/{tipo}/{idSolicitud}/solicitudEmpleo", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView solicitudEmpleo(@PathVariable String tipo, @PathVariable int idSolicitud) {
        ModelMap map = new ModelMap();
        map.put("datasource", null);
        map.put("solicitud", solicitudJpaController.find(idSolicitud));
        map.put("format", tipo);
        return new ModelAndView("solicitudEmpleo", map);
    }

    @RequestMapping(value = "/{tipo}/{idResumen}/documentoAprobatorio", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView documentoAprobatorio(@PathVariable String tipo, @PathVariable int idResumen) {
        ModelMap map = new ModelMap();
        map.put("datasource", null);
        map.put("documentoAprobatorio", documentoAprobatorioJpaController.find(idResumen));
        map.put("format", tipo);
        return new ModelAndView("documentoAprobatorio", map);
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
        } else {
            return message;
        }
    }
}
