package controladoresJpa;

import clases.TipoOperacion;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TipoOperacionJpaController extends EntitiesRepository<TipoOperacion, Integer> {

    public TipoOperacionJpaController() {
        super(TipoOperacion.class);
        orderBy = new String[]{"idTipoOperacion"};
    }

    @Override
    @Transactional
    public TipoOperacion actualizarEntidad(Integer id, TipoOperacion t) {
        TipoOperacion tipoOperacion = em.getReference(TipoOperacion.class, id);
        tipoOperacion.setTipo(t.getTipo());
        em.merge(tipoOperacion);
        return tipoOperacion;
    }
}
