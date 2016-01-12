package control;

import clases.Rol;
import jpa.RolJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

@Controller
public class RolControl {

    @Autowired
    RolJpa rolJpa;

    @RequestMapping(value = "rol.json", method = RequestMethod.POST)
    public ModelAndView insertarRol(@RequestBody Rol rol) {
        rolJpa.save(rol);
        ModelMap map = new ModelMap();
        map.put("lista", rol);
        map.put("success", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }
}
