package jpa;

import entidades.AreaSalud;
import entidades.Consultorio;
import entidades.Paciente;
import java.util.List;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class PacienteJpaController extends EntitiesRepository<Paciente, Integer> {

    public PacienteJpaController() {
        super(Paciente.class);
        orderBy = "idPaciente";
    }

    @Override
    @Transactional
    public Paciente actualizarEntidad(Integer id, Paciente t) {
        Paciente paciente = em.find(Paciente.class, id);
        paciente.setCi(t.getCi());
        paciente.setConsulta(t.getConsulta());
        paciente.setConsultorio(t.getConsultorio());
        paciente.setDetencionPrecoz(t.getDetencionPrecoz());
        paciente.setEdad(t.getEdad());
        paciente.setOcupacion(t.getOcupacion());
        paciente.setHistoriaClinica(t.getHistoriaClinica());
        paciente.setNombre(t.getNombre());
        paciente.setPrimerApellido(t.getPrimerApellido());
        paciente.setSegundoApellido(t.getSegundoApellido());
        paciente.setMunicipio(t.getMunicipio());
        paciente.setTelefono(t.getTelefono());
        em.merge(paciente);
        return paciente;
    }

    @Transactional(readOnly = true)
    public List<Consultorio> listarTodosConsultorios() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(Consultorio.class);
        cq.select(from).orderBy(cb.asc(from.get("idConsultorio")));
        Query q = em.createQuery(cq);
        return q.getResultList();
    }

    public List<AreaSalud> listarAreasSalud() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(AreaSalud.class);
        cq.select(from).orderBy(cb.asc(from.get("idAreaSalud")));
        Query q = em.createQuery(cq);
        return q.getResultList();
    }

}
