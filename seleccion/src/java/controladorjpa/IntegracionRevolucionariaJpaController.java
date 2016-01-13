/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.IntegracionRevolucionaria;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class IntegracionRevolucionariaJpaController extends RepositorioEntidades<IntegracionRevolucionaria, Integer> {

    public IntegracionRevolucionariaJpaController() {
        super(IntegracionRevolucionaria.class);
    }

    @Override
    @Transactional
    public IntegracionRevolucionaria actualizarEntidad(Integer id, IntegracionRevolucionaria t) {
        IntegracionRevolucionaria integracionRevolucionaria = em.find(IntegracionRevolucionaria.class, id);
        integracionRevolucionaria.setIntegracionRevolucionaria(t.getIntegracionRevolucionaria());
        integracionRevolucionaria.setSiglas(t.getSiglas());
        em.merge(integracionRevolucionaria);
        return integracionRevolucionaria;
    }

}
