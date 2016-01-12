<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sistema de Gestión Citología | ${pagina}</title>
        <link rel="stylesheet" href="<c:url value="/style.css"/>" media="screen">
        <!--<link type="text/css" rel="stylesheet" href="<c:url value="/theme-triton/theme-triton-all.css"/>"/>-->
        <link type="text/css" rel="stylesheet" href="<c:url value="/theme-triton/Admin-all.css"/>"/>
        <link rel="stylesheet" href="<c:url value="/assets/css/font-awesome.css"/>">
        <link rel="stylesheet" href="<c:url value="/assets/css/misc.css"/>">
        <link rel="stylesheet" href="<c:url value="/assets/css/ionicons.min.css"/>">
        <link rel="stylesheet" href="<c:url value="/assets/css/themify-icons.css"/>">
        <script type="text/javascript" src="<c:url value="/ext-all6.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/sha-512.js"/>"></script>
        <script type="text/javascript">
            var nombreUsuario = '', error = '';
            nombreUsuario = '${sessionScope.LAST_USERNAME}';
            error = '${sessionScope.LAST_EXCEPTION}';
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
                if (existe) {
                    window.history.forward();
                }
            }
        </script>
        <script src="${pagina}.js"></script>
    </head>
    <body>
        <div id="art-main">
            <div id="contenido" style="position: relative; top: 200px;"></div>
        </div>
    </body>
</html>
