package utiles;

import entidades.Usuario;
import java.io.IOException;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class AutenticacionExitosa extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Cookie cookie = new Cookie("citologia", "" + new Date().getTime());
        response.addCookie(cookie);
        Usuario usuario = (Usuario) authentication.getPrincipal();
        setDefaultTargetUrl("/" + usuario.getRol().getDisminutivo() + "/inicio.htm");
        super.onAuthenticationSuccess(request, response, authentication);
    }

}
