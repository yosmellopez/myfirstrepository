package jpa;

import entidades.AreaSalud;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class AreaSaludJpaController extends EntitiesRepository<AreaSalud, Integer> {

    public AreaSaludJpaController() {
        super(AreaSalud.class);
        orderBy = "idAreaSalud";
    }

    @Override
    @Transactional
    public AreaSalud actualizarEntidad(Integer id, AreaSalud t) {
        AreaSalud areaSalud = em.find(AreaSalud.class, id);
        areaSalud.setNombre(t.getNombre());
        em.merge(areaSalud);
        return areaSalud;
    }

}
