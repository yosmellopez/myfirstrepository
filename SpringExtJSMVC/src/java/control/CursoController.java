package control;

import clases.Curso;
import java.util.List;
import jpa.CursoJpa;
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
public class CursoController {

    @Autowired
    CursoJpa cursoJpa;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @RequestMapping(value = "curso.json", method = RequestMethod.GET)
    public ModelAndView listarCurso(Pageable p, Specification specification, ModelMap map) {
        if (specification == null) {
            Page<Curso> page = cursoJpa.findAll(p);
            map.put("lista", page.getContent());
            map.put("total", page.getTotalElements());
        } else {
            List<Curso> findAll = cursoJpa.findAll(specification, p.getSort());
            map.put("lista", findAll);
        }
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "curso.json", method = RequestMethod.POST)
    public ModelAndView insertarCurso(@RequestBody Curso curso) {
        cursoJpa.saveAndFlush(curso);
        ModelMap map = new ModelMap();
        map.put("lista", curso);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "curso.json/{idCurso}", method = RequestMethod.PUT)
    public ModelAndView modificarCurso(@PathVariable("idCurso") Curso bd, @RequestBody Curso curso) {
        ModelMap map = new ModelMap();
        map.put("lista", cursoJpa.save(curso));
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @RequestMapping(value = "curso.json/{idCurso}", method = RequestMethod.DELETE)
    public ModelAndView eliminarCurso(@PathVariable int idCurso) {
        cursoJpa.delete(idCurso);
        ModelMap map = new ModelMap();
        map.put("sucess", true);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView tratarExcepcion(Exception e) {
        ModelMap map = new ModelMap();
        map.put("msg", e.getMessage());
        map.put("success", false);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos), map);
    }
}
