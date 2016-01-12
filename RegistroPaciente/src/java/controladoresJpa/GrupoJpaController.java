package controladoresJpa;

import clases.Grupo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class GrupoJpaController extends EntitiesRepository<Grupo, Integer> {
    
    public GrupoJpaController() {
        super(Grupo.class);
    }
    
    @Override
    @Transactional
    public Grupo actualizarEntidad(Integer id, Grupo t) {
        Grupo grupo = em.getReference(Grupo.class, id);
        grupo.setGrupo(t.getGrupo());
        em.merge(grupo);
        return grupo;
    }
    
}
