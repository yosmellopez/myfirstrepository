package jpa;

import entidades.TarjetaPrueba;
import entidades.TipoCaso;
import java.util.List;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TarjetaPruebaJpaController extends EntitiesRepository<TarjetaPrueba,Integer> {

    public TarjetaPruebaJpaController() {
        super(TarjetaPrueba.class);
        orderBy = "idTarjeta";
    }

    @Override
    @Transactional
    public TarjetaPrueba actualizarEntidad(Integer id, TarjetaPrueba t) {
        TarjetaPrueba tarjetaPrueba = em.find(TarjetaPrueba.class, id);
        em.merge(t.getPrimeraCitologia());
        tarjetaPrueba.setAntecedente(t.getAntecedente());
        tarjetaPrueba.setPaciente(t.getPaciente());
        tarjetaPrueba.setPrimeraCitologia(t.getPrimeraCitologia());
        tarjetaPrueba.setTipoCaso(t.getTipoCaso());
        tarjetaPrueba.setEnfermedadesTransmisionSexual(t.getEnfermedadesTransmisionSexual());
        em.merge(tarjetaPrueba);
        return tarjetaPrueba;
    }

    @Transactional
    public List<TipoCaso> listarTodosTiposCasos() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(TipoCaso.class);
        cq.select(from).orderBy(cb.asc(from.get("idTipoCaso")));
        Query q = em.createQuery(cq);
        return q.getResultList();
    }

}
