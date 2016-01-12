package vistas;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.BeanFactoryUtils;
import org.springframework.core.OrderComparator;
import org.springframework.core.Ordered;
import org.springframework.http.MediaType;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.accept.ContentNegotiationManagerFactoryBean;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.SmartView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.jasperreports.JasperReportsViewResolver;

public class ContentNegociationResolvedorVista extends ContentNegotiatingViewResolver {

    private static final Log loggerC = LogFactory.getLog(ContentNegociationResolvedorVista.class);

    private int order = Ordered.HIGHEST_PRECEDENCE;

    private ContentNegotiationManager contentNegotiationManager;

    private final ContentNegotiationManagerFactoryBean cnManagerFactoryBean = new ContentNegotiationManagerFactoryBean();

    private boolean useNotAcceptableStatusCode = false;

    private List<View> defaultViews;

    private List<ViewResolver> viewResolvers;

    @Override
    public void setOrder(int order) {
        this.order = order;
    }

    @Override
    public int getOrder() {
        return this.order;
    }

    @Override
    public void setContentNegotiationManager(ContentNegotiationManager contentNegotiationManager) {
        this.contentNegotiationManager = contentNegotiationManager;
    }

    @Override
    public void setUseNotAcceptableStatusCode(boolean useNotAcceptableStatusCode) {
        this.useNotAcceptableStatusCode = useNotAcceptableStatusCode;
    }

    @Override
    public void setDefaultViews(List<View> defaultViews) {
        this.defaultViews = defaultViews;
    }

    @Override
    public void setViewResolvers(List<ViewResolver> viewResolvers) {
        this.viewResolvers = viewResolvers;
    }

    public List<ViewResolver> getViewResolvers() {
        return viewResolvers;
    }

    @Override
    protected void initServletContext(ServletContext servletContext) {
        Collection<ViewResolver> matchingBeans = BeanFactoryUtils.beansOfTypeIncludingAncestors(getApplicationContext(), ViewResolver.class).values();
        if (this.viewResolvers == null) {
            this.viewResolvers = new ArrayList<>(matchingBeans.size());
            for (ViewResolver viewResolver : matchingBeans) {
                if (this != viewResolver) {
                    this.viewResolvers.add(viewResolver);
                }
            }
        } else {
            for (int i = 0; i < viewResolvers.size(); i++) {
                if (matchingBeans.contains(viewResolvers.get(i))) {
                    continue;
                }
                String name = viewResolvers.get(i).getClass().getName() + i;
                getApplicationContext().getAutowireCapableBeanFactory().initializeBean(viewResolvers.get(i), name);
            }

        }
        if (this.viewResolvers.isEmpty()) {
            loggerC.warn("Did not find any ViewResolvers to delegate to; please configure them using the "
                    + "'viewResolvers' property on the ContentNegotiatingViewResolver");
        }
        OrderComparator.sort(this.viewResolvers);
        this.cnManagerFactoryBean.setServletContext(servletContext);
    }

    @Override
    public void afterPropertiesSet() {
        if (this.contentNegotiationManager == null) {
            this.cnManagerFactoryBean.afterPropertiesSet();
            this.contentNegotiationManager = this.cnManagerFactoryBean.getObject();
        }
    }

    @Override
    public View resolveViewName(String viewName, Locale locale) throws Exception {
        RequestAttributes attrs = RequestContextHolder.getRequestAttributes();
        Assert.isInstanceOf(ServletRequestAttributes.class, attrs);
        List<MediaType> requestedMediaTypes = getMediaTypes(((ServletRequestAttributes) attrs).getRequest());
        if (requestedMediaTypes != null) {
            List<View> candidateViews = getCandidateViews(viewName, locale, requestedMediaTypes);
            View bestView = getBestView(candidateViews, requestedMediaTypes, attrs);
            if (bestView != null) {
                return bestView;
            }
        }
        if (this.useNotAcceptableStatusCode) {
            if (loggerC.isDebugEnabled()) {
                loggerC.debug("No acceptable view found; returning 406 (Not Acceptable) status code");
            }
            return NOT_ACCEPTABLE_VIEW;
        } else {
            loggerC.debug("No acceptable view found; returning null");
            return null;
        }
    }

    @Override
    protected List<MediaType> getMediaTypes(HttpServletRequest request) {
        try {
            ServletWebRequest webRequest = new ServletWebRequest(request);
            List<MediaType> acceptableMediaTypes = this.contentNegotiationManager.resolveMediaTypes(webRequest);
            acceptableMediaTypes = acceptableMediaTypes.isEmpty()
                    ? Collections.singletonList(MediaType.ALL) : acceptableMediaTypes;
            List<MediaType> producibleMediaTypes = getProducibleMediaTypes(request);
            Set<MediaType> compatibleMediaTypes = new LinkedHashSet<>();
            for (MediaType acceptable : acceptableMediaTypes) {
                for (MediaType producible : producibleMediaTypes) {
                    if (acceptable.isCompatibleWith(producible)) {
                        compatibleMediaTypes.add(getMostSpecificMediaType(acceptable, producible));
                    }
                }
            }
            List<MediaType> selectedMediaTypes = new ArrayList<>(compatibleMediaTypes);
            MediaType.sortBySpecificityAndQuality(selectedMediaTypes);
            if (loggerC.isDebugEnabled()) {
                loggerC.debug("Requested media types are " + selectedMediaTypes + " based on Accept header types "
                        + "and producible media types " + producibleMediaTypes + ")");
            }
            return selectedMediaTypes;
        } catch (HttpMediaTypeNotAcceptableException ex) {
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    private List<MediaType> getProducibleMediaTypes(HttpServletRequest request) {
        Set<MediaType> mediaTypes = (Set<MediaType>) request.getAttribute(HandlerMapping.PRODUCIBLE_MEDIA_TYPES_ATTRIBUTE);
        if (!CollectionUtils.isEmpty(mediaTypes)) {
            return new ArrayList<>(mediaTypes);
        } else {
            return Collections.singletonList(MediaType.ALL);
        }
    }

    private MediaType getMostSpecificMediaType(MediaType acceptType, MediaType produceType) {
        produceType = produceType.copyQualityValue(acceptType);
        return MediaType.SPECIFICITY_COMPARATOR.compare(acceptType, produceType) < 0 ? acceptType : produceType;
    }

    private List<View> getCandidateViews(String viewName, Locale locale, List<MediaType> requestedMediaTypes)
            throws Exception {
        List<View> candidateViews = new ArrayList<>();
        for (ViewResolver viewResolver : this.viewResolvers) {
            if (!(viewResolver instanceof JasperReportsViewResolver)) {
                View view = viewResolver.resolveViewName(viewName, locale);
                if (view != null) {
                    candidateViews.add(view);
                }
                for (MediaType requestedMediaType : requestedMediaTypes) {
                    List<String> extensions = this.contentNegotiationManager.resolveFileExtensions(requestedMediaType);
                    for (String extension : extensions) {
                        String viewNameWithExtension = viewName + "." + extension;
                        view = viewResolver.resolveViewName(viewNameWithExtension, locale);
                        if (view != null) {
                            candidateViews.add(view);
                        }
                    }
                }
            } else {
                if (viewName.equals("reporteOperacionesMes") || viewName.equals("reportePacientesFallecidosMes") || viewName.equals("postgrado")) {
//                    try {
                        View view = viewResolver.resolveViewName(viewName, locale);
                        if (view != null) {
                            candidateViews.add(view);
                            return candidateViews;
                        }
//                    } catch (Exception e) {
//                        if (loggerC.isDebugEnabled()) {
//                            loggerC.debug("No se ha podido mostrar la vista por la siguiente razon [" + e.getMessage() + "]");
//                        }
//                    }
                }
            }
        }
        if (!CollectionUtils.isEmpty(this.defaultViews)) {
            candidateViews.addAll(this.defaultViews);
        }
        return candidateViews;
    }

    private View getBestView(List<View> candidateViews, List<MediaType> requestedMediaTypes, RequestAttributes attrs) {
        for (View candidateView : candidateViews) {
            if (candidateView instanceof SmartView) {
                SmartView smartView = (SmartView) candidateView;
                if (smartView.isRedirectView()) {
                    if (loggerC.isDebugEnabled()) {
                        loggerC.debug("Returning redirect view [" + candidateView + "]");
                    }
                    return candidateView;
                }
            }
        }
        for (MediaType mediaType : requestedMediaTypes) {
            for (View candidateView : candidateViews) {
                if (StringUtils.hasText(candidateView.getContentType())) {
                    MediaType candidateContentType = MediaType.parseMediaType(candidateView.getContentType());
                    if (mediaType.isCompatibleWith(candidateContentType)) {
                        if (loggerC.isDebugEnabled()) {
                            loggerC.debug("Returning [" + candidateView + "] based on requested media type '"
                                    + mediaType + "'");
                        }
                        attrs.setAttribute(View.SELECTED_CONTENT_TYPE, mediaType, RequestAttributes.SCOPE_REQUEST);
                        return candidateView;
                    }
                }
            }
        }
        return null;
    }

    private static final View NOT_ACCEPTABLE_VIEW = new View() {

        @Override
        public String getContentType() {
            return null;
        }

        @Override
        public void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) {
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
        }
    };

}
