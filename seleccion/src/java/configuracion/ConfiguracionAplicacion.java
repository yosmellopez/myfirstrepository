package configuracion;

import java.util.LinkedHashMap;
import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class ConfiguracionAplicacion extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{AplicacionContextoWeb.class, ConfiguracionSeguridad.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{ConfiguracionWeb.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceEncoding(true);
        return new Filter[]{new DelegatingFilterProxy("springSecurityFilterChain"),
            new OpenEntityManagerInViewFilter(), encodingFilter};
    }

    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        MultipartConfigElement element = new MultipartConfigElement("uploads", 1024 * 1024 * 10, 1024 * 1024 * 50, 1024 * 1024 * 100);
        registration.setMultipartConfig(element);
        LinkedHashMap<String, String> hashMap = new LinkedHashMap<>();
        hashMap.put("", "");
        registration.setInitParameters(hashMap);
    }
}
