package controlSpring;

import java.util.Date;
import jpa.EstadisticaJpaController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/admin", "/secretaria", "/usuario"})
public class ControladorEstadistica {

    @Autowired
    EstadisticaJpaController jpaController;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "estadisticaMensual.json", method = RequestMethod.GET)
    public ModelAndView mostrarEstadisticaMensual(String fecha, ModelMap map) {
        Date fec = mapeadorObjetos.converToDate(fecha, "MMMMM/yyyy");
        map.put("lista", jpaController.mostrarEstadistica(fec));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "patologiaCuelloGrupoEdad.json", method = RequestMethod.GET)
    public ModelAndView mostrarPartologiasCuelloGrupoEdad(ModelMap map) {
        map.put("lista", jpaController.mostrarEstadisticaPatologiaCuelloRangoEdad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }
}
