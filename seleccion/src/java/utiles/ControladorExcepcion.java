/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utiles;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

@Controller
public class ControladorExcepcion extends MultiActionController {

    private final Log logger = LogFactory.getLog(getClass());

    protected static String[] vars = {
        "javax.servlet.error.status_code",
        "javax.servlet.error.exception_type",
        "javax.servlet.error.message",
        "javax.servlet.error.exception",
        "javax.servlet.error.request_uri"
    };
    // handlers  

    /**
     * Custom handler
     *
     * @param request current HTTP request
     * @param response current HTTP response
     * @param viewName error page to be called
     * @return a ModelAndView to render the response
     */
    public ModelAndView handleError(HttpServletRequest request, HttpServletResponse response, String viewName) throws ServletException {
        logger.error("Error Handling");
        for (int i = 0; i < vars.length; i++) {
            logger.error("tipo " + vars[i] + ": " + request.getAttribute(vars[i]));
        }
        logger.error("pagina de error " + viewName);
        System.out.println("OK");
        return new ModelAndView(viewName);
    }

    @RequestMapping(value = "/notFoundError.htm", method = RequestMethod.GET)
    public ModelAndView handleHttp404(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        logger.error("Page Not Found");
        return handleError(request, response, "error404");
    }

    @RequestMapping(value = "/dbError.htm", method = RequestMethod.GET)
    public ModelAndView handleDBError(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        logger.error("DB Error");
        return handleError(request, response, "errorDB");
    }

    @RequestMapping(value = "/numberFormatError.htm", method = RequestMethod.GET)
    public ModelAndView handleGenericError(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        logger.error("Generic Error");
        return handleError(request, response, "errorGeneral");

    }

    @RequestMapping(value = "/errorNull.htm", method = RequestMethod.GET)
    public ModelAndView handleNullError(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        logger.error("Null Error");
        return handleError(request, response, "errorGeneral");
    }

    @RequestMapping(value = "/errorLimit.htm", method = RequestMethod.GET)
    public ModelAndView handleLimitError(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        logger.error("Limit Error");
        return handleError(request, response, "errorLimit");
    }

    @RequestMapping(value = "/error500.htm", method = RequestMethod.GET)
    public ModelAndView handle500Error(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        logger.error("500 Error");
        return handleError(request, response, "errorGeneral");
    }

    @RequestMapping(value = "/sessionError.htm", method = RequestMethod.GET)
    public ModelAndView handleSessionError(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        logger.error("Session Not Found");
        return handleError(request, response, "errorSession");
    }
}
