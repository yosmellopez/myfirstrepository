package jpa;

import entidades.Metrorragia;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class MetrorragiaJpaController extends EntitiesRepository<Metrorragia, Integer> {

    public MetrorragiaJpaController() {
        super(Metrorragia.class);
    }

    @Override
    @Transactional
    public Metrorragia actualizarEntidad(Integer id, Metrorragia t) {
        Metrorragia metrorragia = em.find(Metrorragia.class, id);
        metrorragia.setMetrorragia(t.getMetrorragia());
        em.merge(metrorragia);
        return metrorragia;
    }

}
