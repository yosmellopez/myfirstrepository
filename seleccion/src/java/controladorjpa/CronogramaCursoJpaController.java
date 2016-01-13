/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.CronogramaCurso;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CronogramaCursoJpaController extends RepositorioEntidades<CronogramaCurso, Integer> {

    public CronogramaCursoJpaController() {
        super(CronogramaCurso.class);
        orderBy = "idCronogramaCurso";
    }

    @Override
    @Transactional
    public CronogramaCurso actualizarEntidad(Integer id, CronogramaCurso t) {
        CronogramaCurso cronogramaCurso = em.find(CronogramaCurso.class, id);
        cronogramaCurso.setLugar(t.getLugar());
        cronogramaCurso.setTipoCurso(t.getTipoCurso());
        cronogramaCurso.setFechaFin(t.getFechaFin());
        cronogramaCurso.setCapacidad(t.getCapacidad());
        cronogramaCurso.setFechaInicio(t.getFechaInicio());
        cronogramaCurso.setAspirantes(t.getAspirantes());
        em.merge(cronogramaCurso);
        return cronogramaCurso;

    }
}
