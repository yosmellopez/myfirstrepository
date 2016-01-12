<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<link type="text/css" rel="stylesheet" href="<c:url value="/ext-theme-classic/ext-theme-neptune-all.css"/>"/>
<script type="text/javascript" src="<c:url value="/ext-all-dev.js"/>"></script>
<script type="text/javascript" src="<c:url value="/ext-locale-es.js"/>"></script>
<script type="text/javascript" src="<c:url value="/validaciones.js"/>"></script>
<script type="text/javascript" src="<c:url value="/sha-512.js"/>"></script>
<link rel="stylesheet" href="<c:url value="/assets/css/bootstrap.min.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/material.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/style.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/animated-masonry-gallery.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/rotated-gallery.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/sweet-alerts/sweetalert.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/font-awesome.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/misc.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/ionicons.min.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/themify-icons.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/css/jtree.css"/>">
<script src="<c:url value="/assets/js/jquery.js"/>"></script>
<script src="<c:url value="/assets/js/app.js"/>"></script>
<script src="<c:url value="/assets/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<script src="<c:url value="/assets/js/bootstrap.min.js"/>"></script>
<script src="<c:url value="/assets/js/jquery.nicescroll.min.js"/>"></script>
<script src="<c:url value="/assets/js/wow.min.js"/>"></script>
<script src="<c:url value="/assets/js/jquery.loadmask.min.js"/>"></script>
<script src="<c:url value="/assets/js/jquery.accordion.js"/>"></script>
<script src="<c:url value="/assets/js/materialize.js"/>"></script>
<script src="<c:url value="/assets/js/build/d3.min.js"/>"></script>
<script src="<c:url value="/assets/js/nvd3/nv.d3.js"/>"></script>
<script src="<c:url value="/assets/js/sparkline.js"/>"></script>
<script src="<c:url value="/assets/js/bic_calendar.js"/>"></script>
<script src="<c:url value="/assets/js/widgets.js"/>"></script>
<script src="<c:url value="/assets/js/core.js"/>"></script>
<script src="<c:url value="/assets/js/jquery.countTo.js"/>"></script>
<sec:authentication property="principal" var="usuario"/>
<script type="text/javascript">
    document.ready = readCookie();
    function readCookie() {
        var nameEQ = "citologia" + "=";
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
            window.location.replace("/Citologia/login.htm");
        }
    }
    var usuario = {}, rol = {};
    <sec:authorize access="isAuthenticated()">
    usuario = {idUsuario:${usuario.idUsuario}, nombre: "${usuario.nombre}", apellidos: "${usuario.apellidos}"};
    rol = {idRol:${usuario.rol.idRol}, rol: "${usuario.rol.rol}", disminutivo: "${usuario.rol.disminutivo}"};
    </sec:authorize>

</script>