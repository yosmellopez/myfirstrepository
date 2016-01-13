package utiles;

import controladorjpa.UsuarioJpaController;
import java.io.IOException;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class AutenticacionExitosa extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    UsuarioJpaController controller;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        Usuario usuario = (Usuario) principal;
        usuario.setUltimoInicio(new Date());
        controller.actualizarEntidad(usuario.getIdUsuario(), usuario);
        setDefaultTargetUrl("/" + usuario.getRol().getDisminutivo() + "/inicio.htm");
        Cookie cookie = new Cookie("seleccion", "" + new Date().getTime());
        response.addCookie(cookie);
        super.onAuthenticationSuccess(request, response, authentication);
    }

}
