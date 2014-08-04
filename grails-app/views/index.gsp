<%@ page import="tv.allplayers.Frame" %>
<!DOCTYPE html>
<html>
	<head>

	</head>
	<body>
        <g:each var="f" in="${Frame.all}">
            <fr:iFrame frame="${f}"/>
        </g:each>
	</body>
</html>
