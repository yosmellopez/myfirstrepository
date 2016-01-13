package controladorjpa;

import modelo.DocumentoAprobatorio;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class DocumentoAprobatorioJpaController extends RepositorioEntidades<DocumentoAprobatorio, Integer> {

    public DocumentoAprobatorioJpaController() {
        super(DocumentoAprobatorio.class);
    }

    @Override
    @Transactional
    public DocumentoAprobatorio actualizarEntidad(Integer id, DocumentoAprobatorio t) {
        DocumentoAprobatorio documentoAprobatorio = em.find(DocumentoAprobatorio.class, id);
        documentoAprobatorio.setAprobado(t.getAprobado());
        documentoAprobatorio.setResumenSicometrico(t.getResumenSicometrico());
        documentoAprobatorio.setFechaExamen(t.getFechaExamen());
        em.merge(documentoAprobatorio);
        return documentoAprobatorio;
    }

}
