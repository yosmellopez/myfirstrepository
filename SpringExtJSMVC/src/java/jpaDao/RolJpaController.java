package jpaDao;

import clases.Rol;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class RolJpaController extends EntitiesRepository<Rol, Integer> {

    public RolJpaController() {
        super(Rol.class);
        orderBy = "idRol";
    }

    @Override
    @Transactional
    public Rol actualizarEntidad(Integer id, Rol t) {
        Rol rol = em.getReference(Rol.class, id);
        rol.setRol(t.getRol());
        em.merge(rol);
        return rol;
    }

}
