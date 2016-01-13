package utiles;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class AutenticacionFallida extends SimpleUrlAuthenticationFailureHandler {

    public static final String LAST_USERNAME_KEY = "LAST_USERNAME";

    public static final String LAST_EXCEPTION = "LAST_EXCEPTION";

    @Autowired
    private UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String usernameParameter = usernamePasswordAuthenticationFilter.getUsernameParameter();
//        setDefaultFailureUrl("/login.htm?error");
        String lastUserName = request.getParameter(usernameParameter);
        HttpSession session = request.getSession(false);
        if (session != null || isAllowSessionCreation()) {
            request.getSession().setAttribute(LAST_USERNAME_KEY, lastUserName);
            request.getSession().setAttribute(LAST_EXCEPTION, exception.getMessage());
        }
        super.onAuthenticationFailure(request, response, exception);
    }
    
}
