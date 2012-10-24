/**
 *
 * @author <a href="mailto:ash1982ok@gmail.com">Ashok Kumar</a>
 * @description This is a jQuery Plugin which can be used to authenticate user against authentication Webservice.
 *			  Webservice should be provided by team and this plugin acts as an interface between Webservice (Restful) 
 *			  & application code. 
 * 
 * Note: This is only for HTTP basic authentication
 * 
 * 	Why JQuery/Zepto Plugin?
 *  -----------------------------------------------------------------------------------------
 *	More than 50% of web application in the world uses jQuery hence i wrote jquery plugin. 
 *	Although it can be a separate plain js lib as well. 		
 * 	
 *	Benefit of jQuery plugin
 *	------------------------
 *	Reuse, reuse, reuse
 *	Encapsulation
 *	Easy to write
 *	Maintain chainability
 *	Public distribution
 *	Prevent namespace clashing
 */

// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function ( $, window, document, undefined ) {
    
   // VARIABLE DECLARATION
   // --------------------
   // Create the defaults 
   // isPasswordBase64Encrypted is set to false as we are expecting flat password to be passed in
   // as CIO service expect base64 encoded username/password i.e. Basic HTTP Authentication

    var 
    	defaults = {
        	userName:"",
        	password:"",
        	isPasswordBase64Encrypted:false,
            serviceURL:""
        },

    	settings,

    	// object containing all the methods of plugin
    	methods = {
 
		/* 	
	  		@function 
	   		@description Fuction will return if the user is valid or not
	   		@return Boolean indicating validity of user
		*/
	     isValidUser : function(options) {
		    // Do your awesome plugin stuff here
		    callService(options,'isValidUser');

		    //alert("Hello Plugin World!!!" + "U:" + settings.userName + "P:" + base64_encode(settings.password) + "URL:" + settings.serviceURL);

		    // check validity of options
		    // check serviceURL
		    return true;
		 },


		  /* 	
	  		@function 
	   		@description Fuction will return the user object if user is valid
	   		@return Object having details of user returned by service
		  */
		 authenticate : function(options) {
		  	
		  callService(options,'authenticate');
		    
		    //alert("Hello Plugin World!!!");
		   
		  }
		};

		// PRIVATE FUNCTIONS
		function base64_encode (data) {
		
		  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		    ac = 0,
		    enc = "",
		    tmp_arr = [];

		  if (!data) {
		    return data;
		  }

		  do { // pack three octets into four hexets
		    o1 = data.charCodeAt(i++);
		    o2 = data.charCodeAt(i++);
		    o3 = data.charCodeAt(i++);

		    bits = o1 << 16 | o2 << 8 | o3;

		    h1 = bits >> 18 & 0x3f;
		    h2 = bits >> 12 & 0x3f;
		    h3 = bits >> 6 & 0x3f;
		    h4 = bits & 0x3f;

		    // use hexets to index into b64, and append result to encoded string
		    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		  } while (i < data.length);

		  enc = tmp_arr.join('');

		  var r = data.length % 3;

		  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

		}


		function callService(options,callee)
		{

			settings = $.extend({}, defaults, options); 
			
			var message = settings.userName + ':' + settings.password;

			var soapMessage = base64_encode(message);

			$.ajax({ 
			  url: settings.serviceURL, 
			  type: "GET", 
			  dataType: "xml", 
			  data:'', 
			  beforeSend: function (xhr) { 
			      // passing data in request header
			      xhr.setRequestHeader("Authorization", soapMessage); 
			  }, 
			  success: (callee =='isValidUser'? processXML : authenticateUser), 
			  error: processError, 
			}); 
			      
		}

		function processXML()
		{
			alert("success");
			console.log('success');
		}

		function authenticateUser()
		{
			alert("success1");
			console.log('success1');
		}

		function processError(response)
		{
			alert("error");
			console.log('error');
		}
	

		// PLUGIN CODE 		
		 $.fn.BasicAuth = function( method ) {
	    
		    // Method calling logic
		    if ( methods[method] ) 
		    {
		      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    } 
		    else 
		    {
		      console.log( 'Method ' +  method + ' does not exist on Zepto.Auth' );
		    }    
	  
	  	};


		// returning this to allow jQuery chaining 
		return this;

})( window.jQuery || window.Zepto, window, document );