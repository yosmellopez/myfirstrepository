package controladorjpa;

import modelo.Traza;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TrazaJpaController extends RepositorioEntidades<Traza, Integer> {

    public TrazaJpaController() {
        super(Traza.class);
    }

    @Override
    @Transactional
    public Traza actualizarEntidad(Integer id, Traza t) {
        Traza traza = em.find(Traza.class, id);
        em.merge(traza);
        return traza;
    }

}
