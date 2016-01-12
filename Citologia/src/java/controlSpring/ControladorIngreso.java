package controlSpring;

import entidades.Cama;
import entidades.Ingreso;
import entidades.Paciente;
import java.util.HashMap;
import java.util.List;
import javax.persistence.PersistenceException;
import jpa.CamaRepositorio;
import jpa.IngresoRepositorio;
import jpa.PacienteJpaController;
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
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/admin", "/secretaria", "/usuario"})
public class ControladorIngreso {

    @Autowired
    IngresoRepositorio ingresoRepositorio;

    @Autowired
    PacienteJpaController pacienteRepositorio;

    @Autowired
    CamaRepositorio camaRepositorio;

    @RequestMapping(value = "ingreso.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelMap listarIngresosPag(int start, int limit, String parametros) {
        List<Ingreso> listaIngresos;
        if (parametros != null) {
            MapeadorObjetos mapper = new MapeadorObjetos();
            HashMap<String, Object> readValue = mapper.readValue(parametros, HashMap.class);
            listaIngresos = ingresoRepositorio.findWhereAND(readValue);
        } else {
            listaIngresos = ingresoRepositorio.listarTodos(start, limit);
        }
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", listaIngresos);
        modelMap.put("total", ingresoRepositorio.getCantidad());
        modelMap.put("success", true);
        return modelMap;
    }

    @RequestMapping(value = "ingreso.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelMap insertarIngreso(@RequestBody Ingreso ingreso) {
        Paciente paciente = pacienteRepositorio.find(ingreso.getPaciente().getIdPaciente());
        Integer idPaciente = ingreso.getPaciente().getIdPaciente();
        Cama cama = camaRepositorio.find(ingreso.getCama().getIdCama());
        Integer idCama = ingreso.getCama().getIdCama();
        cama.setHabilitada(false);
        pacienteRepositorio.actualizarEntidad(idPaciente, paciente);
        camaRepositorio.actualizarEntidad(idCama, cama);
        ingresoRepositorio.insertarEntidad(ingreso);
        ModelMap modelMap = new ModelMap();
        modelMap.put("lista", ingreso);
        modelMap.put("success", true);
        return modelMap;
    }

    @RequestMapping(value = "/ingreso.json/{idIngreso}", method = RequestMethod.GET)
    @ResponseBody
    public ModelMap buscarIngreso(@PathVariable int idIngreso) {
        Ingreso ingreso = ingresoRepositorio.find(idIngreso);
        ModelMap modelMap = new ModelMap();
        modelMap.put("success", true);
        modelMap.put("lista", ingreso);
        return modelMap;
    }

    @RequestMapping(value = "/ingreso.json/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarIngreso(@PathVariable int id, @RequestBody Ingreso ingreso) {
        Paciente paciente = pacienteRepositorio.find(ingreso.getPaciente().getIdPaciente());
        paciente.setIngresado(true);
        Cama cama = ingreso.getCama();
        cama.setHabilitada(false);
        pacienteRepositorio.actualizarEntidad(paciente.getIdPaciente(), paciente);
        camaRepositorio.actualizarEntidad(cama.getIdCama(), cama);
        Ingreso actualizarEntidad = ingresoRepositorio.actualizarEntidad(id, ingreso);
        ModelMap modelMap = new ModelMap();
        modelMap.put("success", true);
        modelMap.put("lista", actualizarEntidad);
        return modelMap;
    }

    @RequestMapping(value = "/ingresos.json/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarIngreso(@PathVariable int id) {
        Integer idPaciente = ingresoRepositorio.find(id).getPaciente().getIdPaciente();
        Paciente paciente = pacienteRepositorio.find(idPaciente);
        paciente.setIngresado(false);
        Integer idCama = ingresoRepositorio.find(id).getCama().getIdCama();
        Cama cama = camaRepositorio.find(idCama);
        cama.setHabilitada(false);
        ingresoRepositorio.eliminarEntidad(id);
        camaRepositorio.actualizarEntidad(idCama, cama);
        pacienteRepositorio.actualizarEntidad(idPaciente, paciente);

        ModelMap modelMap = new ModelMap();
        modelMap.put("success", true);
        return modelMap;
    }

    @ResponseBody
    @ExceptionHandler(Exception.class)
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
        if (message.contains("doctor_ci_unico")) {
            return "Ya existe este número de identidad.";
        } else {
            return message;
        }
    }
}
