/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.Observacion;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ObservacionJpaController extends RepositorioEntidades<Observacion, Integer> {

    public ObservacionJpaController() {
        super(Observacion.class);
    }

    @Override
    @Transactional
    public Observacion actualizarEntidad(Integer id, Observacion t) {
        Observacion observacion = em.find(Observacion.class, id);
        observacion.setFechaBaja(t.getFechaBaja());
        observacion.setFechaPresentacion(t.getFechaPresentacion());
        observacion.setMotivoBaja(t.getMotivoBaja());
        em.merge(observacion);
        return observacion;
    }

}
