/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladoresJpa;

import clases.Traza;
import org.springframework.stereotype.Repository;

@Repository
public class TrazaJpaController extends EntitiesRepository<Traza, Integer> {

    public TrazaJpaController() {
        super(Traza.class);
    }

    @Override
    public Traza actualizarEntidad(Integer id, Traza t) {
        return t;
    }

}
