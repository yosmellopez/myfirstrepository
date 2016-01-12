package controladoresJpa;

import clases.Usuario;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UsuarioJpaController extends EntitiesRepository<Usuario, Integer> {

    public UsuarioJpaController() {
        super(Usuario.class);
    }

    @Override
    @Transactional
    public Usuario actualizarEntidad(Integer id, Usuario t) {
        Usuario usuario = em.getReference(Usuario.class, id);
        usuario.setApellidos(t.getApellidos());
        if (!t.getContrasena().isEmpty()) {
            usuario.setContrasena(t.getContrasena());
        }
        usuario.setNombre(t.getNombre());
        usuario.setRol(t.getRol());
        usuario.setUsuario(t.getUsuario());
        em.merge(usuario);
        return usuario;
    }

    @Transactional
    public Usuario buscarUsuarioPorUsuario(String usuario) {
        Query query = em.createNamedQuery("Usuario.findByUsuario");
        query.setParameter("usuario", usuario);
        try {
            return (Usuario) query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

}
