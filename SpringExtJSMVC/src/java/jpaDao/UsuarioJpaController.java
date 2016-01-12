package jpaDao;

import clases.Rol;
import clases.Usuario;
import java.util.List;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UsuarioJpaController extends EntitiesRepository<Usuario, Integer> {

    private int cantidadTrazas;

    public UsuarioJpaController() {
        super(Usuario.class);
        orderBy = "idUsuario";
    }

    @Override
    @Transactional
    public Usuario actualizarEntidad(Integer id, Usuario t) {
        Usuario usuario = em.find(Usuario.class, id);
        usuario.setNombre(t.getNombre());
        usuario.setApellidos(t.getApellidos());
        if (!t.getContrasena().isEmpty()) {
            usuario.setContrasena(t.getContrasena());
        }
        usuario.setRol(t.getRol());
        usuario.setUsuario(t.getUsuario());
        em.merge(usuario);
        return usuario;
    }

    @Transactional
    public List<Rol> listarRoles() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        cq.select(cq.from(Rol.class));
        Query q = em.createQuery(cq);
        return q.getResultList();
    }


    @Transactional
    public Usuario buscarUsuario(String usuario) {
        Query query = em.createNamedQuery("Usuario.findByUsuario");
        query.setParameter("usuario", usuario);
        try {
            return (Usuario) query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public Usuario buscarUsuarioCorreo(String correo) {
        Query query = em.createNamedQuery("Usuario.findByCorreo");
        query.setParameter("correo", correo);
        try {
            return (Usuario) query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }


    @Transactional(readOnly = true)
    public int getCantidadTrazas() {
        return cantidadTrazas;
    }
}
