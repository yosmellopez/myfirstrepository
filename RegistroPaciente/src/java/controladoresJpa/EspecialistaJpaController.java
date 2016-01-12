package controladoresJpa;

import clases.Especialista;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class EspecialistaJpaController extends EntitiesRepository<Especialista, Integer> {

    public EspecialistaJpaController() {
        super(Especialista.class);
    }

    @Override
    @Transactional
    public Especialista actualizarEntidad(Integer id, Especialista t) {
        Especialista especialista = em.getReference(Especialista.class, id);
        especialista.setApellidos(t.getApellidos());
        especialista.setNombre(t.getNombre());
        especialista.setEspecialidad(t.getEspecialidad());
        especialista.setGrupo(t.getGrupo());
        em.merge(especialista);
        return especialista;
    }

}
