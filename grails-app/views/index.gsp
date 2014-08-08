<%@ page import="tv.allplayers.Frame" %>
<!DOCTYPE html>
<html>
	<head>
        <asset:stylesheet src="main.css"/>
        <asset:javascript src="application.js"/>
        <asset:javascript src="angular.js"/>
        <asset:javascript src="angular-resource.js"/>
	</head>
	<body>
        <div ng-app="framesApp">
            <div ng-view/>
        </div>
	</body>
</html>
