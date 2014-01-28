/*
	TODO: analyze naming for function Add or Append
	
	IMPORTANT: need fix for ie6 via iframe to overlay page fields (line input, select, textarea)
	
	TODO: analyze necessity to preserve updated field values after closing/reopening form without data submission
	
	TODO: add method to add custom alert message to each required field
*/
		
	function C_Form()
	{
		var $=this,
			_=null;
		
		$.varchar___class_name='C_Form';
		$.varchar___class_type='component';
		
//	TODO: analyze var name and case when instance is child of parent object (Module etc.)
		$.string___instance_global_access_code="";
		
		$.object_dom___component_DOM_id_prefix	="id_div___component-Form__";
		$.object_dom___component				=_;
		
		$.object_dom___content=_;
		
		$.object___form=
		{
			string___action_path				:"",
			object_dom___form				:_,
			object_dom___visible_fields		:_,
			object_dom___hidden_fields		:_,
			array___hidden_field			:[],
			object___required_field			:{}, // .object___required_field["name_input___field"]=true;
			object___field_value_type_id	:{} // .object___field_value_type["name_input___field"]="email"; current, in future change to ID (like: is3d)
		};
		
//	ANALYZE: var name 'integer___loading_timeout', alternate 'integer___timeout'
		$.object___iframe=
		{
			string__name				:"",
			object_dom___iframe			:_,
			object_dom___parent			:_,
			integer___loading_timeout	:5000,
			handle___loading_timeout	:_
		};
		
		$.array_string___input_field_DOM_id		=[];
		$.string___default_input_field_DOM_id	="";
		
		$.object_dom___submission_status_description	=_;
		$.object_dom___submission_processing_indicator	=_;
		
//	default configuration for form reinitialization if multiple calls require
//	ANALYZE: necessity to store data dublication (configuration object and inside of $.object___form and $.object___iframe)
		$.object___configuration=
		{
		};
		
		$.object___default_configuration=
		{
		};
		
//	ANALYZE,TEMP: names
		$.bool___page_reloading=true;
		
		$.F_ExecuteCodeBeforeSubmission				=_;
		$.F_ExecuteCodeAfterSuccessfulSubmission	=_;
		$.F_ExecuteCodeAfterUnsuccessfulSubmission	=_;

//	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		$.F_Initialize=function(object___configuration)
		{
			var string___result_data_type='bool';

//			if (object___configuration)
//				$.object___configuration=object___configuration;
			
			if (object___configuration)
			{
				$.string___instance_global_access_code	="__object_object___C_Form[\""+$.object_dom___component_DOM_id_prefix+object___configuration.varchar___id+"\"]";
				
				$.object_dom___component				=document.getElementById($.object_dom___component_DOM_id_prefix+object___configuration.varchar___id);
				
				$.object___form.string___action_path	=object___configuration.string___action_path||'';
				
				$.array_string___input_field_DOM_id		=object___configuration.array_string___input_field_DOM_id;
				
				$.string___default_input_field_DOM_id	=object___configuration.string___default_input_field_DOM_id||"";
				
				if ($.string___default_input_field_DOM_id)
					$.F_FocusOnDefaultField();
				
//	TEMP:
//	link form component with field component
				for (var integer___index=0;integer___index<$.array_string___input_field_DOM_id.length;integer___index++)
					__object_object___C_InputField[$.array_string___input_field_DOM_id[integer___index]].object___C_Form=$;
				
				$.object___iframe.string__name				="name_iframe___"+(new Date()).getTime();
				
				$.object_dom___content						=jQuery($.object_dom___component).children("div")[0];
				
				$.object___form.object_dom___form			=jQuery($.object_dom___content).find('form')[0];
				$.object___form.object_dom___form.target	=$.object___iframe.string__name;
				
//				if (!$.object___form.object_dom___form.action)
					$.object___form.object_dom___form.action=$.object___form.string___action_path;
								
				$.object___form.object_dom___visible_fields	=jQuery($.object___form.object_dom___form).children(".class_div___element-Form--visible_fields")[0];
				$.object___form.object_dom___hidden_fields	=jQuery($.object___form.object_dom___form).children(".class_div___element-Form--hidden_fields")[0];

				$.object_dom___submission_status_description	=jQuery($.object___form.object_dom___form).find(".class_div___element-Form--submission_status_description")[0];
				$.object_dom___submission_processing_indicator	=jQuery($.object_dom___content).find(".class_div___element-Form--submission_processing_indicator")[0];
				
	
				$.object___iframe.object_dom___parent	=jQuery($.object_dom___content).children("div")[3];
				
				$.F_InitializeHiddenFields($.object___configuration.array___hidden_field);
				
				if (object___configuration.string___confirmation_control_DOM_id || object___configuration.object_dom___confirmation_control)
				{
					$.object_dom___confirmation_control=object___configuration.object_dom___confirmation_control||document.getElementById(object___configuration.string___confirmation_control_DOM_id);
					
					$.object_dom___confirmation_control.onclick=function()
					{
						$.object___o_Control.F_Confirm();
					};
				}
				
				if (object___configuration.string___cancelation_control_DOM_id || object___configuration.object_dom___cancelation_control)
				{
					$.object_dom___cancelation_control=object___configuration.object_dom___cancelation_control||document.getElementById(object___configuration.string___cancelation_control_DOM_id);
					
					$.object_dom___cancelation_control.onclick=function()
					{
						if (typeof($.F_ExecuteCodeAfterCancelation)=='function')
							$.F_ExecuteCodeAfterCancelation(this);
					};
				}

			}
		};
		
		$.F_FocusOnDefaultField=function()
		{
			__object_object___C_InputField[$.string___default_input_field_DOM_id].F_Focus();
		};
		
		$.F_InitializeHiddenFields=function(array___field)
		{
			if (array___field)
				$.object___configuration.array___hidden_field=array___field;
			if (!$.object___configuration.array___hidden_field)
			{
				$.object___form.array___hidden_field=[];
//	default
				$.object___form.array___hidden_field.push
				({
					string__name:"name_input___callback_execution_code",
					string___value:"parent."+$.string___instance_global_access_code+".F_ProcessSubmissionResponse(__object___request_response);"
				});
			}
			else
			{
				$.object___form.array___hidden_field=$.object___configuration.array___hidden_field;
//	ANANLYZE: necessity and logic of 'F_AddHiddenField', maybe reqiure separate method for processing ALL fields and for processing exact field, or even on initialization use only open function code, without funcion call 
			}
			$.F_AddHiddenField();
		};
		
		
		$.F_CreateIframe=function()
		{
//	TODO: analyze wsy to get temp unique iframe name
			var varchar___browser_version_id=__IdentifyBrowser();
			if (navigator.userAgent.match('MSIE') && varchar___browser_version_id!='ie9' && varchar___browser_version_id!='ie10' && varchar___browser_version_id!='ie11')
				var object_dom___iframe=document.createElement('<iframe name="'+$.object___iframe.string__name+'">');
			else
			{
				var object_dom___iframe=document.createElement('iframe');
				object_dom___iframe.name=$.object___iframe.string__name;
			}

			$.object___iframe.object_dom___iframe=object_dom___iframe;

//			$.object___iframe.object_dom___parent.appendChild(object_dom___iframe);
			$.object_dom___content.appendChild(object_dom___iframe);
		};
		$.F_DeleteIframe=function()
		{
			if ($.object___iframe.object_dom___iframe)
			{
//				$.object___iframe.object_dom___parent.removeChild($.object___iframe.object_dom___iframe);
				$.object_dom___content.removeChild($.object___iframe.object_dom___iframe);
			}
		};
		
		
		
//	PERFORMANCE: analzye necessity use addition one by one in loop instead of using '$.object___form.object_dom___hidden_fields.innerHTML+="...";'
		$.F_AddHiddenField=function(array___field)
		{
			if (!array___field)
				array___field=$.object___form.array___hidden_field;
//	TODO: analyze necessity to join custom array___field with $.object___form.array___hidden_field
			
			var integer___field_amount=array___field.length;
			for (var integer___index=0;integer___index<integer___field_amount;integer___index++)
			{
				var object_dom___field=document.createElement('input');
				object_dom___field.type="hidden";
//				object_dom___field.id=array___field[integer___index].string___DOM_id;
				object_dom___field.name=array___field[integer___index].string__name;
				object_dom___field.value=array___field[integer___index].string___value;
				$.object___form.object_dom___hidden_fields.appendChild(object_dom___field);
			}
		};
		
//	IMPORTANT,ANALYZE: logic, use only to set value, without adding it, for addition use F_AddHiddenField
		$.F_SetHiddenFieldValue=function(array___field)
		{
			var integer___field_amount=array___field.length;
			for (var integer___index=0;integer___index<integer___field_amount;integer___index++)
			{
//	PERFORMANCE: analyze way to use only field name to check and acces it
//				var object_dom___field=document.getElementById(array___field[integer___index].string___DOM_id)
				var object_dom___field=__GetFormFieldByName(array___field[integer___index].string__name,$.object___form.object_dom___form);
				if (object_dom___field)
					object_dom___field.value=array___field[integer___index].string___value;
				else
					$.F_AddHiddenField([array___field[integer___index]]);
			}
		};
		
		
		$.F_AddRequiredField=function(string___field_DOM_name)
		{
			$.object___form.object___required_field[string___field_DOM_name]=true;
		};
		$.F_DeleteRequiredField=function(string___field_DOM_name)
		{
			delete $.object___form.object___required_field[string___field_DOM_name];
		};
		
	
		
		$.F_Submit=function()
		{
			$.object___iframe.handle___loading_timeout=setTimeout($.F_ProcessSubmissionTimeout,$.object___iframe.integer___loading_timeout);
			$.object___form.object_dom___form.submit();
		};
		
		$.object___o_Control=
		{
			F_Confirm:function()
			{
				$.F_HideSubmissionStatusDescription();
				
				var bool___validation=true;
				
				for (var integer___index=0;integer___index<$.array_string___input_field_DOM_id.length;integer___index++)
					if (!__object_object___C_InputField[$.array_string___input_field_DOM_id[integer___index]].F_Validate())
						bool___validation=false;

				if (!bool___validation)
					return;
				
				if (typeof($.F_ExecuteCodeBeforeSubmission)=='function')
					$.F_ExecuteCodeBeforeSubmission();
				
				$.F_ShowSubmissionProcessingIndicator();

//	encode entered data
//	save/cache entered data for recover it later

				$.F_CreateIframe();

				setTimeout($.F_Submit,10);
			},			
			
			F_Cancel:function()
			{
				$.F_HideSubmissionProcessingIndicator();

//	ANALYZE: necessity to reset form fields
			}
		};

		
		$.F_ShowSubmissionProcessingIndicator=function()
		{
			$.object_dom___submission_processing_indicator.style.display='block';
		};
		$.F_HideSubmissionProcessingIndicator=function()
		{
			$.object_dom___submission_processing_indicator.style.display='none';
		};
		
		$.F_ShowSubmissionStatusDescription=function(varchar___status,string_text___status_description)
		{
			$.object_dom___submission_status_description.className="class_div___element-Form--submission_status_description class_div___element-Form--submission_status_description-status__"+varchar___status;
			$.object_dom___submission_status_description.style.display='block';
			$.object_dom___submission_status_description.innerHTML=string_text___status_description;
		};
		$.F_HideSubmissionStatusDescription=function()
		{
			$.object_dom___submission_status_description.style.display='none';
		};
		
		
		$.F_ProcessSubmissionResponse=function(object___response)
		{
			clearTimeout($.object___iframe.handle___loading_timeout);
			
			setTimeout($.F_DeleteIframe,10);
			
			if (object___response.integer___status!=0)
			{
				if (typeof($.F_ExecuteCodeAfterUnsuccessfulSubmission)=='function')
					$.F_ExecuteCodeAfterUnsuccessfulSubmission(object___response);
				
				if (object___response.object___result.object_string___field_error_description)
				{
					for (var var___key in object___response.object___result.object_string___field_error_description)
					{
//	TODO: need array to get InputField component by field name
//	ANALYZE: necessity to use exact class name 'class_div___component-InputField' instead of universal 'class_div___component'
//						__object_object___C_InputField[jQuery($.object___form.object_dom___form).find("[name='"+var___key+"']").closest(".class_div___component")[0].id].F_SetValidationStatus(false,_,object___response.object___result.object_string___field_error_description[var___key]);
						jQuery($.object___form.object_dom___form).find('input').each(function(integerindex,object_dom___element)
						{
							if (this.name==var___key)
								__object_object___C_InputField[jQuery(this).closest(".class_div___component")[0].id].F_SetValidationStatus(false,_,object___response.object___result.object_string___field_error_description[var___key]);
						});
					}
				}
			}
			else
			{
				if (typeof($.F_ExecuteCodeAfterSuccessfulSubmission)=='function')
					$.F_ExecuteCodeAfterSuccessfulSubmission(object___response);
			}
//	ANALYZE: place
			if (object___response.object___result.string___redirect_path)
				location.href=object___response.object___result.string___redirect_path;
			else 
				$.F_HideSubmissionProcessingIndicator();

			
			if (object___response.string_text___status_description)
				$.F_ShowSubmissionStatusDescription(object___response.varchar___status,object___response.string_text___status_description);
			else 
				$.F_HideSubmissionStatusDescription();
		};
		
		$.F_ProcessSubmissionTimeout=function()
		{
			setTimeout($.F_DeleteIframe,10);	
			
			$.F_HideSubmissionProcessingIndicator();

//	TODO: analyze way to get/generate status text, setup by configurion or etc.			
			$.F_ShowSubmissionStatusDescription('error',"Request processing timeout! Try again later.");
		};
	};
	var __object_object___C_Form={};
	
	

	
	
	
	