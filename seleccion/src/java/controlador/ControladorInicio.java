package controlador;

import anotaciones.CurrentUser;
import modelo.Usuario;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ControladorInicio {

    @RequestMapping(value = "/{pagina}.htm", method = RequestMethod.GET)
    public ModelAndView routingGeneral(@PathVariable String pagina, ModelMap map) {
        map.put("pagina", pagina);
        return new ModelAndView(pagina, map);
    }
    
    @RequestMapping(value = "/{role}/{pagina}.htm", method = RequestMethod.GET)
    public ModelAndView routingParticular(@PathVariable String pagina, ModelMap map, @CurrentUser Usuario usuario) {
        map.put("rol", usuario.getRol().getDisminutivo());
        map.put("pagina", pagina);
        return new ModelAndView(pagina, map);
    }
}
