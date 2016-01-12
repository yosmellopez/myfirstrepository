package controladoresJpa;

import clases.Causa;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CausaJpaController extends EntitiesRepository<Causa, Integer> {

    public CausaJpaController() {
        super(Causa.class);
    }

    @Override
    @Transactional
    public Causa actualizarEntidad(Integer id, Causa t) {
        Causa causa = em.getReference(Causa.class, id);
        causa.setCausa(t.getCausa());
        em.merge(causa);
        return causa;
    }

}
