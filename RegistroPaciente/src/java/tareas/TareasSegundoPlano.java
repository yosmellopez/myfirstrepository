package tareas;

import clases.ListaEspera;
import clases.Paciente;
import controladoresJpa.ListaEsperaJpaController;
import controladoresJpa.PacienteJpaController;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TareasSegundoPlano {

    @Autowired
    private PacienteJpaController pacienteJpaController;

    @Autowired
    private ListaEsperaJpaController esperaJpaController;

    @Scheduled(cron = "0 0 0 * * *")
    public void ejecutarTareaDias() {
        ListaEspera esperaI = esperaJpaController.listarPorPrioridades(1);
        ListaEspera esperaII = esperaJpaController.listarPorPrioridades(2);
        ListaEspera esperaIII = esperaJpaController.listarPorPrioridades(3);
        List<Paciente> pacientesPorListaEspera = pacienteJpaController.pacientesPorListaEspera(esperaII, 30);
        for (Paciente paciente : pacientesPorListaEspera) {
            paciente.setListaEspera(esperaI);
        }
        pacienteJpaController.actualizarEntidad(pacientesPorListaEspera);
        pacientesPorListaEspera = pacienteJpaController.pacientesPorListaEspera(esperaIII, 30);
        for (Paciente paciente : pacientesPorListaEspera) {
            paciente.setListaEspera(esperaII);
        }
        pacienteJpaController.actualizarEntidad(pacientesPorListaEspera);
        pacientesPorListaEspera = pacienteJpaController.pacientesPorListaEspera(esperaIII, 60);
        for (Paciente paciente : pacientesPorListaEspera) {
            paciente.setListaEspera(esperaI);
        }
        pacienteJpaController.actualizarEntidad(pacientesPorListaEspera);
    }
}
