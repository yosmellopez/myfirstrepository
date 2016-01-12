package vistas;

import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.export.ooxml.JRDocxExporter;
import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsSingleFormatView;

public class JasperReportsDocView extends AbstractJasperReportsSingleFormatView {

    public JasperReportsDocView() {
        setContentType("application/msword");
    }

    @Override
    protected JRExporter createExporter() {
        return new JRDocxExporter();
    }

    @Override
    protected boolean useWriter() {
        return false;
    }

}
