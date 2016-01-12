package utiles;

import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

public class MapeadorJacksonVistaJson extends MappingJackson2JsonView {

    public MapeadorJacksonVistaJson() {
        setObjectMapper(new MapeadorObjetos());
    }

}
