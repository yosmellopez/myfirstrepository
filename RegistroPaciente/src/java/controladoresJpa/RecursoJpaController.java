package controladoresJpa;

import clases.Recurso;
import javax.persistence.Query;
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

}
