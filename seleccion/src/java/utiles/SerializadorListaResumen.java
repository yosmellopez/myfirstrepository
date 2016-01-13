/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utiles;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import modelo.ResumenExpediente;

public class SerializadorListaResumen extends JsonSerializer<List<ResumenExpediente>> {
    
    @Override
    public void serialize(List<ResumenExpediente> value, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
        List<ResumenExpediente> expedientes = new ArrayList<>();
        for (ResumenExpediente resumenExpediente : value) {
            ResumenExpediente re = new ResumenExpediente(resumenExpediente.getIdResumenExpediente());
            re.setAntecPenal(resumenExpediente.getAntecPenal());
            expedientes.add(re);
        }
        gen.writeObject(expedientes);
    }
    
}
