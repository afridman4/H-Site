
/*	var __n=null,
		__t=true,
		__f=false;
*/	
	
	var __array___password_symbol=
	[
		'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
		'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
		'0','1','2','3','4','5','6','7','8','9'
	];
	var __array___alphabetical_symbol=
	[
		'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
		'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
	];
	
	function __IdentifyBrowser(varchar___mode)
	{
		var varchar___id, varchar___version_id="";
		
		string___browser_info=window.navigator.userAgent;
		if (!varchar___mode)
		{
			if (string___browser_info.indexOf("MSIE")>0)
			{
				if (string___browser_info.indexOf("MSIE 6.0")>0)
					varchar___version_id='ie6';
				else if (string___browser_info.indexOf("MSIE 7.0")>0)
				{
					if (string___browser_info.indexOf("Trident/4")>0)
						varchar___version_id='ie8c';
					else if (string___browser_info.indexOf("Trident/5")>0)
						varchar___version_id='ie9c';
					else
						varchar___version_id='ie7';
				}
				else if (string___browser_info.indexOf("MSIE 8.0")>0)
					varchar___version_id='ie8';
				else if (string___browser_info.indexOf("MSIE 9.0")>0)
					varchar___version_id='ie9';
				varchar___id='ie';
			}
			else if (string___browser_info.indexOf("Firefox")>0)
			{
				if (string___browser_info.indexOf("Firefox/4")>0)
					varchar___version_id='ff4';
				else if (string___browser_info.indexOf("Firefox/3.6")>0)
					varchar___version_id='ff3.6';
				varchar___id='ff';
			}
			else if (string___browser_info.indexOf("Opera")>=0)
				varchar___id='opera';
			else if (string___browser_info.indexOf("Safari")>=0 && string___browser_info.indexOf("Chrome")==-1)
				varchar___id='safari';
			else if (string___browser_info.indexOf("Chrome")>=0 && string___browser_info.indexOf("Safari")>=0)
				varchar___id='chrome';
				
			return {varchar___id:varchar___id,varchar___version_id:varchar___version_id};
		}
		else if (varchar___mode=='all')
		{
//	DEV:
		};
	};
	
	function __GetVerticalScrollingPostition()
	{
		if (document.documentElement.scrollTop)
			return document.documentElement.scrollTop;
		else if (document.body.scrollTop)
			return document.body.scrollTop;
		else 
			return 0;
	};

	function __GetElementFromMouseCursorPosition(object_dom___event)
	{
		if (navigator.userAgent.match('MSIE') || navigator.userAgent.match('Gecko'))
			return document.elementFromPoint(object_dom___event.clientX,object_dom___event.clientY);
		else
			return document.elementFromPoint(object_dom___event.pageX,object_dom___event.pageY);
	};
	
	function __GenerateId(integer___length)
	{
		if (!integer___length)
			integer___length=10;
		
		var string___result="";
		for (var integer___index=0;integer___index<integer___length;integer___index++)
			if (integer___index==0)
				string___result+=__array___alphabetical_symbol[Math.floor(Math.random()*((__array___alphabetical_symbol.length-1)-0+1))+0];
			else
				string___result+=__array___password_symbol[Math.floor(Math.random()*((__array___alphabetical_symbol.length-1)-0+1))+0];

		return string___result;
	};

	function __F_GetCookie(varchar___name)
	{
		var array___cookie=document.cookie.split(';');		
		var object___search_pattern=eval("/"+varchar___name+"/g");

		for (var integer___index=0;integer___index<array___cookie.length;integer___index++)
		{
			var array___temp=array___cookie[integer___index].split('=');
			if (array___temp[0].search(object___search_pattern)!=-1)
				return unescape(array___temp[1]);
		}
		return false;
	};
	
	function __F_SetCookie(varchar___name,string___value)
	{
		document.cookie=varchar___name+"="+escape(string___value)+";expires=Fri, 31 Dec 2099 23:59:59 GMT;";
	};
	
	function __F_DeleteCookie(varchar___name)
	{		
		document.cookie=varchar___name+"=;expires=Fri, 31 Dec 1999 23:59:59 GMT;";
	};
	
	
	
	function __AddDOMElementClassName(string___name,object_dom___target)
	{
		object_dom___target.className+=' '+string___name;
	};
	function __AddDOMElementClassNameWithCheck(string___name,object_dom___target)
	{
		if (!__CheckDOMElementClassNameAvailability(string___name,object_dom___target))
			object_dom___target.className+=' '+string___name;
	};
	
	function __DeleteDOMElementClassName(string___name,object_dom___target)
	{
//	ANALYZE: if double space after className deletion don't make any problems
		eval("object_dom___target.className=object_dom___target.className.replace(/"+string___name+"/g,'')");
	};
	
	function __DeleteDOMElementClassNameByPattern(object_regexp___pattern,object_dom___target)
	{
//	DEV:... probably need use loop through array of splitted class names
	};
	
	function __CheckDOMElementClassNameAvailability(string___name,object_dom___target)
	{
		eval("var object_regexp___temp=/"+string___name+"/g");
		if (object_dom___target.className.search(object_regexp___temp)!=-1)
			return true;
		return false;
	};
	
	
	function __GetElementAbsoluteXCoordinate(object_dom___element,string___element_limiter_id)
	{
		var integer___x=0;
		if (!string___element_limiter_id)
		{
			do
				integer___x+=parseInt(object_dom___element.offsetLeft);
			while (object_dom___element=object_dom___element.offsetParent);
			return integer___x;
		}
		else
		{
			do
			{
				if (object_dom___element.id==string___element_limiter_id)
					return integer___x;
				integer___x+=parseInt(object_dom___element.offsetLeft);
			}
			while (object_dom___element=object_dom___element.offsetParent);
			return integer___x;
		}
	};
	
	function __GetElementAbsoluteYCoordinate(object_dom___element,string___element_limiter_id)
	{
		var integer___y=0;
		if (!string___element_limiter_id)
		{
			do
				integer___y+=parseInt(object_dom___element.offsetTop);
			while (object_dom___element=object_dom___element.offsetParent);
			return integer___y;
		}
		else
		{
			do
			{
				if (object_dom___element.id==string___element_limiter_id)
					return integer___y;
				integer___y+=parseInt(object_dom___element.offsetTop);
			}
			while (object_dom___element=object_dom___element.offsetParent);
			return integer___y;
		}
	};
	
//	CROSSBROWSER:
	if(typeof(document.documentElement.sourceIndex)=="undefined")
		HTMLElement.prototype.__defineGetter__("sourceIndex",(function(indexOf)
		{
			return function sourceIndex()
			{
				return indexOf.call(this.ownerDocument.getElementsByTagName("*"), this);
			};
		})(Array.prototype.indexOf));
	
	
	
	function __F_TransformObjectToString(object___source,string___item_separator,string___key_value_separator,bool___preserve_key_order)
	{
		var array___temp=[];
		if (bool___preserve_key_order)
		{
//	NOTE: 'var___key' in objects only 'string'
			for (var var___key in object___source)
/* DEBUG -> */	if (typeof(var___key)=='string') /* <- DEBUG */
					array___temp[var___key.substr(1)]=(string___key_value_separator?var___key+string___key_value_separator+object___source[var___key]:object___source[var___key]);
/* DEBUG -> */	else
					__object___E_Debugger.F_LogError
						({
							varchar___method_name:'__F_TransformObjectToString',
							string___description:"'var___key' in object NOT 'string'"
						})/* <- DEBUG */;
			
			
//			console.log(array___temp);
			var array___temp_=[],
				integer___temp=array___temp.length;
			for (var integer___index=0;integer___index<integer___temp;integer___index++)
				if (array___temp[integer___index])
					array___temp_.push(array___temp[integer___index]);
			array___temp=array___temp_;
		}
		else
			for (var var___key in object___source)
				array___temp.push(string___key_value_separator?var___key+string___key_value_separator+object___source[var___key]:object___source[var___key]);
		
		return array___temp.join(string___item_separator);
	};
	
	
/*	var array___temp=[];
	
	array___temp[1]=1;
	array___temp[3]=2;
	array___temp[5]=3;
	if (array___temp[2])
		alert();
	console.log(array___temp.length);
	
	
*/
	
	
	