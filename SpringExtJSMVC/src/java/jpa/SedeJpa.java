package jpa;

import clases.Sede;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SedeJpa extends JpaRepository<Sede, Integer>, JpaSpecificationExecutor<Sede> {

}
