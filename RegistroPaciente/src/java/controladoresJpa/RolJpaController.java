/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladoresJpa;

import clases.Rol;
import org.springframework.stereotype.Repository;

@Repository
public class RolJpaController extends EntitiesRepository<Rol, Integer> {

    public RolJpaController() {
        super(Rol.class);
    }

    @Override
    public Rol actualizarEntidad(Integer id, Rol t) {
        return t;
    }

}
