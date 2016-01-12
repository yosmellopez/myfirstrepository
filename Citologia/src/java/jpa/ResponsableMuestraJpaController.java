package jpa;

import entidades.ResponsableMuestra;
import org.springframework.stereotype.Repository;

@Repository
public class ResponsableMuestraJpaController extends EntitiesRepository<ResponsableMuestra, Integer> {

    public ResponsableMuestraJpaController() {
        super(ResponsableMuestra.class);
        orderBy = "idResponsableMuestra";
    }

    @Override
    public ResponsableMuestra actualizarEntidad(Integer id, ResponsableMuestra t) {
        ResponsableMuestra responsableMuestra = em.find(ResponsableMuestra.class, id);
        responsableMuestra.setApellidos(t.getApellidos());
        responsableMuestra.setNombre(t.getNombre());
        em.merge(responsableMuestra);
        return responsableMuestra;
    }

}
