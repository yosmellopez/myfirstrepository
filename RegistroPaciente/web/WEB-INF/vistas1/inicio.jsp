<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Postgrado - Universidad de las Tunas</title>
        <c:import url="/bloques/assets.jsp"/>
        <script type="text/javascript" src="appUsuarios.js"></script>
    </head>

    <body class="skin-blue sidebar-mini">
        <div class="content-wrapper" style="min-height: 916px;">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1>
                    <span style="color: #000;">Administración de Usuarios</span>
                    <small>Panel de Control</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href="index.htm"><i class="fa fa-dashboard"></i> Inicio</a></li>
                    <li class="active">Listado de Usuarios</li>
                </ol>
            </section>
            <!-- Main content -->
            <section class="content">
                <div class="row">
                    <section class="col-lg-5 connectedSortable ui-sortable">
                        <div class="box box-solid bg-light-blue-gradient">
                            <div class="box-header ui-sortable-handle" style="cursor: move;">
                                <div class="pull-right box-tools">
                                    <button style="margin-right: 5px;" title="Collapse" data-toggle="tooltip" data-widget="collapse" class="btn btn-primary btn-sm pull-right"><i class="fa fa-minus"></i></button>
                                </div>
                                <i class="fa fa-users"></i>
                                <h3 class="box-title">
                                    Listado de Usuarios
                                </h3>
                            </div>
                            <div class="box-body">
                                <div style="min-height: 500px; width: 100%;" id="panelcentro">
                                    <div style="width: 100%; height: 100%; position: relative; overflow: hidden; background-color: transparent;">
                                        <div id="contenido">
                                            <c:forEach items="${lista}" var="r">
                                                <p>${r.rol}</p>
                                            </c:forEach>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- /.box-body-->
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </body>
</html>