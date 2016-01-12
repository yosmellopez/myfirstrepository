package controladoresSpring;

import clases.Traza;
import clases.Usuario;
import clasesUtiles.EncriptadorContrasena;
import clasesUtiles.MapeadorObjetos;
import clasesUtiles.Error;
import controladoresJpa.RolJpaController;
import controladoresJpa.TrazaJpaController;
import controladoresJpa.UsuarioJpaController;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

@Controller
public class ControladorUsuario {

    @Autowired
    UsuarioJpaController jpaController;

    @Autowired
    RolJpaController rolJpaController;

    @Autowired
    TrazaJpaController trazaJpaController;

    @Autowired
    EncriptadorContrasena encriptador;

    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "/{pagina}.htm")
    public ModelAndView paginaRouter(@PathVariable String pagina, ModelMap map) {
        map.put("pagina", pagina);
        return new ModelAndView(pagina, map);
    }

    @RequestMapping(value = "/usuario.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarUsuarios(int start, int limit) {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", jpaController.listarTodos(start, limit));
        map.put("total", jpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/usuario.json", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView insertarUsuario(@RequestBody Usuario objetoEntidad) {
        if (!objetoEntidad.getContrasena().isEmpty()) {
            objetoEntidad.setContrasena(encriptador.encodePassword(objetoEntidad.getContrasena(), null));
        }
        jpaController.insertarEntidad(objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoEntidad);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/usuario.json/{idUsuario}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarUsuario(@PathVariable int idUsuario, @RequestBody Usuario objetoEntidad) {
        if (!objetoEntidad.getContrasena().isEmpty()) {
            objetoEntidad.setContrasena(encriptador.encodePassword(objetoEntidad.getContrasena(), null));
        }
        Usuario objetoBD = jpaController.actualizarEntidad(idUsuario, objetoEntidad);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/usuario.json/{idUsuario}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarUsuario(@PathVariable int idUsuario) {
        jpaController.eliminarEntidad(idUsuario);
        ModelMap map = new ModelMap();
        map.put("success", true);
        return map;
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ModelAndView tratarExcepcion(Exception e) {
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
        return new ModelAndView(new MappingJackson2JsonView(), modelMap);
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

    @RequestMapping(value = "/rol.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarRoles() {
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", rolJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/traza.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarTrazas(int start, int limit, String parametros) {
        ModelMap map = new ModelMap();
        if (parametros != null) {
            HashMap<String, Object> hashMap = mapeadorObjetos.readValue(parametros, HashMap.class);
            List<Traza> trazas = trazaJpaController.findWhereAND(hashMap);
            map.put("lista", trazas);
            map.put("total", trazas.size());
        } else {
            map.put("lista", trazaJpaController.listarTodos(start, limit));
            map.put("total", trazaJpaController.getCantidad());
        }
        map.put("success", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "perfil.json/{id}", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ModelMap modificarPerfil(@RequestBody Usuario p, @PathVariable int id, String password) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ModelMap map = new ModelMap();
        if (authentication != null) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof Usuario) {
                Usuario profesorBd = jpaController.find(id);
                Usuario profesor = (Usuario) principal;
                profesor.setApellidos(p.getApellidos());
                profesor.setNombre(p.getNombre());
                boolean error = false;
                LinkedList<Error> errores = new LinkedList<>();
                String contrasena = encriptador.encodePassword(p.getContrasena(), null);
                if (contrasena.isEmpty()) {
                    error = !error;
                    errores.add(new Error("contrasena", "Debe introducir la contraseña actual para poder modificar su perfil."));
                } else if (!profesorBd.getPassword().equals(contrasena)) {
                    error = true;
                    errores.add(new Error("contrasena", "No puede modificar su perfil porque esta no es su contraseña actual."));
                } else if (p.getPassword().isEmpty()) {
                    error = true;
                    errores.add(new Error("contrasena", "Debe introducir una contraseña."));
                    errores.add(new Error("password1", "Debe introducir una contraseña."));
                }
                if (error) {
                    map.put("errores", errores);
                } else {
                    profesor.setContrasena(encriptador.encodePassword(password, null));
                    jpaController.actualizarEntidad(id, profesor);
                }
                map.put("success", !error);
                map.put("logout", false);
            }
            return map;
        }
        map.put("logout", true);
        return map;
    }
}
