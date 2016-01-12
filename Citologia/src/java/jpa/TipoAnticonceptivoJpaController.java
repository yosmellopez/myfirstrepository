package jpa;

import entidades.TipoAnticonceptivo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TipoAnticonceptivoJpaController extends EntitiesRepository<TipoAnticonceptivo, Integer> {

    public TipoAnticonceptivoJpaController() {
        super(TipoAnticonceptivo.class);
        orderBy = "idTipoAnticonceptivo";
    }

    @Override
    @Transactional
    public TipoAnticonceptivo actualizarEntidad(Integer id, TipoAnticonceptivo t) {
        TipoAnticonceptivo tipoAnticonceptivo = em.find(TipoAnticonceptivo.class, id);
        tipoAnticonceptivo.setNombreAnticonceptivo(t.getNombreAnticonceptivo());
        tipoAnticonceptivo.setOral(t.getOral());
        em.merge(tipoAnticonceptivo);
        return tipoAnticonceptivo;
    }

}
