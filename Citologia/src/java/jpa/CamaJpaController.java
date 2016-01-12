package jpa;

import entidades.Cama;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CamaJpaController extends EntitiesRepository<Cama, Integer> {

    public CamaJpaController() {
        super(Cama.class);
        orderBy = "idCama";
    }

    @Override
    @Transactional
    public Cama actualizarEntidad(Integer id, Cama t) {
        Cama cama = em.getReference(Cama.class, id);
        cama.setHabilitada(t.getHabilitada());
        cama.setNumeroCama(t.getNumeroCama());
        cama.setSala(t.getSala());
        em.merge(cama);
        return cama;
    }

}
