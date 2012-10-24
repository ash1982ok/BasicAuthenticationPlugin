BasicAuthenticationPlugin
=========================

This is a Jquery/Zepto plugin for http basic authentication.

USAGE
------------
1) isValidUser will return only true/false to indicate validity of user
<br><br><b>
var isValidUser = $().BasicAuth('isValidUser',{
				userName:"Ashok",
				password:"Password"
}); </b>
<br>		
or 
<br>
<br>
2) authenticate will return the user details returned by the service<br><b>
var userDetails = $().BasicAuth('authenticate',{
				userName:"Ashok",
				password:"Password"
			}); 