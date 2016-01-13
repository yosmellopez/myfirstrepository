<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome to Spring Web MVC project</title>
        <!--<link rel="stylesheet" href="<c:url value="/style.css"/>" media="screen">-->
        <link type="text/css" rel="stylesheet" href="<c:url value="/theme-triton/Admin-all.css"/>"/>
        <script type="text/javascript" src="<c:url value="/ext-all-debug.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/sha-512.js"/>"></script>
        <script type="text/javascript">
            var nombreUsuario = '', error = '';
            nombreUsuario = '${sessionScope.LAST_USERNAME}';
            error = '${sessionScope.LAST_EXCEPTION}';
        </script>
        <script src="login.js"></script>
    </head>
    <body>
        <div id="art-main">
            <div id="contenido" style="position: relative; top: 200px;"></div>
        </div>
    </body>
</html>
