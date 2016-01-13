<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="ftm" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<sec:authentication property="principal" var="u"/>
<jsp:useBean id="now" class="java.util.Date"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Perfil de ${u.nombre} ${u.apellidos} | Postgrado - Universidad de las Tunas</title>
        <c:import url="/bloque/recursos.jsp"/>
        <script type="text/javascript">
            var usuario = '${u.usuario}', nombre = '${u.nombre}', apellidos = '${u.apellidos}', idUsuario = ${u.idUsuario};
        </script>
        <script type="text/javascript" src="<c:url value="/perfil.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/sha-512.js"/>"></script>

    </head>
    <body class="skin-blue sidebar-mini">
        <c:import url="/bloque/menu_arriba.jsp"/>
        <div id="main-container" class="container-fluid">
            <c:import url="/bloque/menu_izquierdo.jsp"/>
            <div id="main-content">
                <!-- BEGIN Page Title -->
                <div class="page-title">
                    <div>
                        <h1><i class="icon-user"></i> Perfil de Usuario</h1>
                    </div>
                </div>
                <div id="breadcrumbs">
                    <ul class="breadcrumb">
                        <li class="active"><a href="inicio.htm"><i class="icon-home"></i> Inicio</a></li>
                    </ul>
                    <div class="row-fluid">
                        <div class="span6">
                            <div class="box box-blue">
                                <div class="box-title">
                                    <h3><i class="icon-edit-sign"></i> Editar Datos de Mi Perfil</h3>
                                    <div class="box-tool">
                                        <a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a>
                                    </div>
                                </div>
                                <div class="box-content">
                                    <div id="perfil" style="margin: auto auto;width: 100%;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="box box-green">
                                <div class="box-title">
                                    <h3><i class="icon-user"></i> Datos de ${u.nombre}</h3>
                                    <div class="box-tool">
                                        <a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a>
                                    </div>
                                </div>
                                <div class="box-content">
                                    <div><label>Nombre:  ${u.nombre}</label></div>
                                    <div><label>Apellidos:  ${u.apellidos}</label></div>
                                    <div><label>Usuario:  ${u.usuario}</label></div>
                                    <div style="margin-bottom: 20px;"><label>Rol en el Sistema:  ${u.rol.rol}</label></div>
                                    <fieldset class="perfil" style="border: 1px solid #AAC3FB; min-height: 20px; width: 100%; margin: auto auto 10px; padding: 5px;color: #000;">
                                        <legend>Configuración de la Cuenta</legend>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <p>2015 &copy; Universidad de las Tunas.</p>
                </footer>
                <a href="#" class="btn btn-circle btn-large" id="btn-scrollup" style="display: none;"><i class="icon-chevron-up"></i></a>
            </div>
        </div>
    </div>
</body>
</html>