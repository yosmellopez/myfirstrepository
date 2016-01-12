package clasesUtiles;

import clases.Usuario;
import controladoresJpa.UsuarioJpaController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class InicioSesionService implements UserDetailsService {

    @Autowired
    UsuarioJpaController jpaController;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = jpaController.buscarUsuarioPorUsuario(username.toLowerCase());
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
        return usuario;
    }

}
