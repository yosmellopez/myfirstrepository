/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jpa;

import entidades.Provincia;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ProvinciaJpaController extends EntitiesRepository<Provincia, Integer> {

    public ProvinciaJpaController() {
        super(Provincia.class);
        orderBy = "idProvincia";
    }

    @Override
    @Transactional
    public Provincia actualizarEntidad(Integer id, Provincia t) {
        Provincia provincia = em.find(Provincia.class, id);
        provincia.setIdProvincia(id);
        em.merge(provincia);
        return provincia;
    }

}
