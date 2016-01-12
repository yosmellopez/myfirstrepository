/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clasesUtiles;

import clases.Recurso;
import clases.TipoOperacion;
import clases.TipoOperacionRecurso;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

public class SerializadorTipoOperacion extends JsonSerializer<List<TipoOperacionRecurso>> {

    @Override
    public void serialize(List<TipoOperacionRecurso> t, JsonGenerator jg, SerializerProvider sp) throws IOException, JsonProcessingException {
        List<TipoOperacionRecurso> recursos = new LinkedList<>();
        for (TipoOperacionRecurso tor : t) {
            TipoOperacion tipoOperacion = new TipoOperacion(tor.getTipoOperacion().getIdTipoOperacion(), tor.getTipoOperacion().getTipo());
            Recurso recurso = new Recurso(tor.getRecurso().getIdRecurso(), tor.getRecurso().getNombre(), tor.getRecurso().getCantidadRestante());
            recursos.add(new TipoOperacionRecurso(tor.getOperacionRecursoPK(), tor.getCantidad(), tipoOperacion, recurso));
        }
        jg.writeObject(recursos);
    }
}
