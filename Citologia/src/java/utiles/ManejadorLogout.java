package utiles;

import jpa.UsuarioJpaController;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

public class ManejadorLogout extends SimpleUrlLogoutSuccessHandler {

    @Autowired
    UsuarioJpaController controller;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Cookie[] cookies = request.getCookies();
        for (Cookie cooky : cookies) {
            cooky.setMaxAge(0);
            response.addCookie(cooky);
        }
        setDefaultTargetUrl("/login.htm");
        super.onLogoutSuccess(request, response, authentication);
    }
}
