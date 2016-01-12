package vistas;

import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.export.ooxml.JRPptxExporter;
import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsSingleFormatView;

public class JasperReportsPptView extends AbstractJasperReportsSingleFormatView {
    
    public JasperReportsPptView() {
        setContentType("application/vnd.ms-powerpoint");
    }
    
    @Override
    protected JRExporter createExporter() {
        return new JRPptxExporter();
    }
    
    @Override
    protected boolean useWriter() {
        return false;
    }
    
}
