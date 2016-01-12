package controlSpring;

import entidades.EnfermedadTransmisionSexual;
import entidades.PrimeraCitologia;
import entidades.TarjetaPrueba;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.persistence.PersistenceException;
import jpa.DiagnosticoFinalJpaController;
import jpa.EnfermedadTransmisionSexualJpaController;
import jpa.PrimeraCitologiaJpaController;
import jpa.TarjetaPruebaJpaController;
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
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/admin", "/secretaria", "/usuario"})
public class ControladorTarjetaPrueba {

    @Autowired
    TarjetaPruebaJpaController jpaController;

    @Autowired
    DiagnosticoFinalJpaController diagnosticoFinalJpaController;

    @Autowired
    EnfermedadTransmisionSexualJpaController sexualJpaController;

    @Autowired
    PrimeraCitologiaJpaController citologiaJpaController;

    @Autowired
    EncriptadorContrasena encriptador;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "/tarjetaPrueba.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarTarjetaPruebas(int start, int limit, String parametros, ModelMap map) {
        if (parametros != null) {
            HashMap hashMap = mapeadorObjetos.readValue(parametros, HashMap.class);
            map.put("lista", jpaController.findWhereAND(hashMap));
            map.put("total", jpaController.getCantidad());
        } else {
            map.put("success", true);
            map.put("lista", jpaController.listarTodos(start, limit));
            map.put("total", jpaController.getCantidad());
        }
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/tipoCaso.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarTiposCasos() {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodosTiposCasos());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/diagnosticoFinal.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarDiagnosticosFinales() {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", diagnosticoFinalJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/tarjetaPrueba.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarTarjetaPrueba(@RequestBody TarjetaPrueba tarjetaPrueba) {
        List<EnfermedadTransmisionSexual> enfermedadesTransmisionSexual = tarjetaPrueba.getEnfermedadesTransmisionSexual();
        tarjetaPrueba.setEnfermedadesTransmisionSexual(new ArrayList<>());
        PrimeraCitologia primeraCitologia = tarjetaPrueba.getPrimeraCitologia();
        jpaController.insertarEntidad(tarjetaPrueba);
        tarjetaPrueba.setEnfermedadesTransmisionSexual(enfermedadesTransmisionSexual);
        jpaController.actualizarEntidad(tarjetaPrueba.getIdTarjeta(), tarjetaPrueba);
        citologiaJpaController.actualizarEntidad(primeraCitologia.getIdPrimeraCitologia(), primeraCitologia);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", tarjetaPrueba);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/tarjetaPrueba.json/{idTarjetaPrueba}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarTarjetaPrueba(@PathVariable int idTarjetaPrueba, @RequestBody TarjetaPrueba tarjetaPrueba) {
        PrimeraCitologia primeraCitologia = tarjetaPrueba.getPrimeraCitologia();
        TarjetaPrueba objetoBD = jpaController.actualizarEntidad(idTarjetaPrueba, tarjetaPrueba);
        citologiaJpaController.actualizarEntidad(primeraCitologia.getIdPrimeraCitologia(), primeraCitologia);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/tarjetaPrueba.json/{idTarjetaPrueba}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarTarjetaPrueba(@PathVariable int idTarjetaPrueba) {
        jpaController.eliminarEntidad(idTarjetaPrueba);
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
