package controlSpring;

import entidades.Usuario;
import java.util.HashMap;
import java.util.LinkedList;
import javax.persistence.PersistenceException;
import jpa.TrazaJpaController;
import jpa.UsuarioJpaController;
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
import utiles.Error;
import utiles.MapeadorObjetos;

@Controller
@RequestMapping(value = {"/admin", "/secretaria", "/usuario"})
public class ControladorUsuario {

    @Autowired
    UsuarioJpaController jpaController;

    @Autowired
    TrazaJpaController trazaJpaController;

    @Autowired
    EncriptadorContrasena encriptador;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

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
    public ModelAndView insertarUsuario(@RequestBody Usuario usuario) {
        usuario.setEliminado(false);
        usuario.setContrasenna(encriptador.encodePassword(usuario.getContrasenna(), usuario.getUsuario()));
        jpaController.insertarEntidad(usuario);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", usuario);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @RequestMapping(value = "/usuario.json/{idUsuario}", method = RequestMethod.PUT)
    @ResponseBody
    public ModelMap actualizarUsuario(@PathVariable int idUsuario, @RequestBody Usuario usuario) {
        if (!usuario.getContrasenna().isEmpty()) {
            usuario.setContrasenna(encriptador.encodePassword(usuario.getContrasenna(), usuario.getUsuario()));
        }
        Usuario objetoBD = jpaController.actualizarEntidad(idUsuario, usuario);
        ModelMap map = new ModelMap();
        map.put("success", true);
        map.put("lista", objetoBD);
        return map;
    }

    @RequestMapping(value = "/usuario.json/{idUsuario}", method = RequestMethod.DELETE)
    @ResponseBody
    public ModelMap eliminarUsuario(@PathVariable int idUsuario) {
        Usuario usuario = jpaController.find(idUsuario);
        usuario.setEliminado(true);
        jpaController.actualizarEntidad(idUsuario, usuario);
        ModelMap map = new ModelMap();
        map.put("success", true);
        return map;
    }

    @RequestMapping(value = "/traza.json", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView listarTrazas(int start, int limit, String parametros) {
        ModelMap map = new ModelMap();
        if (parametros == null) {
            map.put("success", true);
            map.put("lista", trazaJpaController.listarTodos(start, limit));
            map.put("total", trazaJpaController.getCantidad());
        } else {
            HashMap readValue = mapeadorObjetos.readValue(parametros, HashMap.class);
            map.put("success", true);
            map.put("lista", trazaJpaController.findWhereAND(readValue));
        }
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
                String contrasena = encriptador.encodePassword(p.getContrasenna(), null);
                if (contrasena.isEmpty()) {
                    error = !error;
                    errores.add(new Error("contrasenna", "Debe introducir la contraseña actual para poder modificar su perfil."));
                } else if (!profesorBd.getPassword().equals(contrasena)) {
                    error = true;
                    errores.add(new Error("contrasenna", "No puede modificar su perfil porque esta no es su contraseña actual."));
                } else if (p.getPassword().isEmpty()) {
                    error = true;
                    errores.add(new Error("contrasenna", "Debe introducir una contraseña."));
                    errores.add(new Error("password1", "Debe introducir una contraseña."));
                }
                if (error) {
                    map.put("errores", errores);
                } else {
                    profesor.setContrasenna(password);
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

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ModelMap tratarExcepcion(Exception e) {
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
        return modelMap;
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
        map.put("lista", jpaController.listarRoles());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }
}
