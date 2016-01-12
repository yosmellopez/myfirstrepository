<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<sec:authentication property="principal" var="u"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sistema de Gestión Citología | Perfil de Usuario</title>
        <c:import url="/bloques/recursos.jsp"/>
        <script src="<c:url value="/${pagina}.js"/>"></script>
        <script type="text/javascript">
            var usuario = '${u.usuario}', nombre = '${u.nombre}', apellidos = '${u.apellidos}', idUsuario = ${u.idUsuario};
        </script>
    </head>
    <body>
        <div id="art-main">
            <c:import url="/bloques/encabezado.jsp"/>
            <c:import url="/bloques/navegacion.jsp"/>

            <div class="art-sheet clearfix">
                <div class="art-layout-wrapper clearfix">
                    <div class="art-content-layout">
                        <div class="art-content-layout-row">
                            <c:import url="/bloques/menuLateral.jsp"/>
                            <div class="art-layout-cell art-content clearfix">
                                <article class="art-post art-article">
                                    <div class="art-postcontent art-postcontent-0 clearfix">
                                        <div class="art-content-layout">
                                            <div class="body">
                                                <fieldset class="perfil" style="border: 1px solid #AAC3FB; min-height: 10px; min-width: 430px; margin: auto auto 10px; padding: 5px;">
                                                    <legend>Datos de Usuario</legend>
                                                    <div><label>Nombre y Apellidos:  </label><label>${u.nombre} ${u.apellidos}</label></div>
                                                    <div><label>Usuario:  </label><label>${u.usuario}</label></div>
                                                    <div><label>Rol:  </label><label>${u.rol.rol}</label></div>
                                                    <div id="contenido" style=" margin: auto auto 10px;"></div>
                                                </fieldset>
                                            </div>
                                        </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="art-page-footer">
                <span id="art-footnote-links"><a href="http://www.artisteer.com/" target="_blank">Web Template</a> created with Artisteer.</span>
            </p>
        </div>
    </body>
</html>
