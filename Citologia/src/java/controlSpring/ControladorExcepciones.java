/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlSpring;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

@ControllerAdvice
public class ControladorExcepciones extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {MultipartException.class, Exception.class,})
    public ModelAndView handleCustomException(Exception ex, WebRequest request) {
        ModelMap map = new ModelMap();
        map.put("msg", ex.getMessage());
        map.put("success", false);
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

}
