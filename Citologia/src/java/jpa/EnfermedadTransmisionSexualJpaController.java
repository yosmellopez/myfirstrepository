package jpa;

import entidades.EnfermedadTransmisionSexual;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class EnfermedadTransmisionSexualJpaController extends EntitiesRepository<EnfermedadTransmisionSexual, Integer> {

    public EnfermedadTransmisionSexualJpaController() {
        super(EnfermedadTransmisionSexual.class);
        orderBy = "idEnfermedadTransmisionSexual";
    }

    @Override
    @Transactional
    public EnfermedadTransmisionSexual actualizarEntidad(Integer id, EnfermedadTransmisionSexual t) {
        EnfermedadTransmisionSexual transmisionSexual = em.find(EnfermedadTransmisionSexual.class, id);
        transmisionSexual.setEnfermedad(t.getEnfermedad());
        em.merge(transmisionSexual);
        return transmisionSexual;
    }
}
