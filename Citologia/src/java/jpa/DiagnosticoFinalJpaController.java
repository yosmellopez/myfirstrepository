package jpa;

import entidades.DiagnosticoFinal;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
public class DiagnosticoFinalJpaController extends EntitiesRepository<DiagnosticoFinal, Integer> {

    public DiagnosticoFinalJpaController() {
        super(DiagnosticoFinal.class);
        orderBy = "idDiagnosticoFinal";
    }

    @Override
    @Transactional
    public DiagnosticoFinal actualizarEntidad(Integer id, DiagnosticoFinal t) {
        DiagnosticoFinal diagnosticoFinal = em.find(DiagnosticoFinal.class, id);
        diagnosticoFinal.setDiagnosticoFinal(t.getDiagnosticoFinal());
        return diagnosticoFinal;
    }

}
