package controladoresJpa;

import clases.ListaEspera;
import java.util.List;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ListaEsperaJpaController extends EntitiesRepository<ListaEspera, Integer> {

    public ListaEsperaJpaController() {
        super(ListaEspera.class);
    }

    @Override
    @Transactional
    public ListaEspera actualizarEntidad(Integer id, ListaEspera t) {
        ListaEspera listaEspera = em.getReference(ListaEspera.class, id);
        listaEspera.setNombreLista(t.getNombreLista());
        listaEspera.setPrioridad(t.getPrioridad());
        em.merge(listaEspera);
        return listaEspera;
    }

    public ListaEspera listarPorPrioridades(int prioridad) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(ListaEspera.class);
        cq.select(from).where(cb.equal(from.get("prioridad"), prioridad));
        TypedQuery query = em.createQuery(cq);
        return (ListaEspera) query.getSingleResult();
    }
}
