package controladoresJpa;

import clases.ListaEspera;
import clases.Paciente;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class PacienteJpaController extends EntitiesRepository<Paciente, Integer> {

    public PacienteJpaController() {
        super(Paciente.class);
        orderBy = new String[]{"idPaciente"};
    }

    @Override
    @Transactional
    public Paciente actualizarEntidad(Integer id, Paciente t) {
        Paciente paciente = em.getReference(Paciente.class, id);
        paciente.setApellidos(t.getApellidos());
        paciente.setNombre(t.getNombre());
        paciente.setAreaSalud(t.getAreaSalud());
        paciente.setCausaBaja(t.getCausaBaja());
        paciente.setCi(t.getCi());
        paciente.setComentarioObservaciones(t.getComentarioObservaciones());
        paciente.setDiagnostico(t.getDiagnostico());
        paciente.setEspecialidad(t.getEspecialidad());
        paciente.setFechaEntrada(t.getFechaEntrada());
        paciente.setFechaProbableOperacion(t.getFechaProbableOperacion());
        paciente.setFechaRegistroBaja(t.getFechaRegistroBaja());
        paciente.setGrupoFactor(t.getGrupoFactor());
        paciente.setHistoriaClinica(t.getHistoriaClinica());
        paciente.setListaEspera(t.getListaEspera());
        em.merge(paciente);
        return paciente;
    }

    public List<Paciente> pacientesPorListaEspera(ListaEspera esperas, long dias) {
        List<Paciente> pacientes = new LinkedList<>();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(Paciente.class);
        cq.select(from).where(cb.equal(from.get("listaEspera"), esperas));
        TypedQuery createQuery = em.createQuery(cq);
        List<Paciente> resultList = createQuery.getResultList();
        for (Paciente paciente : resultList) {
            if (diferenciasDias(paciente.getFechaEntrada(), new Date()) > dias) {
                pacientes.add(paciente);
            }
        }
        return pacientes;
    }

    private long diferenciasDias(Date fechaInicio, Date fechaFin) {
        return (fechaFin.getTime() - fechaInicio.getTime()) / 86400000;
    }
}
