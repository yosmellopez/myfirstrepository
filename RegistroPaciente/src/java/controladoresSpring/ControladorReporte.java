package controladoresSpring;

import controladoresJpa.ReporteJpaController;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

@Controller
public class ControladorReporte {

    @Autowired
    ReporteJpaController controller;

    @RequestMapping(value = "reporteMes.json", method = RequestMethod.GET)
    public ModelAndView operacionesMes(String mes, ModelMap map) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
        Date fecha = dateFormat.parse(mes);
        map.put("lista", controller.operacionesMes(fecha));
        map.put("success", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/{tipo}/reporteOperacionesMes", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView reporteOperacionesMes(String mes, @PathVariable String tipo, ModelMap map) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
        Date fecha = dateFormat.parse(mes);
        map.put("datasource", controller.operacionesMes(fecha));
        map.put("fecha", fecha);
        map.put("format", tipo);
        map.put("success", true);
        return new ModelAndView("reporteOperacionesMes", map);
    }

    @RequestMapping(value = "pacientesFallecidosMes.json", method = RequestMethod.GET)
    public ModelAndView pacientesFallecidosMes(String mes, ModelMap map) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
        Date fecha = dateFormat.parse(mes);
        map.put("lista", controller.pacientesFallecidosMes(fecha));
        map.put("success", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/{tipo}/reportePacientesFallecidosMes", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView reportePacientesFallecidosMes(String mes, @PathVariable String tipo, ModelMap map) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
        Date fecha = dateFormat.parse(mes);
        map.put("datasource", controller.pacientesFallecidosMes(fecha));
        map.put("format", tipo);
        map.put("fecha", fecha);
        map.put("success", true);
        return new ModelAndView("reportePacientesFallecidosMes", map);
    }
}
