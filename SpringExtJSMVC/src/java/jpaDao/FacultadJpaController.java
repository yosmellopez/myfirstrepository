package jpaDao;

import clases.Facultad;
import clases.Usuario;
import java.util.List;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class FacultadJpaController extends EntitiesRepository<Facultad, Integer> {

    public FacultadJpaController() {
        super(Facultad.class);
        orderBy = "idFacultad";
    }

    @Override
    @Transactional
    public Facultad actualizarEntidad(Integer id, Facultad t) {
        Facultad facultad = em.getReference(Facultad.class, id);
        facultad.setNombre(t.getNombre());
        facultad.setSede(t.getSede());
        facultad.setSiglas(t.getSiglas());
        em.merge(facultad);
        return facultad;
    }

    @Transactional(readOnly = true)
    @Override
    public List<Facultad> listarTodos() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(clase);
        cq.select(from).orderBy(cb.asc(from.get("sede")), cb.asc(from.get(orderBy)));
        Query q = em.createQuery(cq);
        cantidad = q.getResultList().size();
        return q.getResultList();
    }

}
