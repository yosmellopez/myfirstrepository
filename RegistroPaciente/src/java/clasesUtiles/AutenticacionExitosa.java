package clasesUtiles;

import controladoresJpa.UsuarioJpaController;
import java.io.IOException;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class AutenticacionExitosa extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    UsuarioJpaController jpaController;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Cookie cookie = new Cookie("registroPaciente", "" + new Date().getTime());
        response.addCookie(cookie);
        super.onAuthenticationSuccess(request, response, authentication);
    }

}
