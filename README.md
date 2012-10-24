BasicAuthenticationPlugin
=========================

This is a Jquery/Zepto plugin for http basic authentication.

USAGE
------------
1) isValidUser will return only true/false to indicate validity of user
<br>
var isValidUser = $().BasicAuth('isValidUser',{
				userName:"Ashok",
				password:"Password"
			}); 
			
or 
<br>
2) authenticate will return the user details returned by the service
var userDetails = $().BasicAuth('authenticate',{
				userName:"Ashok",
				password:"Password"
			}); 