<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="s" uri="http://www.springframework.org/tags" %>
<link href="recursos/css/bootstrap.css" rel="stylesheet" />
<link href="recursos/css/bootstrap-responsive.css" rel="stylesheet" />
<link href="recursos/css/stilearn.css" rel="stylesheet" />
<link href="recursos/css/ItemSelector.css" rel="stylesheet" />
<link href="recursos/css/stilearn-responsive.css" rel="stylesheet" />
<link href="recursos/css/stilearn-helper.css" rel="stylesheet" />
<link href="recursos/css/stilearn-icon.css" rel="stylesheet" />
<link href="recursos/css/resume-control.css" rel="stylesheet" />
<link href="recursos/css/resume.css" rel="stylesheet" />
<link href="recursos/css/font-awesome.css" rel="stylesheet" />
<link href="recursos/css/animate.css" rel="stylesheet" />
<link href="recursos/css/uniform.default.css" rel="stylesheet" />
<link href="recursos/css/select2.css" rel="stylesheet" />
<link href="recursos/css/bootstrap-wysihtml5.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="recursos/ext-theme-gray/ext-theme-gray-all.css">
<script type="text/javascript" src="recursos/ext-all-dev.js"></script>
<script type="text/javascript" src="recursos/ext-lang-es.js"></script>
<script type="text/javascript" src="validaciones.js"></script>
<script src="recursos/js/jquery.js"></script>
<script src="recursos/js/jquery-ui.min.js"></script>
<script src="recursos/js/bootstrap.js"></script>
<script src="recursos/js/uniform/jquery.uniform.js"></script>
<script src="recursos/js/peity/jquery.peity.js"></script>
<script src="recursos/js/select2/select2.js"></script>
<script src="recursos/js/knob/jquery.knob.js"></script>
<script src="recursos/js/wysihtml5/wysihtml5-0.3.0.js"></script>
<script src="recursos/js/wysihtml5/bootstrap-wysihtml5.js"></script>
<script src="recursos/js/calendar/fullcalendar.js"></script> 
<!-- required stilearn template js, for full feature-->
<script src="recursos/js/holder.js"></script>
<script src="recursos/js/stilearn-base.js"></script>
<script type="text/javascript">
    document.ready = readCookie();
    function readCookie() {
        var nameEQ = "registroPaciente" + "=";
        var ca = document.cookie.split(";");
        existe = false;
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ")
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                existe = true;
            }
        }
        if (!existe) {
            window.location.replace("/RegistroPaciente/inicioSesion.htm");
        }
    }
</script>