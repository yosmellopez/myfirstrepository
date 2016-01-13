package utiles;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import modelo.ResumenSicometrico;

public class SerializadorListaResumenSicometrico extends JsonSerializer<List<ResumenSicometrico>> {
    
    @Override
    public void serialize(List<ResumenSicometrico> value, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
        List<ResumenSicometrico> expedientes = new ArrayList<>();
        for (ResumenSicometrico resumenSicometrico : value) {
            ResumenSicometrico re = new ResumenSicometrico(resumenSicometrico.getIdResumenSicometrico());
            re.setAspirante(null);
            expedientes.add(re);
        }
        gen.writeObject(expedientes);
    }
    
}
