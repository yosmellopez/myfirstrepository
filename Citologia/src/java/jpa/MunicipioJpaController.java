/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jpa;

import entidades.Municipio;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class MunicipioJpaController extends EntitiesRepository<Municipio, Integer> {

    public MunicipioJpaController() {
        super(Municipio.class);
        orderBy = "provincia";
    }

    @Override
    @Transactional
    public Municipio actualizarEntidad(Integer id, Municipio t) {
        Municipio municipio = em.find(Municipio.class, id);
        municipio.setMunicipio(t.getMunicipio());
        municipio.setProvincia(t.getProvincia());
        em.merge(municipio);
        return municipio;
    }

}
