package controladoresJpa;

import clases.AreaSalud;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class AreaSaludJpaController extends EntitiesRepository<AreaSalud, Integer> {
    
    public AreaSaludJpaController() {
        super(AreaSalud.class);
    }
    
    @Override
    @Transactional
    public AreaSalud actualizarEntidad(Integer id, AreaSalud t) {
        AreaSalud areaSalud = em.getReference(AreaSalud.class, id);
        areaSalud.setNombre(t.getNombre());
        areaSalud.setDireccion(t.getDireccion());
        em.merge(areaSalud);
        return areaSalud;
    }
    
}
