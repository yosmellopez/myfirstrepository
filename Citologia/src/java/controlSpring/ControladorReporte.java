package controlSpring;

import entidades.ResponsableMuestra;
import entidades.TarjetaPrueba;
import java.util.List;
import java.util.function.Consumer;
import jpa.PacienteJpaController;
import jpa.TarjetaPruebaJpaController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ControladorReporte {

    @Autowired
    TarjetaPruebaJpaController pruebaJpaController;

    @Autowired
    PacienteJpaController pacienteJpaController;

    @RequestMapping(value = "/{formato}/{reporte}/tarjetaPrueba", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView reporteTarjetaPrueba(@PathVariable String reporte, @PathVariable String formato) {
        ModelMap map = new ModelMap();
        map.put("datasource", pruebaJpaController.getListaBusqueda());
        map.put("format", formato);
        return new ModelAndView(reporte, map);
    }

    @RequestMapping(value = "/{formato}/{reporte}/paciente", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView reportePaciente(@PathVariable String reporte, @PathVariable String formato) {
        ModelMap map = new ModelMap();
        map.put("datasource", pacienteJpaController.getListaBusqueda());
        map.put("format", formato);
        return new ModelAndView(reporte, map);
    }

    @RequestMapping(value = "/{formato}/{reporte}/{idTarjeta}/reporteTarjetaPrueba", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView reporteTarjetaPruebaPaciente(@PathVariable String reporte, @PathVariable Integer idTarjeta, @PathVariable String formato) {
        ModelMap map = new ModelMap();
        TarjetaPrueba tarjetaPrueba = pruebaJpaController.find(idTarjeta);
        String responsables = crearResponsables(tarjetaPrueba.getPrimeraCitologia().getResponsablesMuestras());
        map.put("datasource", null);
        map.put("tarjeta", tarjetaPrueba);
        map.put("responsables", responsables);
        map.put("format", formato);
        return new ModelAndView(reporte, map);
    }

    private String crearResponsables(List<ResponsableMuestra> responsablesMuestras) {
        String responsables = "";
        int i = 0;
        for (ResponsableMuestra responsablesMuestra : responsablesMuestras) {
            responsables += (i++ != 0 ? "," : "") + responsablesMuestra.getNombre() + " " + responsablesMuestra.getApellidos();
        }
        return responsables;
    }
}
