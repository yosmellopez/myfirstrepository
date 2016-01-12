package controladoresJpa;

import clases.Operacion;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class OperacionJpaController extends EntitiesRepository<Operacion, Integer> {

    public OperacionJpaController() {
        super(Operacion.class);
        orderBy = new String[]{"idOperacion", "fechaOperacion"};
    }

    @Override
    @Transactional
    public Operacion actualizarEntidad(Integer id, Operacion t) {
        Operacion operacion = em.getReference(Operacion.class, id);
        operacion.setEspecialidad(t.getEspecialidad());
        operacion.setGrupo(t.getGrupo());
        operacion.setPaciente(t.getPaciente());
        operacion.setFechaOperacion(t.getFechaOperacion());
        em.merge(operacion);
        return operacion;
    }
}
