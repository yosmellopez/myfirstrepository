package jpa;

import entidades.Rol;
import entidades.Traza;
import entidades.Usuario;
import java.util.List;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
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
    public List<Usuario> listarTodos(int inicio, int fin) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(clase);
        cq.select(from).where(cb.equal(from.get("eliminado"), false)).orderBy(cb.asc(from.get(orderBy)));
        Query q = em.createQuery(cq);
        cantidad = q.getResultList().size();
        q.setFirstResult(inicio);
        q.setMaxResults(fin);
        return q.getResultList();
    }

    @Override
    @Transactional
    public Usuario actualizarEntidad(Integer id, Usuario t) {
        Usuario usuario = em.getReference(Usuario.class, id);
        usuario.setNombre(t.getNombre());
        usuario.setApellidos(t.getApellidos());
        if (!t.getContrasenna().isEmpty()) {
            usuario.setContrasenna(t.getContrasenna());
        }
        usuario.setRol(t.getRol());
        usuario.setUsuario(t.getUsuario());
        usuario.setEliminado(t.getEliminado());
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
            //Devuelve un solo resultado si la consulta solo devuelve un resultado
            return (Usuario) query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional(readOnly = true)
    public List<Traza> listarTrazas(int inicio, int fin) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(Traza.class);
        cq.select(from).orderBy(cb.desc(from.get("idTraza")));
        Query q = em.createQuery(cq);
        cantidadTrazas = q.getResultList().size();
        q.setFirstResult(inicio);
        q.setMaxResults(fin);
        return q.getResultList();
    }

    @Transactional
    public void insertarTraza(Traza traza) {
        em.persist(traza);
    }

    public int getCantidadTrazas() {
        return cantidadTrazas;
    }

}
