//	TODO: replace jQuery with CORE methods

	function C_CheckboxField()
	{
		var $=this,
			_=null;
		
		$.object_dom___component					=_;
		$.string___DOM_name							=_;

//	ANALYZE: var name
		$.integer___ordinal_index					=_;
		
		$.object___C_Form							=_;
		
		$.bool___autofocus							=false;
		$.bool___disabled							=false;
		$.bool___required							=false;
		
		$.object_dom___validation_error_decription	=_;
		
		$.object_dom___field						=_;
		
		$.F_Initialize=function(object___configuration)
		{
/* DEBUG -> */
			if (object___configuration)
			{
/* <- DEBUG */
				$.object_dom___component					=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id)
															/* DEBUG -> */||__object___E_Debugger.F_LogError
																({
																	varchar___class_name:'C_CheckboxField',
																	varchar___method_name:'F_Initialize',
																	string___description:"Unable get DOM element by id=\""+object___configuration.string___DOM_id+"\""
																})/* <- DEBUG */;
				$.string___DOM_name							=object___configuration.string___DOM_name
															/* DEBUG -> */||__object___E_Debugger.F_LogError
																({
																	varchar___class_name:'C_CheckboxField',
																	varchar___method_name:'F_Initialize',
																	string___description:"Component DOM name is 'null' or 'undefined'"
																})/* <- DEBUG */;
				
				$.bool___autofocus							=object___configuration.bool___autofocus||$.bool___autofocus;
				$.bool___disabled							=object___configuration.bool___disabled||$.bool___disabled;
				$.bool___required							=object___configuration.bool___required||$.bool___required;
				
				$.object_dom___validation_error_decription	=jQuery($.object_dom___component).find(".class_div___element-CheckboxField--validation_error_decription")[0]||$.object_dom___validation_error_decription;
				
				$.object_dom___field						=jQuery($.object_dom___component).find('input')[0];
				
//	Init default value
//				if ($.object_dom___field.checked)
//				{
					
//				}
				
/* DEBUG -> */
			}
			else
			{
				__object___E_Debugger.F_LogError
				({
					varchar___class_name:'C_CheckboxField',
					varchar___method_name:'F_Initialize',
					string___description:"'object___configuration' null or undefined"
				});
			}
/* <- DEBUG */
		};
		

//	*************************************************************************************************************************************************************************************************************
//	*************************************************************************************************************************************************************************************************************

//	PERFORMANCE,ANALYZE: necessity to use cached value for some check or etc.
		$.F_GetValue=function()
		{
//	ANALYZE: logic
			if ($.object_dom___field.checked)
				return 1;
			else
				return '';
		};

//	*************************************************************************************************************************************************************************************************************
//	*************************************************************************************************************************************************************************************************************
		
		$.F_Validate=function()
		{
			if ($.bool___required && !$.F_GetValue())
			{
				$.F_SetValidationStatus(false,'empty_field');
				return false;
			}
			
//	ANALYZE: way how to validate each value in multivalues mode
						
			$.F_SetValidationStatus(true);
			return true;
		};
		
		$.F_SetValidationStatus=function(bool___status,varchar___error_type,string___error_desription)
		{
//	ANALYZE: way to use custom description text for each 'error_type'
			if (bool___status)
			{				
				$.object_dom___component.children[0].className="class___element-validation_status__success";

				if ($.object_dom___validation_error_decription)
					$.object_dom___validation_error_decription.innerHTML="";
			}
			else if (varchar___error_type=='empty_field')
			{
				$.object_dom___component.children[0].className="class___element-validation_status__error class___element-validation_error_type__empty_field";

				if ($.object_dom___validation_error_decription)
					$.object_dom___validation_error_decription.innerHTML="Please select this checkbox!";
			}
		};
		
		$.F_ResetValidationStatus=function()
		{
			$.object_dom___component.children[0].className="";
		};
		
	};
	var __object_object___C_CheckboxField={};
	
	
	

	
	
	
	