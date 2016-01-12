package jpa;

import clases.Facultad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultadJpa extends JpaRepository<Facultad, Integer>, JpaSpecificationExecutor<Facultad> {

}
