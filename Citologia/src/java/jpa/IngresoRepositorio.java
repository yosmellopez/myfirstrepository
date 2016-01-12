package jpa;

import entidades.Ingreso;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository

public class IngresoRepositorio extends EntitiesRepository<Ingreso, Integer> {
    
    public IngresoRepositorio() {
        super(Ingreso.class);
        orderBy = "idIngreso";
    }
    
    @Override
    @Transactional
    public Ingreso actualizarEntidad(Integer id, Ingreso t) {
        Ingreso ingreso = em.find(Ingreso.class, id);
        ingreso.setAgrupar(t.getAgrupar());
        ingreso.setCama(t.getCama());
        ingreso.setDiagnosticoProbable(t.getDiagnosticoProbable());
        ingreso.setFecha(t.getFecha());
        ingreso.setMeridiano(t.getMeridiano());
        ingreso.setPaciente(t.getPaciente());
        em.merge(ingreso);
        return ingreso;
    }
}
