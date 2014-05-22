/*
	TODO: analyze naming for function Add or Append
	
	IMPORTANT: need fix for ie6 via iframe to overlay page fields (line input, select, textarea) - create dynamically to avoid DOCTYPE stricts standards during document checking
	
	TODO: analyze necessity to preserve updated field values after closing/reopening form without data submission
	
	TODO/ANALYZE: add method to add custom alert message (some block/layer - depending on design) to each required field
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

		/*HERMiT*/
		$.integer___submission_processing_timeout=0;
		
		$.object___form=
		{
			string___action_path			:"",
			object_dom___form				:_,
			object_dom___visible_fields		:_,
			object_dom___hidden_fields		:_,
			array___hidden_field			:[],
			object___required_field			:{}, // .object___required_field["name_input___field"]=true;
			object___field_value_type_id	:{} // .object___field_value_type["name_input___field"]="email"; current, in future change to ID (like: is3d)
		};
		
//		$.array_string___input_field_DOM_id		=[];
//		$.string___default_input_field_DOM_id	="";
//		$.bool___autofocus_on_default_field		=true;
		$.array_object___field											=[];
		$.integer___fields_amount										=0;

		$.integer___autofocus_field_ordinal_index						=0;

        /*HERMiT*/
        $.string___submit_url = "";
        $.varchar___form_id = "";
        $.bool___submit_ajax = false;

        $.object_dom___submission_status_description	=_;
		$.object_dom___submission_processing_indicator	=_;
		

		$.F_ExecuteCodeBeforeSubmission				=_;
		$.F_ExecuteCodeAfterSuccessfulSubmission	=_;
		$.F_ExecuteCodeAfterUnsuccessfulSubmission	=_;

//	ANALYZE: names
		$.F_ExecuteCodeAfterSuccessfulSubmissionProcessingComplete		=_;
		$.F_ExecuteCodeAfterUnsuccessfulSubmissionProcessingComplete	=_;
		
		$.F_ExecuteCodeAfterCancelation				=_;
		

//	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		$.F_Initialize=function(object___configuration)
		{
			var string___result_data_type='bool';

			if (object___configuration)
			{
//	ANALYZE: necessity of '_global_access_code' postfix
				$.string___instance_global_access_code		="__object_object___C_Form[\""+$.object_dom___component_DOM_id_prefix+object___configuration.varchar___id+"\"]";
				
				$.object_dom___component					=object___configuration.object_dom___component||document.getElementById($.object_dom___component_DOM_id_prefix+object___configuration.varchar___id)
																/* DEBUG -> */||__object___E_Debugger.F_LogError
																({
																	varchar___class_name:'C_Form',
																	varchar___method_name:'F_Initialize',
																	string___description:"Unable get DOM element by id=\""+$.object_dom___component_DOM_id_prefix+object___configuration.varchar___id+"\""
																})/* <- DEBUG */;
				
				$.integer___submission_processing_timeout	=object___configuration.integer___submission_processing_timeout||$.integer___submission_processing_timeout;
				
//				$.string___default_input_field_DOM_id		=object___configuration.string___default_input_field_DOM_id||$.string___default_input_field_DOM_id;
				
//				$.bool___autofocus_on_default_field			=object___configuration.bool___autofocus_on_default_field!==undefined?object___configuration.bool___autofocus_on_default_field:$.bool___autofocus_on_default_field;

//				if ($.string___default_input_field_DOM_id && $.bool___autofocus_on_default_field)
//					$.F_FocusOnDefaultField();


//				$.array_string___input_field_DOM_id			=object___configuration.array_string___input_field_DOM_id;
//	link form component with field component				
//				for (var integer___index=0;integer___index<$.array_string___input_field_DOM_id.length;integer___index++)
//					__object_object___C_InputField[$.array_string___input_field_DOM_id[integer___index]].object___C_Form=$;
					
				
				$.array_object___field		=object___configuration.array_object___field_configuration;
				
				$.integer___fields_amount					=$.array_object___field.length;
				for (var integer___index=0;integer___index<$.integer___fields_amount;integer___index++)
				{
					$.array_object___field[integer___index].object_object___instance_group[$.array_object___field[integer___index].string___DOM_id]=new (eval($.array_object___field[integer___index].varchar___class_name));
					
					$.array_object___field[integer___index].object___instance=$.array_object___field[integer___index].object_object___instance_group[$.array_object___field[integer___index].string___DOM_id]
					$.array_object___field[integer___index].object___instance.F_Initialize($.array_object___field[integer___index]);
					$.array_object___field[integer___index].object___instance.object___C_Form=$;
					$.array_object___field[integer___index].object___instance.integer___ordinal_index=integer___index;
				
					if ($.array_object___field[integer___index].bool___autofocus)
						$.integer___autofocus_field_ordinal_index=integer___index;

/*					eval($.array_object___field[integer___index].varchar___instance_group+'["'+$.array_object___field[integer___index].string___DOM_id+"\"].F_Initialize\
						(\
							__object_object___C_Form['"+$.object_dom___component_DOM_id_prefix+object___configuration.varchar___id+"'].array_object___field_configuration["+integer___index+"]\
						)");
//					__object_object___C_InputField[$.array_object___field[integer___index].string___DOM_id].F_Initialize($.array_object___field[integer___index]);

					eval($.array_object___field[integer___index].varchar___instance_group+'["'+$.array_object___field[integer___index].string___DOM_id+"\"].object___C_Form=__object_object___C_Form['"+$.object_dom___component_DOM_id_prefix+object___configuration.varchar___id+"']");
//					__object_object___C_InputField[$.array_string___input_field_DOM_id[integer___index]].object___C_Form=$;
*/
				}

                /*HERMiT*/
                $.string___submit_url = object___configuration.string___submit_url;
                $.varchar___form_id = object___configuration.varchar___form_id;
                $.bool___submit_ajax = object___configuration.bool___submit_ajax||$.bool___submit_ajax;

				$.object_dom___content						=jQuery($.object_dom___component).children("div")[0];
				
				$.object___form.string___action_path		=object___configuration.string___action_path||"";//ProcessError(), path must be set;
				$.object___form.object_dom___form			=jQuery($.object_dom___content).find('form')[0];
				
				$.object___form.object_dom___visible_fields	=jQuery($.object___form.object_dom___form).children(".class_div___element-Form--visible_fields")[0];
				$.object___form.object_dom___hidden_fields	=jQuery($.object___form.object_dom___form).children(".class_div___element-Form--hidden_fields")[0];				

				$.object_dom___submission_status_description	=jQuery($.object___form.object_dom___form).find(".class_div___element-Form--submission_status_description")[0];
				$.object_dom___submission_processing_indicator	=jQuery($.object_dom___content).find(".class_div___element-Form--submission_processing_indicator")[0];
				
				
//	controls:
				if (object___configuration.string___confirmation_control_DOM_id || object___configuration.object_dom___confirmation_control)
				{
					$.object_dom___confirmation_control	=object___configuration.object_dom___confirmation_control||document.getElementById(object___configuration.string___confirmation_control_DOM_id)
															/* DEBUG -> */||__object___E_Debugger.F_LogError
															({
																varchar___class_name:'C_Form',
																varchar___method_name:'F_Initialize',
																string___description:"Unable get DOM 'confirmation_control' by id=\""+object___configuration.string___confirmation_control_DOM_id+"\""
															})/* <- DEBUG */;
					
					$.object_dom___confirmation_control.onclick=function()
					{
						$.object___o_Control.F_Confirm();
					};
					}
				
				if (object___configuration.string___cancelation_control_DOM_id || object___configuration.object_dom___cancelation_control)
				{
					$.object_dom___cancelation_control	=object___configuration.object_dom___cancelation_control||document.getElementById(object___configuration.string___cancelation_control_DOM_id)
															/* DEBUG -> */||__object___E_Debugger.F_LogError
															({
																varchar___class_name:'C_Form',
																varchar___method_name:'F_Initialize',
																string___description:"Unable get DOM 'cancelation_control' by id=\""+object___configuration.string___cancelation_control_DOM_id+"\""
															})/* <- DEBUG */;
					
					$.object_dom___cancelation_control.onclick=function()
					{
						if (typeof($.F_ExecuteCodeAfterCancelation)=='function')
							$.F_ExecuteCodeAfterCancelation(this);
					};
				}
				
			}
		};
		
		$.F_Focus=function()
		{
//			console.log($.integer___autofocus_field_ordinal_index);
//			console.log($.array_object___field[$.integer___autofocus_field_ordinal_index]);
//			if ($.integer___autofocus_field_ordinal_index!==null && $.integer___autofocus_field_ordinal_index>=0)
//	ANALYZE: default first field by 0 index
				$.array_object___field[$.integer___autofocus_field_ordinal_index].object___instance.F_Focus();
		};
		
		
		$.object___o_Control=
		{
			F_Confirm:function()
			{
//	ANALYZE: necessity to set input fields validation result displaying method/mode (stop on first error)
				$.F_HideSubmissionStatusDescription();
				
				var bool___validation=true;
				
				for (var integer___index=0;integer___index<$.integer___fields_amount;integer___index++)
					if (!$.array_object___field[integer___index].object___instance.F_Validate())
						bool___validation=false;

				
				if (!bool___validation)
					return;
				
				if (typeof($.F_ExecuteCodeBeforeSubmission)=='function')
					$.F_ExecuteCodeBeforeSubmission();
				
//	encode entered data
//	save/cache entered data for recover it later

				$.F_ShowSubmissionProcessingIndicator();

                /*HERMiT comment*/
/*				var array_string___temp=[];
				
				for (var integer___index=0;integer___index<$.object___form.object_dom___form.elements.length;integer___index++)
				{
//	TODO,IMPORTANT: replace with component-style processing (C_Component.object___field.string___value)
					var object_dom___form_field=$.object___form.object_dom___form.elements[integer___index];
					if ((object_dom___form_field.type=='text' || object_dom___form_field.type=='password') && object_dom___form_field.value)
						array_string___temp.push(encodeURIComponent(object_dom___form_field.name)+"="+encodeURIComponent(object_dom___form_field.value));
					else if (object_dom___form_field.type=='checkbox' && object_dom___form_field.checked)
						array_string___temp.push(encodeURIComponent(object_dom___form_field.name)+"="+encodeURIComponent(1));
				}
				
				var string_uri___submission_data=array_string___temp.join("&");
		
				jQuery.ajax
				({
					url			:$.object___form.string___action_path,
					type		:'POST',
					data		:string_uri___submission_data,
					dataType	:'json',
					timeout		:$.integer___submission_processing_timeout,
					
					success:function(object___response,varchar___status,object___XMLHTTPRequest)
					{
						$.F_ProcessSubmissionResponse(object___response);
					},
					error:function(object___XMLHTTPRequest,string___status,string___HTTP_status) //string___status: null, "timeout", "error", "abort", "parsererror", "No Transport"
					{
						if (string___status=='timeout')
							$.F_ProcessSubmissionTimeout();
						else
						{
							$.F_ProcessSubmissionResponse({varchar___status:'error',object___result:{},string_text___status_description:"Some error occured! Try again later."});
//	TODO: process other errors...
						}
						
					},
					complete:function(object___XMLHTTPRequest,varchar___status) //string___status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
					{
						
					}
				});*/

                /*HERMiT*/
                if ($.bool___submit_ajax) {
                    jQuery.ajax({
                        type: "POST",
                        url: $.string___submit_url,
                        data: jQuery('#'+ $.varchar___form_id).find('input').serializeArray(),
                        dataType: "json",
                        success: function(object___response){
                            //console.log('object___response', object___response);
                            $.F_ProcessSubmissionResponse(object___response);
                        },
                        error:function(object___XMLHTTPRequest,string___status) {
                            if (string___status=='timeout')
                                $.F_ProcessSubmissionTimeout();
                        },
                        complete:function(object___XMLHTTPRequest,varchar___status) {
                        }
                    });
                } else {
                    jQuery('#'+ $.varchar___form_id).submit();
                }

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
			
			if (object___response.integer___status!=0 && typeof($.F_ExecuteCodeAfterUnsuccessfulSubmissionProcessingComplete)=='function')
				$.F_ExecuteCodeAfterUnsuccessfulSubmissionProcessingComplete(object___response);
			else if (object___response.integer___status==0 && typeof($.F_ExecuteCodeAfterSuccessfulSubmissionProcessingComplete)=='function')
				$.F_ExecuteCodeAfterSuccessfulSubmissionProcessingComplete(object___response);

//	ANALYZE: necessity to execute some 'AfterCode' here, because previous code call can't hide 'StatusDescription'
		};
		
		$.F_ProcessSubmissionTimeout=function()
		{		
			$.F_HideSubmissionProcessingIndicator();

//	TODO: analyze way to get/generate status text, setup by configurion or etc.			
			$.F_ShowSubmissionStatusDescription('error',"Request processing timeout! Try again later.");
		};
		
		
		$.F_ResetFieldsValidationStatus=function()
		{		
			for (var integer___index=0;integer___index<$.integer___fields_amount;integer___index++)
				$.array_object___field[integer___index].object___instance.F_ResetValidationStatus();
		};
		
	};
	var __object_object___C_Form={};
	
	

	
/*	var C_TestObject=function()
	{
		this.param1='testParam1';
		this.param2='testParam2';
	};
	
	var object_object___C_TestObject={};
	
	var object___temp=object_object___C_TestObject;
	
	object___temp['test']=new C_TestObject;
	
	object___temp['test'].param1="asdasdadsa";
	
	alert(object_object___C_TestObject['test'].param1);
*/	
	
	
	
	
	
	
	
	