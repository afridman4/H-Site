
	function E_Debugger()
	{
		var $=this,
			_=null;
		
		
		$.F_Initialize=function(object___configuration)
		{
			
		};
		
		
		$.F_LogError=function(object___details)
		{
			var array___output=[];
			for (var var___key in object___details)
				array___output.push(var___key+" = "+object___details[var___key]);
			
			console.log(array___output.join(", "));
		};
		
		
		
	};
	var __object___E_Debugger=new E_Debugger;
//	var __object_object___E_Debugger={};