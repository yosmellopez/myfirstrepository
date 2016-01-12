<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sistema de Gestión Citología | ${pagina}</title>
        <c:import url="/bloques/recursos.jsp"/>
        <script src="<c:url value="/${pagina}.js"/>"></script>
    </head>
    <body>
        <div id="art-main">
            <c:import url="/bloques/encabezado.jsp"/>
            <c:import url="/bloques/navegacion.jsp"/>
            <c:import url="/bloques/centro.jsp"/>
            <p class="art-page-footer">
                <span id="art-footnote-links"><a href="http://www.artisteer.com/" target="_blank">Web Template</a> created with Artisteer.</span>
            </p>
        </div>
    </body>
</html>
