package jpa;

import entidades.Traza;
import org.springframework.stereotype.Repository;

@Repository
public class TrazaJpaController extends EntitiesRepository<Traza, Integer> {

    public TrazaJpaController() {
        super(Traza.class);
        orderBy = "idTraza";
    }

    @Override
    public Traza actualizarEntidad(Integer id, Traza t) {
        Traza traza = em.find(Traza.class, id);
        traza.setAccion(t.getAccion());
        traza.setUrl(t.getUrl());
        traza.setFecha(t.getFecha());
        traza.setUsuario(t.getUsuario());
        em.merge(traza);
        return traza;
    }

}
