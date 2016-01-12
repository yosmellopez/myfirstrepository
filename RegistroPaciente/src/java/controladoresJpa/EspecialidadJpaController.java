package controladoresJpa;

import clases.Especialidad;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class EspecialidadJpaController extends EntitiesRepository<Especialidad, Integer> {
    
    public EspecialidadJpaController() {
        super(Especialidad.class);
    }
    
    @Override
    @Transactional
    public Especialidad actualizarEntidad(Integer id, Especialidad t) {
        Especialidad especialidad = em.getReference(Especialidad.class, id);
        especialidad.setEspecialidad(t.getEspecialidad());
        em.merge(especialidad);
        return especialidad;
    }
    
}
