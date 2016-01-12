package controlSpring;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class ControladorInicio {

    @RequestMapping(value = "{role}/{pagina}.htm")
    public ModelAndView paginaRouter(@PathVariable String role, @PathVariable String pagina, ModelMap map) {
        map.put("pagina", pagina);
        map.put("role", role);
        return new ModelAndView(pagina, map);
    }

    @RequestMapping(value = "{role}/denegado.htm")
    public ModelAndView denegado(@PathVariable String role) {
        return new ModelAndView(new RedirectView("../denegado.htm"));
    }

    @RequestMapping(value = "/login.htm")
    public ModelAndView login(ModelMap map) {
        map.put("pagina", "login");
        return new ModelAndView("login", map);
    }

    @RequestMapping(value = "/denegado.htm")
    public ModelAndView mostrarDenegado(ModelMap map) {
        return new ModelAndView("denegado", map);
    }
}
