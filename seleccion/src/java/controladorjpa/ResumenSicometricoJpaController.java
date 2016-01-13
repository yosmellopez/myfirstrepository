package controladorjpa;

import modelo.ResumenSicometrico;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ResumenSicometricoJpaController extends EntitiesRepository<ResumenSicometrico, Integer> {

    public ResumenSicometricoJpaController() {
        super(ResumenSicometrico.class);
        orderBy = "idResumenSicometrico";
        ascendente = false;
    }

    @Override
    @Transactional
    public ResumenSicometrico actualizarEntidad(Integer id, ResumenSicometrico t) {
        ResumenSicometrico resumenSicometrico = em.find(ResumenSicometrico.class, id);
        resumenSicometrico.setAspirante(t.getAspirante());
        resumenSicometrico.setDiagnostico(t.getDiagnostico());
        resumenSicometrico.setDocumentoAprobatorio(t.getDocumentoAprobatorio());
        resumenSicometrico.setEnfermedades(t.getEnfermedades());
        em.merge(resumenSicometrico);
        return resumenSicometrico;
    }

}
