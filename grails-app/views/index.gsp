<%@ page import="tv.allplayers.Frame" %>
<!DOCTYPE html>
<html>
	<head>
        <asset:stylesheet src="main.css"/>
        <asset:javascript src="application.js"/>
	</head>
	<body>
        <g:each var="f" in="${Frame.all}">
            <fr:iFrame frame="${f}"/>
        </g:each>
	</body>
</html>
