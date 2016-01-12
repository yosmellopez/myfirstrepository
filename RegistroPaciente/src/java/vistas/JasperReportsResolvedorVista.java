package vistas;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import javax.sql.DataSource;
import org.springframework.web.servlet.view.AbstractUrlBasedView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsView;

public class JasperReportsResolvedorVista extends UrlBasedViewResolver {

    private String reportDataKey;

    private Properties subReportUrls;

    private String[] subReportDataKeys;

    private Properties headers;

    private Map<String, Object> exporterParameters = new HashMap<>();

    private DataSource jdbcDataSource;

    /**
     * Requires the view class to be a subclass of
     * {@link AbstractJasperReportsView}.
     *
     * @return
     */
    @Override
    protected Class requiredViewClass() {
        return AbstractJasperReportsView.class;
    }

    /**
     * Set the {@code reportDataKey} the view class should use.
     *
     * @param reportDataKey
     * @see AbstractJasperReportsView#setReportDataKey
     */
    public void setReportDataKey(String reportDataKey) {
        this.reportDataKey = reportDataKey;
    }

    /**
     * Set the {@code subReportUrls} the view class should use.
     *
     * @param subReportUrls
     * @see AbstractJasperReportsView#setSubReportUrls
     */
    public void setSubReportUrls(Properties subReportUrls) {
        this.subReportUrls = subReportUrls;
    }

    /**
     * Set the {@code subReportDataKeys} the view class should use.
     *
     * @param subReportDataKeys
     * @see AbstractJasperReportsView#setSubReportDataKeys
     */
    public void setSubReportDataKeys(String[] subReportDataKeys) {
        this.subReportDataKeys = subReportDataKeys;
    }

    /**
     * Set the {@code headers} the view class should use.
     *
     * @param headers
     * @see AbstractJasperReportsView#setHeaders
     */
    public void setHeaders(Properties headers) {
        this.headers = headers;
    }

    /**
     * Set the {@code exporterParameters} the view class should use.
     *
     * @param exporterParameters
     * @see AbstractJasperReportsView#setExporterParameters
     */
    public void setExporterParameters(Map<String, Object> exporterParameters) {
        this.exporterParameters = exporterParameters;
    }

    /**
     * Set the {@link DataSource} the view class should use.
     *
     * @param jdbcDataSource
     * @see AbstractJasperReportsView#setJdbcDataSource
     */
    public void setJdbcDataSource(DataSource jdbcDataSource) {
        this.jdbcDataSource = jdbcDataSource;
    }

    @Override
    protected AbstractUrlBasedView buildView(String viewName) throws Exception {
        AbstractJasperReportsView view = (AbstractJasperReportsView) super.buildView(viewName);
        view.setReportDataKey(this.reportDataKey);
        view.setSubReportUrls(getUrlsSubReporte(viewName));
        view.setSubReportDataKeys(getClavesSubReporte(viewName));
        view.setHeaders(this.headers);
        view.setExporterParameters(this.exporterParameters);
        view.setJdbcDataSource(this.jdbcDataSource);
        return view;
    }

    private String[] getClavesSubReporte(String vista) {
        switch (vista) {
            case "reporteCienciaTecnica":
                return new String[]{};
            case "reportePlanificaciones":
                String[] elementos = new String[5];
                for (int i = 7; i < 12; i++) {
                    elementos[i - 7] = subReportDataKeys[i];
                }
                return elementos;
        }
        String[] elementos = new String[7];
        System.arraycopy(subReportDataKeys, 0, elementos, 0, 7);
        return elementos;
    }

    private Properties getUrlsSubReporte(String vista) {
        switch (vista) {
            case "reporteCienciaTecnica":
                return new Properties();
            case "reportePlanificaciones":
                Properties subReportes = new Properties();
                subReportes.put("urlForum", subReportUrls.get("urlForum"));
                subReportes.put("urlRegistroInformatico", subReportUrls.get("urlRegistroInformatico"));
                subReportes.put("urlRegistroNoInformatico", subReportUrls.get("urlRegistroNoInformatico"));
                subReportes.put("urlPlanificacionPatente", subReportUrls.get("urlPlanificacionPatente"));
                subReportes.put("urlPlanificacionPublicaciones", subReportUrls.get("urlPlanificacionPublicaciones"));
                return subReportes;
        }
        Properties subReportes = new Properties();
        subReportes.put("librosLocation", subReportUrls.get("librosLocation"));
        subReportes.put("publicacionesLocation", subReportUrls.get("publicacionesLocation"));
        subReportes.put("monografiasLocation", subReportUrls.get("monografiasLocation"));
        subReportes.put("patentesLocation", subReportUrls.get("patentesLocation"));
        subReportes.put("registrosLocation", subReportUrls.get("registrosLocation"));
        subReportes.put("eventosLocation", subReportUrls.get("eventosLocation"));
        subReportes.put("normasLocation", subReportUrls.get("normasLocation"));
        return subReportes;
    }
}
