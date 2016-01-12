/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jpa;

import entidades.Sala;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class SalaJpaController extends EntitiesRepository<Sala, Integer> {

    public SalaJpaController() {
        super(Sala.class);
        orderBy = "idSala";
    }

    @Override
    @Transactional
    public Sala actualizarEntidad(Integer id, Sala t) {
        Sala sala = em.find(Sala.class, id);
        sala.setIdSala(id);
        em.merge(sala);
        return sala;
    }

}
