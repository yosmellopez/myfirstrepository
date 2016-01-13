package vistas;

import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsSingleFormatView;

public class JasperReportsXlsxView extends AbstractJasperReportsSingleFormatView {

    public JasperReportsXlsxView() {
        setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    @Override
    protected JRExporter createExporter() {
        return new JRXlsxExporter();
    }
     

    @Override
    protected boolean useWriter() {
        return false;
    }

}
