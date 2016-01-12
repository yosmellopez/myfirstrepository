package jpa;

import entidades.PrimeraCitologia;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class PrimeraCitologiaJpaController extends EntitiesRepository<PrimeraCitologia, Integer> {

    public PrimeraCitologiaJpaController() {
        super(PrimeraCitologia.class);
        orderBy = "idPrimeraCitologia";
    }

    @Override
    @Transactional
    public PrimeraCitologia actualizarEntidad(Integer id, PrimeraCitologia t) {
        PrimeraCitologia citologia = em.find(PrimeraCitologia.class, id);
        citologia.setDiagnosticoFinal(t.getDiagnosticoFinal());
        citologia.setFechaResultadoFinal(t.getFechaResultadoFinal());
        citologia.setFechaTomaMuestra(t.getFechaTomaMuestra());
        citologia.setResponsablesMuestras(t.getResponsablesMuestras());
        em.merge(citologia);
        return citologia;
    }

}
