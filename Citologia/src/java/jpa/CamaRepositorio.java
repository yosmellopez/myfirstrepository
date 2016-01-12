package jpa;

import entidades.Cama;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class CamaRepositorio extends EntitiesRepository<Cama, Integer> {

    public CamaRepositorio() {
        super(Cama.class);
    }

    @Override
    public Cama actualizarEntidad(Integer id, Cama t) {
        Cama cama = em.find(Cama.class, id);
        cama.setHabilitada(t.getHabilitada());
        cama.setNumeroCama(t.getNumeroCama());
        cama.setSala(t.getSala());
        em.merge(cama);
        return cama;
    }

}
