package jpaDao;

import clases.Sede;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class SedeJpaController extends EntitiesRepository<Sede, Integer> {

    public SedeJpaController() {
        super(Sede.class);
        orderBy = "idSede";
    }

    @Override
    @Transactional
    public Sede actualizarEntidad(Integer id, Sede t) {
        Sede sede = em.getReference(Sede.class, id);
        sede.setNombre(t.getNombre());
        em.merge(sede);
        return sede;
    }

}
