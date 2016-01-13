/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import modelo.EntrevistaIndividualCentroTrabajo;
import modelo.EntrevistaIndividualCentroTrabajoPK;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class EntrevistaIndividualCentroTrabajoJpaController extends RepositorioEntidades<EntrevistaIndividualCentroTrabajo, EntrevistaIndividualCentroTrabajoPK> {

    public EntrevistaIndividualCentroTrabajoJpaController() {
        super(EntrevistaIndividualCentroTrabajo.class);
    }

    @Override
    @Transactional
    public EntrevistaIndividualCentroTrabajo actualizarEntidad(EntrevistaIndividualCentroTrabajoPK id, EntrevistaIndividualCentroTrabajo t) {
        EntrevistaIndividualCentroTrabajo entrevistainCentroTrabajo = em.find(EntrevistaIndividualCentroTrabajo.class, id);
        entrevistainCentroTrabajo.setCargo(t.getCargo());
        entrevistainCentroTrabajo.setCentroTrabajo(t.getCentroTrabajo());
        entrevistainCentroTrabajo.setDesde(t.getDesde());
        entrevistainCentroTrabajo.setHasta(t.getHasta());
        entrevistainCentroTrabajo.setEntrevistaIndividual(t.getEntrevistaIndividual());
        em.merge(entrevistainCentroTrabajo);
        return entrevistainCentroTrabajo;

    }

}
