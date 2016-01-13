/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utiles;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

@ControllerAdvice
public class ControladorExcepciones extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {Exception.class})
    public ModelAndView tratarException(Exception e) {
        ModelMap map = new ModelMap();
        map.put("success", false);
        map.put("msg", e.getLocalizedMessage());
        return new ModelAndView(new MappingJackson2JsonView(), map);
    }

    @Override
    protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return super.handleBindException(ex, headers, HttpStatus.OK, request); //To change body of generated methods, choose Tools | Templates.
    }

}
