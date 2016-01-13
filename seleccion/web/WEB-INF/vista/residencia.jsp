<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome to Spring Web MVC project</title>
        <c:import url="/bloque/recursos.jsp"/>
        <script type="text/javascript" src="<c:url value="/appResidencia.js"/>"></script>
    </head>
    <body>
        <c:import url="/bloque/menu_arriba.jsp"/>
        <div id="main-container" class="container-fluid">
            <c:import url="/bloque/menu_izquierdo.jsp"/>
            <div id="main-content">
                <!-- BEGIN Page Title -->
                <div class="page-title">
                    <div>
                        <h1><i class="icon-file-alt"></i> Gestionar Residencia</h1>
                    </div>
                </div>
                <div id="breadcrumbs">
                    <ul class="breadcrumb">
                        <li class="active"><a href="inicio.htm"><i class="icon-home"></i> Inicio</a></li>
                    </ul>
                    <div id="centro" style="width: 100%;"></div>
                </div>
                <footer>
                    <p>2015 &copy; Universidad de las Tunas.</p>
                </footer>

                <a href="#" class="btn btn-circle btn-large" id="btn-scrollup" style="display: none;"><i class="icon-chevron-up"></i></a>
            </div>
        </div>
    </body>
</html>