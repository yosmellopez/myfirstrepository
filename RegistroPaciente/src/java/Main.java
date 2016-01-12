
import clases.Operacion;
import controladoresJpa.ReporteJpaController;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Main {

    public static void main(String[] args) throws ParseException {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("RegistroPaciente");
        EntityManager em = factory.createEntityManager();
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/yyyy");
        Date fecha = dateFormat.parse("12/2015");
        ReporteJpaController controller = new ReporteJpaController();
        controller.setEm(em);
        List<Operacion> operacionesMes = controller.pacientescancerDetectadosMes(fecha);
        for (Operacion operacion : operacionesMes) {
            System.out.println(operacion.getPaciente().getNombre());
        }
    }
}
