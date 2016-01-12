package control;

import clases.Usuario;
import java.util.HashMap;
import java.util.List;
import jpa.RolJpa;
import jpa.UsuarioJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import util.MapeadorObjetos;
import util.SpecificationCreator;

@Controller
public class UsuarioController {

    @Autowired
    UsuarioJpa usuarioJpaController;

    @Autowired
    RolJpa rolJpaController;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "{pagina}.htm")
    public ModelAndView index(@PathVariable String pagina) {
        ModelMap map = new ModelMap();
        map.put("pagina", pagina);
        return new ModelAndView(pagina, map);
    }

    @RequestMapping(value = "/index.htm")
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "usuario.json", method = RequestMethod.GET)
    public ModelAndView listarUsuario(Pageable p, String parametros, ModelMap map) {
        Page<Usuario> page = null;
        if (parametros == null) {
            page = usuarioJpaController.findAll(p);
            map.put("lista", page.getContent());
            map.put("total", page.getTotalElements());
        } else {
            HashMap readValue = mapeadorObjetos.readValue(parametros, HashMap.class);
            SpecificationCreator<Usuario> creator = new SpecificationCreator<>(readValue);
            List<Usuario> findAll = usuarioJpaController.findAll(creator);
            map.put(parametros, findAll);
        }
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "usuario.json", method = RequestMethod.POST)
    public ModelAndView insertarUsuario(@RequestBody Usuario usuario) {
        usuarioJpaController.saveAndFlush(usuario);
        ModelMap map = new ModelMap();
        map.put("lista", usuario);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "usuario.json/{idUsuario}", method = RequestMethod.PUT)
    public ModelAndView modificarUsuario(@PathVariable("idUsuario") Usuario bd, @RequestBody Usuario usuario) {
        ModelMap map = new ModelMap();
        map.put("lista", usuarioJpaController.save(usuario));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "usuario.json/{idUsuario}", method = RequestMethod.DELETE)
    public ModelAndView eliminarUsuario(@PathVariable int idUsuario) {
        usuarioJpaController.delete(idUsuario);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "rol.json", method = RequestMethod.GET)
    public ModelAndView listarRol() {
        ModelMap map = new ModelMap();
        map.put("lista", rolJpaController.findAll());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }
}
