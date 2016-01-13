/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.ControlAspirante;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ControlAspiranteJpaController extends RepositorioEntidades<ControlAspirante, Integer> {

    public ControlAspiranteJpaController() {
        super(ControlAspirante.class);
    }

    @Override
    @Transactional
    public ControlAspirante actualizarEntidad(Integer id, ControlAspirante t) {
        ControlAspirante controlAspirante = em.find(ControlAspirante.class, id);
        controlAspirante.setAprobadoMinint(t.getAprobadoMinint());
        controlAspirante.setExpProceso(t.getExpProceso());
        controlAspirante.setObservacion(t.getObservacion());
        em.merge(controlAspirante);
        return controlAspirante;

    }

}
