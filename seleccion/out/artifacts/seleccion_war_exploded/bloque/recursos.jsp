<%@page pageEncoding="UTF-8" contentType="text/html" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/bootstrap-responsive.min.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/bootstrap.min.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/animate.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/flaty-responsive.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/flaty.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/font-awesome.min2.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/ionicons.min.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/themify-icons.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/flaty/normalize.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/theme-triton/theme-triton-all.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/theme-triton/Admin-all.css"/>"/>
<script type="text/javascript" src="<c:url value="/ext-all-debug.js"/>"></script>
<script type="text/javascript" src="<c:url value="/validaciones.js"/>"></script>
<script type="text/javascript" src="<c:url value="/locale-es.js"/>"></script>
<script type="text/javascript" src="<c:url value="/validaciones.js"/>"></script>
<script type="text/javascript" src="<c:url value="/flaty/jquery.js"/>"></script>
<script type="text/javascript" src="<c:url value="/flaty/d3.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/flaty/nv.d3.js"/>"></script>
<script type="text/javascript" src="<c:url value="/flaty/bootstrap.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/flaty/flaty.js"/>"></script>
<script type="text/javascript" src="<c:url value="/flaty/modernizr.js"/>"></script>
<script type="text/javascript" src="<c:url value="/flaty/jquery.nicescroll.js"/>"></script>
<script type="text/javascript">
    document.ready = readCookie();
    function readCookie() {
        var nameEQ = 'seleccion' + "=";
        var ca = document.cookie.split(';');
        existe = false;
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                existe = true;
            }
        }
        if (!existe) {
            window.location.replace('/seleccion/login.htm');
        }
    }
</script>
<style type="text/css">
    .jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}
</style>