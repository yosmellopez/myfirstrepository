package controladoresJpa;

import clases.Recurso;
import clases.TarjetaEstiba;
import java.util.List;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class RecursoJpaController extends EntitiesRepository<Recurso, Integer> {

    public RecursoJpaController() {
        super(Recurso.class);
    }

    @Override
    @Transactional
    public Recurso actualizarEntidad(Integer id, Recurso t) {
        Recurso recurso = em.find(Recurso.class, id);
        recurso.setNombre(t.getNombre());
        if (!t.getTarjetasEstibas().isEmpty()) {
            recurso.setTarjetasEstibas(t.getTarjetasEstibas());
        }
        recurso.setCantidadRestante(t.getCantidadRestante());
        em.merge(recurso);
        return recurso;
    }

    public Recurso existeRecurso(String nombre) {
        Query query = em.createNamedQuery("Recurso.findByNombre");
        query.setParameter("nombre", nombre);
        try {
            return (Recurso) query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public int cantidadRestanteRecurso(Recurso recurso) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(TarjetaEstiba.class);
        cq.select(from).where(cb.equal(from.get("recurso"), recurso));
        TypedQuery query = em.createQuery(cq);
        List<TarjetaEstiba> tarjetaEstibas = query.getResultList();
        int cantidad = 0;
        for (TarjetaEstiba tarjetaEstiba : tarjetaEstibas) {
            cantidad += tarjetaEstiba.getOperacion() ? tarjetaEstiba.getCantidad() : tarjetaEstiba.getCantidad() * -1;
        }
        return cantidad;
    }

}
