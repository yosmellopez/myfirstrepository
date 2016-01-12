package controladoresJpa;

import clases.TarjetaEstiba;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TarjetaEstibaJpaController extends EntitiesRepository<TarjetaEstiba, Integer> {

    public TarjetaEstibaJpaController() {
        super(TarjetaEstiba.class);
    }

    @Override
    @Transactional
    public TarjetaEstiba actualizarEntidad(Integer id, TarjetaEstiba t) {
        TarjetaEstiba tarjetaEstiba = em.getReference(TarjetaEstiba.class, id);
        tarjetaEstiba.setCantidad(t.getCantidad());
        tarjetaEstiba.setFecha(t.getFecha());
        tarjetaEstiba.setOperacion(t.getOperacion());
        tarjetaEstiba.setRecurso(t.getRecurso());
        em.merge(tarjetaEstiba);
        return tarjetaEstiba;
    }

}
