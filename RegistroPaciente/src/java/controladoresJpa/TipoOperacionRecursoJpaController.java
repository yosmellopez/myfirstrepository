package controladoresJpa;

import clases.TipoOperacionRecurso;
import clases.TipoOperacionRecursoPK;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TipoOperacionRecursoJpaController extends EntitiesRepository<TipoOperacionRecurso, TipoOperacionRecursoPK> {

    public TipoOperacionRecursoJpaController() {
        super(TipoOperacionRecurso.class);
    }

    @Override
    @Transactional
    public TipoOperacionRecurso actualizarEntidad(TipoOperacionRecursoPK id, TipoOperacionRecurso t) {
        TipoOperacionRecurso operacionRecurso = em.getReference(TipoOperacionRecurso.class, id);
        operacionRecurso.setCantidad(t.getCantidad());
        operacionRecurso.setTipoOperacion(t.getTipoOperacion());
        operacionRecurso.setRecurso(t.getRecurso());
        em.merge(operacionRecurso);
        return operacionRecurso;
    }

    public TipoOperacionRecursoPK crearClavePrimaria(String clave) {
        String[] split = clave.split("-");
        return new TipoOperacionRecursoPK(Integer.parseInt(split[0]), Integer.parseInt(split[1]));
    }
}
