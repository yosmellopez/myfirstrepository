package clasesUtiles;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;
import java.io.IOException;
import java.text.SimpleDateFormat;

public class MapeadorObjetos extends ObjectMapper {

    public MapeadorObjetos() {
        Hibernate4Module hbm = new Hibernate4Module();
        hbm.enable(Hibernate4Module.Feature.FORCE_LAZY_LOADING);
        hbm.disable(Hibernate4Module.Feature.USE_TRANSIENT_ANNOTATION);
        registerModule(hbm);
        setDateFormat(new SimpleDateFormat("dd/MM/yyyy"));
        super.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

    @Override
    public <T> T readValue(String content, Class<T> valueType) {
        try {
            return super.readValue(content, valueType);
        } catch (IOException e) {
            return null;
        }
    }

    @Override
    public String writeValueAsString(Object value) {
        try {
            return super.writeValueAsString(value);
        } catch (JsonProcessingException ex) {
            return ex.getMessage();
        }
    }
}
