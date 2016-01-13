/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.Rol;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class RolJpaController extends RepositorioEntidades<Rol, Integer> {

    public RolJpaController() {
        super(Rol.class);
        orderBy = "idRol";
    }

    @Override
    @Transactional
    public Rol actualizarEntidad(Integer id, Rol t) {
        Rol rol = em.find(Rol.class, id);
        rol.setDisminutivo(t.getDisminutivo());
        rol.setRol(t.getRol());
        em.merge(rol);
        return rol;
    }

}
