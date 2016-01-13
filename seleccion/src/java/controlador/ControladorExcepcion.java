package controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import utiles.MapeadorObjetos;

@ControllerAdvice
public class ControladorExcepcion {
    
    @Autowired
    MapeadorObjetos mapeadorObjetos;
    
    @ExceptionHandler({NullPointerException.class, Exception.class})
    public ModelAndView handleExceptions(Exception e) {
        
        ModelMap map = new ModelMap();
        map.put("msg", e.getMessage());
        map.put("success", false);
        return new ModelAndView(new MappingJackson2JsonView(mapeadorObjetos));
    }
}
