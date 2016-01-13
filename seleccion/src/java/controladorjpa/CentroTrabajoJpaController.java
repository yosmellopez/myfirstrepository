package controladorjpa;

import modelo.CentroTrabajo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CentroTrabajoJpaController extends RepositorioEntidades<CentroTrabajo, Integer> {

    public CentroTrabajoJpaController() {
        super(CentroTrabajo.class);

    }

    @Override
    @Transactional
    public CentroTrabajo actualizarEntidad(Integer id, CentroTrabajo t) {
        CentroTrabajo centroTrabajo = em.find(CentroTrabajo.class, id);
        centroTrabajo.setNombre(t.getNombre());
        em.merge(centroTrabajo);
        return centroTrabajo;

    }

}
