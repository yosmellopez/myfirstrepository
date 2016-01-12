package vistas;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsCsvView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsHtmlView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsMultiFormatView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsXlsView;

public class JasperReportsMultiFormatoView extends JasperReportsMultiFormatView {

    public JasperReportsMultiFormatoView() {
        Map<String, Class<? extends AbstractJasperReportsView>> formatMappings = new HashMap(7);
        formatMappings.put("csv", JasperReportsCsvView.class);
        formatMappings.put("html", JasperReportsHtmlView.class);
        formatMappings.put("pdf", JasperReportsPdfView.class);
        formatMappings.put("xls", JasperReportsXlsView.class);
        formatMappings.put("docx", JasperReportsDocView.class);
        formatMappings.put("pptx", JasperReportsPptView.class);
        formatMappings.put("xlsx", JasperReportsXlsxView.class);
        this.setFormatMappings(formatMappings);
    }

}
