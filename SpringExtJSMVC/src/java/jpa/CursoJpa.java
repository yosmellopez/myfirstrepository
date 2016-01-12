package jpa;

import clases.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoJpa extends JpaRepository<Curso, Integer>, JpaSpecificationExecutor<Curso> {

}
