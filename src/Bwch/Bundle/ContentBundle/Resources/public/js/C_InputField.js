//	TODO: replace jQuery with CORE methods	

	function C_InputField()
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
		
		$.varchar___input_type						='';
		
		$.object_dom___validation_error_decription	=_;
		
		$.object_dom___field						=_; // main field-element for data input
		$.object_dom___active_field					=_; // need to process focus/blur, when main field is disable
		$.varchar___validation_rule_id				=_;
		
		$.string___linked_field_DOM_id				=_;
		
		$.object_object_regexp___validation_rule=
		{
//			'name':/[^a-zA-Z0-9_\- ]+/g
//			'varchar__id':/[^\w]+/g,
//			'varchar__name':/[^\w]+/g,
//			'string__name':/[^\w\- ]+/g, //\w used auto adept to user locale, if FR used, some symbols is out of a-ZA-Z sequence
//			'string_text__description':/[.]+/g,
			
			'varchar':/[^\w]+/g,
			'string':/[^\w\- ]+/g, //\w used auto adept to user locale, if FR used, some symbols is out of a-ZA-Z sequence
//			'text':/[.]+/g,
			'email_address':/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g,
//			'street_address':/.../g,
			'phone_number':/[.]+/g
		};
		
		$.object_string___validation_rule_error_decription=
		{
			'email_address':"Incorrect email address format. Example: 'name@server.com'",
			'phone_number':/[.]+/g
		};
		
		
		$.F_ProcessExternalActionOnEvent_keypress	=_;
		$.F_ProcessExternalActionOnEvent_keyup		=_;
		
		
		$.F_Initialize=function(object___configuration)
		{
			if (object___configuration)
			{	
				$.object_dom___component					=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id)
															/* DEBUG -> */||__object___E_Debugger.F_LogError
																({
																	varchar___class_name:'C_InputField',
																	varchar___method_name:'F_Initialize',
																	string___description:"Unable get DOM_element by DOM_id=\""+object___configuration.string___DOM_id+"\""
																})/* <- DEBUG */;

				$.string___DOM_name							=object___configuration.string___DOM_name
															/* DEBUG -> */||__object___E_Debugger.F_LogError
																({
																	varchar___class_name:'C_InputField',
																	varchar___method_name:'F_Initialize',
																	string___description:"Component DOM_name is 'null' or 'undefined', DOM_id=\""+object___configuration.string___DOM_id+"\", disabled_state=\""+object___configuration.bool___disabled+"\""
																})/* <- DEBUG */;
				
				$.bool___autofocus							=object___configuration.bool___autofocus||$.bool___autofocus;
				$.bool___disabled							=object___configuration.bool___disabled||$.bool___disabled;
				$.bool___required							=object___configuration.bool___required||$.bool___required;
				
/* DEBUG -> */
				if ($.bool___autofocus && $.bool___disabled)
					__object___E_Debugger.F_LogError
					({
						varchar___class_name:'C_InputField',
						varchar___method_name:'F_Initialize',
						string___description:"Focus on disabled field not allowed!"
					});
/* <- DEBUG */

				$.object_dom___validation_error_decription	=jQuery($.object_dom___component).children('span')[0]||$.object_dom___validation_error_decription;
				
				if (jQuery($.object_dom___component).find('input')[0])
				{
					$.object_dom___field					=jQuery($.object_dom___component).find('input')[0];
					$.varchar___input_type					='uniline';
				}
				else
				{
					$.object_dom___field					=jQuery($.object_dom___component).find('textarea')[0];
					$.varchar___input_type					='multiline';
				}
				$.object_dom___overlay						=jQuery($.object_dom___component).find('sup')[0];//document.getElementById(object___configuration.string___field_overlay_text_placeholder_DOM_id)||null;
				
				$.varchar___validation_rule_id	=object___configuration.varchar___validation_rule_id;
				
				$.string___linked_field_DOM_id				=object___configuration.string___linked_field_DOM_id||$.string___linked_field_DOM_id;

				
				if (!$.bool___disabled)
				{
					$.object_dom___active_field=$.object_dom___field;
//	TEST/ANALYZE: ->
					$.object_dom___component.onclick=function()
					{
						$.F_Focus();
					};
//	<-
				}
				else
				{
					$.object_dom___active_field=document.createElement('input');
					var object_dom___temp_element=document.createElement('p');
//	TODO: optimize...
					object_dom___temp_element.className="class___element-HiddenField";
/*					object_dom___temp_element.style.overflow="hidden";
					object_dom___temp_element.style.width=0;
					object_dom___temp_element.style.height=0;
					object_dom___temp_element.style.padding=0;
*/					
					object_dom___temp_element.appendChild($.object_dom___active_field);
					
					$.object_dom___component.children[0].appendChild(object_dom___temp_element);
				}

//	events processing field ->
				$.object_dom___active_field.onkeydown=function(object_dom___event)
				{
					object_dom___event=object_dom___event||event;
					
					if (typeof($.F_ProcessExternalActionOnEvent_keypress)=='function')
						$.F_ProcessExternalActionOnEvent_keypress(object_dom___event.keyCode);
					
					if (object_dom___event.keyCode==13) // [Enter]
					{
						if ($.varchar___input_type=='uniline' && $.object___C_Form)
						{
							$.object___C_Form.object___o_Control.F_Confirm();
//	ANALYZE: crossbrowser and cases, when 'Enter' key has inccorrect behavior in current case
						return false;
					}
						else if ($.varchar___input_type=='multiline' && $.object___C_Form && object_dom___event.ctrlKey)
							$.object___C_Form.object___o_Control.F_Confirm();
					}
					else if (object_dom___event.keyCode==27) //	[Esc]
					{
						$.F_ProcessEvent_focusout(object_dom___event,'force_hiding');
//						$.object_dom___active_field.blur();
					}
					else if (object_dom___event.keyCode==0) //	[Space]
					{
						// select current option
					}
					else if (object_dom___event.keyCode==38) //	[Arrow Up]
					{
						// highlight prev option
					}
					else if (object_dom___event.keyCode==40) //	[Arrow Down]
					{
						// highlight next option
					}
				};
				
				$.object_dom___active_field.onkeyup=function(object_dom___event)
				{
					object_dom___event=object_dom___event||event;
					
					if (typeof($.F_ProcessExternalActionOnEvent_keyup)=='function')
						$.F_ProcessExternalActionOnEvent_keyup(object_dom___event);
				};
				
				$.object_dom___active_field.onchange=function()
				{
//	TEMP/ANALYZE:					
					$.F_HideOverlay();
				};
				

				
				$.object_dom___active_field.onfocus=$.F_ProcessEvent_focusin;
				$.object_dom___active_field.onblur=$.F_ProcessEvent_focusout;
				
				
				if ($.object_dom___overlay)
				{
					$.object_dom___overlay.onclick=function()
					{
						if (!jQuery($.object_dom___active_field).is(":focus"))
							$.F_Focus();
						else 
							$.F_ProcessEvent_focusin();
					};
//	preventing text selection by mouse cursor
					$.object_dom___overlay.onmousedown=function()
					{
						return false;
					};
//	IE only
					$.object_dom___overlay.onselectstart=function()
					{
						return false;
					};
				}
//	events processing field <-
				
				if ($.bool___autofocus && !$.bool___disabled)
					$.F_Focus();

//	hide overlay if browser loaded cached value
				if ($.F_GetValue())
					$.F_HideOverlay();
				
				

//	TODO,ANALYZE: link to ValidationStatusDescriptionPopup			
			}
		};
		
		
		$.F_ProcessExternalActionOnEvent_focusin=_;
		$.F_ProcessExternalActionOnEvent_focusout=_;
		
		$.F_ProcessEvent_focusin=function()
		{
//	ANALYZE: necessity to check value
//			if (!$.F_GetValue())
				$.F_HideOverlay();
			
			if (typeof($.F_ProcessExternalActionOnEvent_focusin)=='function')
				$.F_ProcessExternalActionOnEvent_focusin();
		};
		$.F_ProcessEvent_focusout=function(object_dom___event,varchar___mode)
		{
			if (!$.F_GetValue())
				$.F_ShowOverlay();
			
			if (typeof($.F_ProcessExternalActionOnEvent_focusout)=='function')
				$.F_ProcessExternalActionOnEvent_focusout(varchar___mode);
		};
		
		
		$.F_ShowOverlay=function()
		{
			if ($.object_dom___overlay)
				if (!$.bool___disabled)
					$.object_dom___overlay.style.display='block';
				else 
					$.object_dom___overlay.children[0].style.visibility='visible';
		};
		$.F_HideOverlay=function()
		{
			if ($.object_dom___overlay)
				if (!$.bool___disabled)
					$.object_dom___overlay.style.display='none';
				else 
					$.object_dom___overlay.children[0].style.visibility='hidden';
		};
		

		$.F_Focus=function()
		{
//	ANALYZE: necessity to extend this method
			$.object_dom___active_field.focus();
		};
		$.F_Defocus=function()
		{
//	ANALYZE: necessity to extend this method
			$.object_dom___active_field.blur();
		};
		
		$.F_GetValue=function()
		{
			return $.object_dom___field.value;;
		};
		
		$.F_Validate=function()
		{
//			alert($.varchar___validation_rule_id)
			if ($.bool___required && !$.F_GetValue())
			{
				$.F_SetValidationStatus(false,'empty_field');
				return false;
			}
			
//	TODO,ANALYZE: use String.match(RegExp) method to get all occurances and highlight each incorrect symbol in StatusDescriptionPopup (for password hide original input, show only incorrect symbols)
			if ($.varchar___validation_rule_id && $.F_GetValue().search($.object_object_regexp___validation_rule[$.varchar___validation_rule_id])==-1)
			{
				$.F_SetValidationStatus(false,'incorrect_symbol');
				return false;
			}
		
			if ($.string___linked_field_DOM_id)
			{
				if ($.F_GetValue()!=$.object___C_Form.object_object___field[$.string___linked_field_DOM_id].object___instance.F_GetValue())
				{
					$.object___C_Form.object_object___field[$.string___linked_field_DOM_id].object___instance.F_SetValidationStatus(false);
					$.F_SetValidationStatus(false,_,"Passwords don't match!");
					return false;
				}
			}
			
			$.F_SetValidationStatus(true);
			return true;
		};
		
		$.F_SetValidationStatus=function(bool___status,varchar___error_type,string___error_desription)
		{
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
					$.object_dom___validation_error_decription.innerHTML="This field can't be empty!";
			}
			else if (varchar___error_type=='incorrect_symbol')
			{
				$.object_dom___component.children[0].className="class___element-validation_status__error class___element-validation_error_type__incorrect_symbol";

				if ($.object_dom___validation_error_decription)
					$.object_dom___validation_error_decription.innerHTML=$.object_string___validation_rule_error_decription[$.varchar___validation_rule_id];
			}
//	ANALYZE,TEMP:
			else
			{
				$.object_dom___component.children[0].className="class___element-validation_status__error";
	
				if ($.object_dom___validation_error_decription)
					$.object_dom___validation_error_decription.innerHTML=string___error_desription||"";
			}
		};
		
		
		$.F_ResetValidationStatus=function()
		{
			$.object_dom___component.children[0].className="";
		};
		
		
	};
	var __object_object___C_InputField={};
	
		
	

//	TODO: move to external, load from DB on compilation step
	

