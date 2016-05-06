<%@ page isELIgnored="false" %>
<%@ taglib prefix='spring' uri='http://www.springframework.org/tags' %>

<!DOCTYPE html>

<html>
  <head>
    <title>Calories App</title>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
    <link rel='stylesheet' type='text/css' href='<spring:url htmlEscape="true" value="/css/bootstrap/bootstrap.css"/>' />
    <link rel='stylesheet' type='text/css' href='<spring:url htmlEscape="true" value="/css/style.css"/>'/>
  </head>
  <body>
    <script>window.contextPath = '<spring:escapeBody javaScriptEscape="true">${pageContext.request.contextPath}</spring:escapeBody>';</script>
    <div id='app'></div>
    <script type='text/javascript' src='<spring:url htmlEscape="true" value="/js/_bundle.js"/>'></script>
  </body>
</html>
