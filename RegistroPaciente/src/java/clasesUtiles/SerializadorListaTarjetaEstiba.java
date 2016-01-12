/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clasesUtiles;

import clases.Recurso;
import clases.TarjetaEstiba;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.util.List;

/**
 *
 * @author Postgrado
 */
public class SerializadorListaTarjetaEstiba extends JsonSerializer<List<TarjetaEstiba>> {

    @Override
    public void serialize(List<TarjetaEstiba> value, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
        for (TarjetaEstiba tarjetaEstiba : value) {
            Recurso recurso = tarjetaEstiba.getRecurso();
            tarjetaEstiba.setRecurso(new Recurso(recurso.getIdRecurso(), recurso.getNombre(), recurso.getCantidadRestante()));
        }
        gen.writeObject(value);
    }

}
