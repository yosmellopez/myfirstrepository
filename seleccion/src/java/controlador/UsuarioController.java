package controlador;

import anotaciones.CurrentUser;
import controladorjpa.RolJpaController;
import controladorjpa.TrazaJpaController;
import controladorjpa.UsuarioJpaController;
import java.util.LinkedList;
import javax.persistence.PersistenceException;
import modelo.Usuario;
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
import utiles.EncriptadorContrasena;
import utiles.ErrorPostgrado;
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/admin"})
public class UsuarioController {

    @Autowired
    UsuarioJpaController usuarioJpaController;

    @Autowired
    RolJpaController rolJpaController;

    @Autowired
    EncriptadorContrasena encriptadorContrasena;

    @Autowired
    TrazaJpaController trazaJpaController;
    
    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "{pagina}.htm")
    public ModelAndView index(@PathVariable String pagina, @CurrentUser Usuario usuario) {
        ModelMap map = new ModelMap();
        map.put("pagina", pagina);
        map.put("rol", usuario.getRol().getDisminutivo());
        return new ModelAndView(pagina, map);
    }

    @RequestMapping(value = "/")
    public ModelAndView index() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "usuario.json", method = RequestMethod.GET)
    public ModelAndView listarUsuario(int limit, int start) {
        ModelMap map = new ModelMap();
        map.put("lista", usuarioJpaController.listarTodos(start, limit));
        map.put("total", usuarioJpaController.getCantidad());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "usuario.json", method = RequestMethod.POST)
    public ModelAndView insertarUsuario(@RequestBody Usuario usuario) {
        usuario.setContrasena(encriptadorContrasena.encodePassword(usuario.getContrasena(), usuario.getUsuario()));
        usuarioJpaController.insertarEntidad(usuario);
        ModelMap map = new ModelMap();
        map.put("lista", usuario);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "usuario.json/{idUsuario}", method = RequestMethod.PUT)
    public ModelAndView modificarUsuario(@PathVariable int idUsuario, @RequestBody Usuario usuario) {
        usuario.setContrasena(encriptadorContrasena.encodePassword(usuario.getContrasena(), usuario.getUsuario()));
        ModelMap map = new ModelMap();
        map.put("lista", usuarioJpaController.actualizarEntidad(idUsuario, usuario));
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "usuario.json/{idUsuario}", method = RequestMethod.DELETE)
    public ModelAndView eliminarUsuario(@PathVariable int idUsuario) {
        usuarioJpaController.eliminarEntidad(idUsuario);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "rol.json", method = RequestMethod.GET)
    public ModelAndView listarRol() {
        ModelMap map = new ModelMap();
        map.put("lista", rolJpaController.listarTodos());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "traza.json", method = RequestMethod.GET)
    public ModelAndView listarTraza(int limit, int start) {
        ModelMap map = new ModelMap();
        map.put("lista", trazaJpaController.listarTodos(start, limit));
        map.put("total", trazaJpaController.getCantidad());
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
                Usuario profesorBd = usuarioJpaController.find(id);
                Usuario usuario = (Usuario) principal;
                usuario.setApellidos(p.getApellidos());
                usuario.setNombre(p.getNombre());
                usuario.setBarraRecogida(p.getBarraRecogida());
                boolean error = false;
                LinkedList<ErrorPostgrado> errores = new LinkedList<>();
                String contrasena = p.getContrasena();
                if (contrasena.isEmpty()) {
                    error = !error;
                    errores.add(new ErrorPostgrado("contrasena", "Debe introducir la contraseña actual para poder modificar su perfil."));
                } else if (!profesorBd.getPassword().equals(contrasena)) {
                    error = true;
                    errores.add(new ErrorPostgrado("contrasena", "No puede modificar su perfil porque esta no es su contraseña actual."));
                } else if (p.getPassword().isEmpty()) {
                    error = true;
                    errores.add(new ErrorPostgrado("contrasena", "Debe introducir una contraseña."));
                    errores.add(new ErrorPostgrado("password1", "Debe introducir una contraseña."));
                }
                if (error) {
                    map.put("errores", errores);
                } else {
                    usuario.setContrasena(password);
                    usuarioJpaController.actualizarEntidad(id, usuario);
                }
                map.put("success", !error);
                map.put("logout", false);
            }
            return map;
        }
        map.put("logout", true);
        return map;
    }

    @ExceptionHandler(Exception.class)
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
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), modelMap);
    }

    private String tratarMensaje(JpaSystemException e) {
        String message = e.getMostSpecificCause().getMessage();
        if (message.contains("nombre_unico")) {
            return "Ya existe este nombre de facultad.";
        } else if (message.contains("fk_doctor_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene doctores.";
        } else if (message.contains("fk_departamento_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene departamentos.";
        } else if (message.contains("fk_usuario_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene usuarios.";
        } else if (message.contains("fk_maestria_id_facultad")) {
            return "No se puede eliminar esta facultad porque contiene maestrias.";
        } else {
            return message;
        }
    }
}
