package jpa;

import entidades.TipoCaso;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TipoCasoJpaController extends EntitiesRepository<TipoCaso, Integer> {

    public TipoCasoJpaController() {
        super(TipoCaso.class);
        orderBy = "idTipoCaso";
    }

    @Override
    @Transactional
    public TipoCaso actualizarEntidad(Integer id, TipoCaso t) {
        TipoCaso tipoCaso = em.find(TipoCaso.class, id);
        tipoCaso.setTipoCaso(t.getTipoCaso());
        em.merge(tipoCaso);
        return tipoCaso;
    }

}
