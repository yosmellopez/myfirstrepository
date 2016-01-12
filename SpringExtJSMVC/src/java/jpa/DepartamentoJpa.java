package jpa;

import clases.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentoJpa extends JpaRepository<Departamento, Integer>, JpaSpecificationExecutor<Departamento> {

}
