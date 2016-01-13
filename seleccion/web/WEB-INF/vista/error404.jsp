<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome to Spring Web MVC project</title>
        <c:import url="/bloque/recursos.jsp"/>
        <style>
            .hermanos{
                display: table-cell;
            }
        </style>
    </head>
    <body class="error-page">
        <div class="error-wrapper" style="width: 450px;">
            <h4>Página No Encontrada<span>404</span></h4>
            <p>Oops! Lo sentimos, la página no ha podido encontrarse.<br>Verifique que la url este escrita correctamente?.</p>
            <br>
            <form method="post" action="http://themes.shamsoft.ir/flaty/index.html">
                <div class="control-group">
                    <div class="input-append">
                        <input type="text" class="input-block-level hermanos" name="" placeholder="Inserte criterio de busqueda..."/>
                        <button type="submit" class="btn btn-primary hermanos"><i class="icon-search"></i></button>
                    </div>
                </div>
            </form>
            <hr>
            <p class="clearfix">
                <a class="pull-left" href="javascript:history.back()">← Ir a la página anterior</a>
                <a class="pull-right" href="inicio.htm">Ir al inicio</a>
            </p>
        </div>
    </body>
</html>