package control;

import clases.Rol;
import clases.Usuario;
import java.util.HashMap;
import java.util.List;
//import jpaDao.DepartamentoJpaController;
//import jpaDao.FacultadJpaController;
//import jpaDao.RolJpaController;
//import jpaDao.SedeJpaController;
//import jpaDao.UsuarioJpaController;
import jpa.DepartamentoJpa;
import jpa.FacultadJpa;
import jpa.RolJpa;
import jpa.SedeJpa;
import jpa.UsuarioJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import utiles.MapeadorObjetos;

@Controller
public class UsuarioController {

//    @Autowired
//    UsuarioJpaController usuarioJpaController;
    @Autowired
    UsuarioJpa usuarioJpa;

//    @Autowired
//    DepartamentoJpaController departamentoJpa;
    @Autowired
    DepartamentoJpa departamentoJpa;

//    @Autowired
//    SedeJpaController sedeJpa;
    @Autowired
    SedeJpa sedeJpa;

//    @Autowired
//    FacultadJpaController facultadJpa;
    @Autowired
    FacultadJpa facultadJpa;

//    @Autowired
//    RolJpaController rolJpaController;
    @Autowired
    RolJpa rolJpa;

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
    public ModelAndView listarUsuario(Pageable p, Specification specification, ModelMap map) {
        if (specification == null) {
            Page<Usuario> findAll = usuarioJpa.findAll(p);
            map.put("lista", findAll.getContent());
            map.put("total", findAll.getTotalElements());
        } else {
            List<Usuario> findAll = usuarioJpa.findAll(specification, p.getSort());
            map.put("lista", findAll);
        }
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "usuario.json", method = RequestMethod.POST)
    public ModelAndView insertarUsuario(@RequestBody Usuario usuario) {
        usuarioJpa.saveAndFlush(usuario);
        ModelMap map = new ModelMap();
        map.put("lista", usuario);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "usuario.json/{idUsuario}", method = RequestMethod.PUT)
    public ModelAndView modificarUsuario(@PathVariable("idUsuario") Usuario usuarioBd, @RequestBody Usuario usuario) {
        ModelMap map = new ModelMap();
        usuarioBd.cloneData(usuario);
        map.put("lista", usuarioJpa.save(usuarioBd));
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "usuario.json/{idUsuario}", method = RequestMethod.DELETE)
    public ModelAndView eliminarUsuario(@PathVariable int idUsuario) {
        usuarioJpa.delete(idUsuario);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "rol.json", method = RequestMethod.GET)
    public ModelAndView listarRol() {
        ModelMap map = new ModelMap();
        map.put("lista", rolJpa.findAll());
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "sede.json", method = RequestMethod.GET)
    public ModelAndView listarSedes(ModelMap map) {
        map.put("lista", sedeJpa.findAll());
        map.put("success", true);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "facultad.json", method = RequestMethod.GET)
    public ModelAndView listarFacultades(ModelMap map) {
        map.put("lista", facultadJpa.findAll());
        map.put("success", true);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "departamento.json", method = RequestMethod.GET)
    public ModelAndView listarDepartamentos(ModelMap map) {
        map.put("lista", departamentoJpa.findAll());
        map.put("success", true);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "rol.json", method = RequestMethod.POST)
    public ModelAndView insertarRol(@RequestBody Rol rol) {
        rolJpa.save(rol);
        ModelMap map = new ModelMap();
        map.put("lista", rol);
        map.put("success", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView tratarExcepcion(Exception e) {
        ModelMap map = new ModelMap();
        map.put("msg", e.getMessage());
        map.put("success", false);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }
}
