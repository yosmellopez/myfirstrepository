<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sistema de Gestión Citología | Patologia de Cuello</title>
        <link rel="stylesheet" href="<c:url value="/style.css"/>" media="screen">
        <link rel="stylesheet" href="<c:url value="/style.responsive.css"/>" media="all"/>
        <link type="text/css" rel="stylesheet" href="<c:url value="/ext-theme-classic/ext-theme-classic-all.css"/>"/>
        <script type="text/javascript" src="<c:url value="/ext-all-dev.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/validaciones.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/sha-512.js"/>"></script>
        <script src="<c:url value="/jquery.js"/>"></script>
        <link type="text/css" rel="stylesheet" href="<c:url value="/bootstrap/css/bootstrap.min.css"/>"/>
        <link type="text/css" rel="stylesheet" href="<c:url value="/bootstrap/css/bootstrap-theme.min.css"/>"/>
        <link type="text/css" rel="stylesheet" href="<c:url value="/bootstrap/css/metisMenu.min.css"/>"/>
        <link type="text/css" rel="stylesheet" href="<c:url value="/bootstrap/css/sb-admin.css"/>"/>
        <link type="text/css" rel="stylesheet" href="<c:url value="/bootstrap/font/css/font-awesome.min.css"/>"/>
        <script type="text/javascript" src="<c:url value="/bootstrap/js/bootstrap.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/bootstrap/js/metisMenu.min.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/bootstrap/js/sb-admin.js"/>"></script>
        <script src="<c:url value="/${pagina}.js"/>"></script>
    </head>
    <body>
        <div id="art-main">
            <c:import url="/bloques/encabezado.jsp"/>
            <c:import url="/bloques/navegacion.jsp"/>
            <c:import url="/bloques/centro.jsp"/>
            <p class="art-page-footer">
                <span id="art-footnote-links"><a href="" target="_blank">Plantilla Web</a> Creado.</span>
            </p>
        </div>
    </body>
</html>
