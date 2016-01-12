package jpa;

import entidades.AreaSalud;
import entidades.DiagnosticoFinal;
import entidades.EstadisticaMensual;
import entidades.PatologiaCuelloGrupoEdad;
import entidades.TarjetaPrueba;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class EstadisticaJpaController {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    PrimeraCitologiaJpaController jpaController;

    @Autowired
    DiagnosticoFinalJpaController finalJpaController;

    @Autowired
    AreaSaludJpaController saludJpaController;

    public List<EstadisticaMensual> mostrarEstadistica(Date fecha) {
        List<EstadisticaMensual> estadisticasMensuales = new LinkedList<>();
        List<AreaSalud> areaSaluds = saludJpaController.listarTodos();
        int i = 0;
        for (AreaSalud area : areaSaluds) {
            EstadisticaMensual mensual = new EstadisticaMensual(++i, area.getNombre(), cPD(fecha, new DiagnosticoFinal(1), area), cPD(fecha, new DiagnosticoFinal(2), area), cPD(fecha, area));
            estadisticasMensuales.add(mensual);
        }
        return estadisticasMensuales;
    }

    private int cPD(Date fecha, DiagnosticoFinal diagnostico, AreaSalud area) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Calendar c = Calendar.getInstance();
        c.setTime(fecha);
        Root f = cq.from(TarjetaPrueba.class);
        cq.select(cb.count(f)).where(cb.and(cb.equal(f.get("paciente").get("consultorio").get("areaSalud"), area), cb.equal(f.get("primeraCitologia").get("diagnosticoFinal"), diagnostico),
                cb.equal(cb.function("month", Integer.class, f.get("primeraCitologia").get("fechaResultadoFinal")), c.get(Calendar.MONTH) + 1), cb.equal(cb.function("year", Integer.class, f.get("primeraCitologia").get("fechaResultadoFinal")), c.get(Calendar.YEAR))));
        Query query = em.createQuery(cq);
        return ((Long) query.getSingleResult()).intValue();
    }

    private int cPD(Date fecha, AreaSalud area) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Calendar c = Calendar.getInstance();
        c.setTime(fecha);
        Root f = cq.from(TarjetaPrueba.class);
        cq.select(cb.count(f)).where(cb.and(cb.equal(f.get("paciente").get("consultorio").get("areaSalud"), area), cb.notEqual(f.get("primeraCitologia").get("diagnosticoFinal"), new DiagnosticoFinal(1)), cb.notEqual(f.get("primeraCitologia").get("diagnosticoFinal"), new DiagnosticoFinal(2)),
                cb.equal(cb.function("month", Integer.class, f.get("primeraCitologia").get("fechaResultadoFinal")), c.get(Calendar.MONTH) + 1), cb.equal(cb.function("year", Integer.class, f.get("primeraCitologia").get("fechaResultadoFinal")), c.get(Calendar.YEAR))));
        Query query = em.createQuery(cq);
        return ((Long) query.getSingleResult()).intValue();
    }

    @Transactional
    public List<PatologiaCuelloGrupoEdad> mostrarEstadisticaPatologiaCuelloRangoEdad() {
        List<PatologiaCuelloGrupoEdad> patologiaCuelloGrupoEdades = new LinkedList<>();
        List<DiagnosticoFinal> diagnosticoFinales = finalJpaController.listarTodos();
        int edad = 25;
        for (int i = 0; i < 4; i++) {
            int[] a = new int[6];
            int j = 0;
            for (DiagnosticoFinal diagnosticoFinal : diagnosticoFinales) {
                int id = diagnosticoFinal.getIdDiagnosticoFinal();
                if (id >= 2 && id <= 7) {
                    Query query = em.createNamedQuery("TarjetaPrueba.contarDiagnosticos");
                    query.setParameter("diagnosticoFinal", diagnosticoFinal);
                    query.setParameter("edadInicio", edad);
                    query.setParameter("edadFin", edad + 10);
                    a[j++] = ((Long) query.getSingleResult()).intValue();
                }
            }
            PatologiaCuelloGrupoEdad grupoEdad = new PatologiaCuelloGrupoEdad(i + 1, "De " + (edad + 1) + " a " + (edad + 10), a[0], a[1], a[2], a[3], a[4], a[5]);
            patologiaCuelloGrupoEdades.add(grupoEdad);
            edad += 10;
        }
        return patologiaCuelloGrupoEdades;
    }
}
