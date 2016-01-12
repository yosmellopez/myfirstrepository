package controladoresJpa;

import clases.Operacion;
import clases.Paciente;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Repository;

@Repository
public class ReporteJpaController {

    @PersistenceContext
    private EntityManager em;

    public List<Operacion> operacionesMes(Date fechaOperacion) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root<Operacion> from = cq.from(Operacion.class);
        cq.select(from).where(cb.and(cb.equal(cb.function("month", Integer.class, from.get("fechaOperacion")), mesOrYear(fechaOperacion, true)), cb.equal(cb.function("year", Integer.class, from.get("fechaOperacion")), mesOrYear(fechaOperacion, false))));
//        cq.select(from);
        TypedQuery query = em.createQuery(cq);
        return query.getResultList();
    }

    public List<Paciente> pacientesFallecidosMes(Date fechaOperacion) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root<Operacion> from = cq.from(Paciente.class);
        Join<Paciente, Operacion> join = from.join("operaciones");
        cq.select(from).distinct(true).where(cb.and(cb.equal(cb.function("month", Integer.class, join.get("fechaOperacion")), mesOrYear(fechaOperacion, true)), cb.equal(cb.function("year", Integer.class, join.get("fechaOperacion")), mesOrYear(fechaOperacion, false))), cb.equal(join.get("pacienteFallecido"), true));
        TypedQuery query = em.createQuery(cq);
        return query.getResultList();
    }

    public List<Operacion> pacientescancerDetectadosMes(Date fechaOperacion) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root<Operacion> from = cq.from(Operacion.class);
        cq.select(from).where(cb.and(cb.equal(cb.function("month", Integer.class, from.get("fechaOperacion")), mesOrYear(fechaOperacion, true)), cb.equal(cb.function("year", Integer.class, from.get("fechaOperacion")), mesOrYear(fechaOperacion, false))), cb.equal(from.get("cancerDetectado"), true));
        TypedQuery query = em.createQuery(cq);
        return query.getResultList();
    }
    
    private int mesOrYear(Date fecha, boolean mesOrYear) {
        Calendar c = Calendar.getInstance();
        c.setTime(fecha);
        return mesOrYear ? c.get(Calendar.MONTH) + 1 : c.get(Calendar.YEAR);
    }

    public void setEm(EntityManager em) {
        this.em = em;
    }
}
