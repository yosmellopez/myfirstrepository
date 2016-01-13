/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.NivelEscolar;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class NivelEscolarJpaController extends RepositorioEntidades<NivelEscolar, Integer> {

    public NivelEscolarJpaController() {
        super(NivelEscolar.class);
    }

    @Override
    @Transactional
    public NivelEscolar actualizarEntidad(Integer id, NivelEscolar t) {
        NivelEscolar nivelEscolar = em.find(NivelEscolar.class, id);
        nivelEscolar.setNivelEscolar(t.getNivelEscolar());
        em.merge(nivelEscolar);
        return nivelEscolar;
    }

}
