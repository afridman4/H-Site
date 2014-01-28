//	TODO: replace jQuery with CORE methods

	function C_SelectionField()
	{
		var $=this,
			_=null;
		
		$.object_dom___component					=_;
		$.string___DOM_name							=_;
		
		$.object_dom___options						=_; // 'UL'
		
		$.object_dom___active_option				=_; // highlighted, not selected
//	ANALYZE: var name
		$.integer___ordinal_index					=_;
		
		$.object___C_Form							=_;
		
		$.bool___autofocus							=false;
		$.bool___disabled							=false;
		$.bool___required							=false;
		
		$.object_dom___validation_error_decription	=_;
		
		
		$.object___C_InputField						=_;
		
        /*HERMiT*/
        $.object___configuration;
//	ANALYZE: var name
		$.bool___cancel_options_hiding				=false;
		
		$.bool___multiple_options_selection			=false;
		$.integer___selected_options_limit			=0;

		$.string___multiple_values_separator		=',';
		
		$.object_dom___previous_active_option		=_;
		$.object_dom___previous_selected_option		=_;
		
		$.integer___selected_options_amount			=0;
		
		$.object___selected_option_value			={};
		$.object_object_dom___selected_option		={};
		
		$.object_dom___swap_field					=_;
		
		
		
		
		
		$.F_Initialize=function(object___configuration)
		{
/* DEBUG -> */
			if (object___configuration)
			{
/* <- DEBUG */
                /*HERMiT*/
                $.object___configuration = object___configuration;

                $.object_dom___component			=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id)
													/* DEBUG -> */||__object___E_Debugger.F_LogError
														({
															varchar___class_name:'C_SelectionField',
															varchar___method_name:'F_Initialize',
															string___description:"Unable get DOM_element by DOM_id=\""+object___configuration.string___DOM_id+"\""
														})/* <- DEBUG */;
				
				$.string___DOM_name					=object___configuration.string___DOM_name
													/* DEBUG -> */||__object___E_Debugger.F_LogError
														({
															varchar___class_name:'C_SelectionField',
															varchar___method_name:'F_Initialize',
															string___description:"Component DOM_name is 'null' or 'undefined', DOM_id=\""+object___configuration.string___DOM_id+"\", disabled_state=\""+object___configuration.bool___disabled+"\""
														})/* <- DEBUG */;
				
				$.object_dom___swap_field=document.createElement('input');
				$.object_dom___swap_field.tabIndex=-1;
				$.object_dom___swap_field.onkeydown=function(object_dom___event)
				{
					object_dom___event=object_dom___event||event;
					
					if (object_dom___event.shiftKey && object_dom___event.keyCode==9)
					{
//	focus on previous field
						if ($.object___C_Form && $.integer___ordinal_index>0)
							$.object___C_Form.array_object___field[$.integer___ordinal_index-1].object___instance.object_dom___active_field.focus();
						return false;
					}
					else if (object_dom___event.keyCode==13 || object_dom___event.keyCode==0 || object_dom___event.keyCode==38 || object_dom___event.keyCode==40)
					{
						$.object___C_InputField.F_Focus();
						return false;
					}
				};
/*				$.object_dom___swap_field.onfocus=function(object_dom___event)
				{
					if (!$.bool___swap_field_onfocus_disabled)
					{
					//	alert();
						console.log("bool___swap_field_onfocus_disabled");
						$.object___C_InputField.F_Focus();
					}
//					$.bool___swap_field_onfocus_disabled=false;
				};
*/				
				
				var object_dom___temp_element		=document.createElement('div');
//	TODO: optimize...
				object_dom___temp_element.className	="class___element-HiddenField";
				object_dom___temp_element.appendChild($.object_dom___swap_field);
				$.object_dom___component.children[0].appendChild(object_dom___temp_element);
				
					
				$.object_dom___options				=jQuery($.object_dom___component).find('.class_div___element-SelectionField--options')[0];
				
				$.bool___multiple_options_selection	=object___configuration.bool___multiple_options_selection||$.bool___multiple_options_selection;
				$.integer___selected_options_limit	=object___configuration.integer___selected_options_limit||$.integer___selected_options_limit;
				
				$.string___multiple_values_separator=object___configuration.string___multiple_values_separator||$.string___multiple_values_separator;
				
				$.bool___autofocus					=object___configuration.bool___autofocus||$.bool___autofocus;
				$.bool___disabled					=object___configuration.bool___disabled||$.bool___disabled;
				$.bool___required					=object___configuration.bool___required||$.bool___required;
				
				$.object___C_InputField				=new C_InputField;
				$.object___C_InputField.F_Initialize
				({
					object_dom___component	:jQuery($.object_dom___component).find(".class_div___component-InputField")[0],
					bool___disabled			:true
				});
				
				$.object_dom___validation_error_decription=jQuery($.object_dom___component).find(".class_div___element-SelectionField--validation_error_decription")[0]||$.object_dom___validation_error_decription;
				
//	Init default value
//				console.log($.object_dom___component.id+":"+$.integer___selected_options_amount);
				if ($.object___C_InputField.object_dom___field.value || $.bool___multiple_options_selection)
				{
					jQuery('li',$.object_dom___options).each(function()
					{
//						if ($.object_dom___component.id=="id_div___component-SelectionField-form_id__UserSupplierRegistration-field_id__categories")
//							console.log($.object_dom___component.id+":"+$.integer___selected_options_amount);
						if (!jQuery(this).find('input').is(':disabled'))
						{
//							jQuery(this).addClass("class___element-status__selected");
							$.object___o_Option.F_Select(this);
//							$.object_dom___previous_selected_option=this;
//							$.integer___selected_options_amount++;
//console.log($.object_dom___component.id+":"+$.integer___selected_options_amount+":"+jQuery(this).find('input').is(':disabled'));
						}
						
					});

//	TEMP: need implement on server side to avoid blinking
					if ($.integer___selected_options_amount>0)
						$.object___C_InputField.F_HideOverlay();
				}
				
				$.object___C_InputField.F_ProcessExternalActionOnEvent_focusin=function()
				{
					$.F_ShowOptions();
				};
				
				$.object___C_InputField.F_ProcessExternalActionOnEvent_focusout=function(varchar___mode)
				{
					
					if (varchar___mode!='force_hiding' && !$.bool___cancel_options_hiding)
					{
//						console.log($.bool___cancel_options_hiding+":"+$.bool___multiple_options_selection);

						$.F_HideOptions();
					}
					else if (varchar___mode=='force_hiding')
						$.F_HideOptions();
					
					$.bool___cancel_options_hiding=false;
				};
				
				
				
				$.object___C_InputField.F_ProcessExternalActionOnEvent_keypress	=function(integer___key_code)
				{
					if (integer___key_code==13) // [Enter]
					{
						if ($.object_dom___active_option && jQuery($.object_dom___options).is(":visible"))
							$.object___o_Option.F_ProcessEvent_keydown($.object_dom___active_option);
					}
					else if (integer___key_code==38) //	[Arrow Up]
					{
						if ($.object_dom___options.style.display=='none')
						{
							$.object_dom___options.style.display='block';
							
							jQuery($.object_dom___active_option).addClass("class___element-status__mouseover");
						}
						
						else if (!$.object_dom___active_option)
						{
							if ($.object_dom___previous_active_option)
								$.object_dom___active_option=jQuery($.object_dom___previous_active_option).addClass("class___element-status__mouseover")[0];
							else 
								$.object_dom___active_option=jQuery($.object_dom___options).find('li').last().addClass("class___element-status__mouseover")[0];
						}
						else if (jQuery($.object_dom___active_option).prev('li').length>0)
						{
							jQuery($.object_dom___active_option).prev('li').addClass("class___element-status__mouseover");
							
							jQuery($.object_dom___active_option).removeClass("class___element-status__mouseover");
							
							$.object_dom___active_option=jQuery($.object_dom___active_option).prev('li')[0];
						}
					}
					else if (integer___key_code==40) //	[Arrow Down]
					{
						if ($.object_dom___options.style.display=='none')
						{
							$.object_dom___options.style.display='block';
							
							jQuery($.object_dom___active_option).addClass("class___element-status__mouseover");
						}
						else if (!$.object_dom___active_option)
						{
							if ($.object_dom___previous_active_option)
								$.object_dom___active_option=jQuery($.object_dom___previous_active_option).addClass("class___element-status__mouseover")[0];
							else 
								$.object_dom___active_option=jQuery($.object_dom___options).find('li').first().addClass("class___element-status__mouseover")[0];
						}
						else if (jQuery($.object_dom___active_option).next('li').length>0)
						{
							jQuery($.object_dom___active_option).next('li').addClass("class___element-status__mouseover");
							
							jQuery($.object_dom___active_option).removeClass("class___element-status__mouseover");
							
							$.object_dom___active_option=jQuery($.object_dom___active_option).next('li')[0];
						}
					}
				};
				
				$.object___C_InputField.F_ProcessExternalActionOnEvent_keyup	=function(object_dom___event)
				{
					
					if (object_dom___event.keyCode==13)
					{
						$.object___o_Option.F_ProcessEvent_keyup();
												
						if (jQuery($.object_dom___options).is(":hidden"))
						{
//							$.bool___swap_field_onfocus_disabled=true;
//							alert();
							$.object_dom___swap_field.focus();
						}
						
					}
				};
				
			
				jQuery("li",$.object_dom___options).on('mousedown',function()
				{
					$.object___o_Option.F_ProcessEvent_mousedown(this);
					return false;
				});
				jQuery("li",$.object_dom___options).on('mouseup',function()
				{
					$.object___o_Option.F_ProcessEvent_mouseup(this);
				});
				jQuery("li",$.object_dom___options).on('mouseenter',function()
				{
					$.object___o_Option.F_ProcessEvent_mouseover(this);
				});
				jQuery("li",$.object_dom___options).on('mouseleave',function()
				{
					$.object___o_Option.F_ProcessEvent_mouseout(this);
				});

/* DEBUG -> */
//				$.object___o_Option.F_Insert("Test title","test value",jQuery("li",$.object_dom___options).last()[0],'replace');
				
//				$.object___o_Option.F_Delete(jQuery("li",$.object_dom___options).first()[0]);
//				$.object___o_Option.F_Delete(jQuery("li",$.object_dom___options).first()[0]);
//				$.object___o_Option.F_Delete(jQuery("li",$.object_dom___options).first()[0]);
/* DEBUG <- */
				
/* DEBUG -> */
			}
			else
			{
				__object___E_Debugger.F_LogError
				({
					varchar___class_name:'C_SelectionField',
					varchar___method_name:'F_Initialize',
					string___description:"'object___configuration' null or undefined"
				});
			}
/* <- DEBUG */
		};
		
		$.object___o_Option=
		{
			F_Select:function(object_dom___option) //object_dom___option - 'LI'
			{
//				console.log(object_dom___option.sourceIndex-object_dom___option.parentNode.sourceIndex);
				$.object_object_dom___selected_option['_'+(object_dom___option.sourceIndex-object_dom___option.parentNode.sourceIndex)]=object_dom___option;
				$.object___selected_option_value['_'+(object_dom___option.sourceIndex-object_dom___option.parentNode.sourceIndex)]=object_dom___option.children[1].value; // second child input
				
				$.integer___selected_options_amount++;
					
				if ($.bool___multiple_options_selection && $.integer___selected_options_amount>1)
					$.object___C_InputField.object_dom___field.value="Multiple values selected";
//				else if ($.integer___selected_options_amount==0)
//					$.object___C_InputField.object_dom___field.value="";
				else 
					$.object___C_InputField.object_dom___field.value=jQuery(object_dom___option).children().first().text();
				
				jQuery(object_dom___option).addClass("class___element-status__selected").find('input').removeAttr("disabled");

                /*HERMiT*/
				if (!$.bool___multiple_options_selection && $.object_dom___previous_selected_option) {
                    $.object___o_Option.F_Unselect($.object_dom___previous_selected_option);
                    jQuery(object_dom___option).find('input').attr("checked", false);
                } else {
                    jQuery(object_dom___option).find('input').attr("checked", true);
                }

//					jQuery($.object_dom___previous_selected_option).removeClass("class___element-status__selected").find('input').attr("disabled","disabled");
				
				$.object_dom___previous_selected_option=object_dom___option;
			},
			F_Deselect:function(object_dom___option)
			{
				delete($.object___selected_option_value['_'+(object_dom___option.sourceIndex-object_dom___option.parentNode.sourceIndex)]);
				delete($.object_object_dom___selected_option['_'+(object_dom___option.sourceIndex-object_dom___option.parentNode.sourceIndex)]);
					
				$.integer___selected_options_amount--;
				
				if ($.bool___multiple_options_selection && $.integer___selected_options_amount>1)
					$.object___C_InputField.object_dom___field.value="Multiple values selected";
				else if ($.integer___selected_options_amount==0)
					$.object___C_InputField.object_dom___field.value="";
				else 
					for (var var___key in $.object_object_dom___selected_option)
						$.object___C_InputField.object_dom___field.value=jQuery($.object_object_dom___selected_option[var___key]).children().first().text();
				
				jQuery(object_dom___option).removeClass("class___element-status__selected").find('input').attr("disabled","disabled");
				
				$.object_dom___previous_selected_option=_;
			},
			F_Unselect:function(object_dom___option)
			{
				$.object___o_Option.F_Deselect(object_dom___option);
			},
			F_Add:function(string___title,string___value)
			{
				$.object___o_Option.F_Insert(string___title,string___value);
			},
			F_Delete:function(object_dom___option)
			{
				if ($.object___selected_option_value['_'+(object_dom___option.sourceIndex-object_dom___option.parentNode.sourceIndex)])
					$.object___o_Option.F_Unselect(object_dom___option);
				
				if ($.integer___selected_options_amount==0)
					$.object___C_InputField.F_ShowOverlay();
				
				jQuery(object_dom___option).remove();
			},
			F_DeleteAll:function(object_dom___option) // or index
			{
				jQuery("li",$.object_dom___options).each(function(index, element)
				{
					$.object___o_Option.F_Delete(this);
				});
				
				$.object___selected_option_value		=_;
				$.object_object_dom___selected_option	=_;
				
				$.object_dom___active_option			=_;
				$.object_dom___previous_active_option	=_;
				$.object_dom___previous_selected_option	=_;
			},
			F_Insert:function(string___title,string___value,object_dom___target,varchar___mode)
			{
				var varchar___mode=varchar___mode||'after';
				
				var object_dom___option=document.createElement('li');
				object_dom___option.innerHTML=string___title+'<input value="'+string___value+'"/>';
				
				jQuery(object_dom___option).on('mousedown',function()
				{
					$.object___o_Option.F_ProcessEvent_mousedown(this);
					return false;
				});
				jQuery(object_dom___option).on('mouseup',function()
				{
					$.object___o_Option.F_ProcessEvent_mouseup(this);
				});
				jQuery(object_dom___option).on('mouseenter',function()
				{
					$.object___o_Option.F_ProcessEvent_mouseover(this);
				});
				jQuery(object_dom___option).on('mouseleave',function()
				{
					$.object___o_Option.F_ProcessEvent_mouseout(this);
				});
				
				
				if (varchar___mode=='after')
				{
					if (object_dom___target)
						jQuery(object_dom___target).after(object_dom___option);
					else
						jQuery("li:last",$.object_dom___options).after(object_dom___option);
				}
				else if (varchar___mode=='before')
				{
					if (object_dom___target)
						jQuery(object_dom___target).before(object_dom___option);
					else
						jQuery("li:first",$.object_dom___options).before(object_dom___option);
				}
//	ANALYZE: varchar___mode=='replace'
				else if (varchar___mode=='instead' || varchar___mode=='replace')
				{
					if (object_dom___target)
						jQuery(object_dom___target).replaceWith(object_dom___option);
				}
			},
			
			F_ProcessEvent_mousedown:function(object_dom___option)
			{
				if (jQuery(object_dom___option).hasClass("class___element-status__selected"))
					$.object___o_Option.F_Unselect(object_dom___option);
				else
					$.object___o_Option.F_Select(object_dom___option);
				
				jQuery(object_dom___option).removeClass("class___element-status__mouseover").addClass("class___element-status__mousedown");
					
				var varchar___client_id=__IdentifyBrowser().varchar___id;
				if (!$.bool___multiple_options_selection)
				{
					$.bool___cancel_options_hiding=false;
					
//					if (varchar___client_id!='ie')
						$.F_HideOptions();
						
					setTimeout($.F_Focus,5);
				}
				else
				{
//	NOTE: in 'IE' based browsers onmousedown with 'return false' focus out from element, other browsers stay focused
					if (varchar___client_id!='ie')
						$.bool___cancel_options_hiding=false;
					else
					{
						$.bool___cancel_options_hiding=true;
						setTimeout($.object___C_InputField.F_Focus,5);
					}
				}

                /*HERMiT*/
                if ($.F_OnChange)
                    $.F_OnChange(this);

            },
			F_ProcessEvent_mouseup:function(object_dom___option)
			{
				jQuery(object_dom___option).removeClass("class___element-status__mousedown").addClass("class___element-status__mouseover");
			},
			F_ProcessEvent_mouseover:function(object_dom___option)
			{
				if ($.object_dom___active_option)
					jQuery($.object_dom___active_option).removeClass("class___element-status__mouseover");
				
				$.object_dom___active_option=object_dom___option;
				jQuery(object_dom___option).addClass("class___element-status__mouseover");
			},
			F_ProcessEvent_mouseout:function(object_dom___option)
			{
//	ANALYZE,NOTE: if need select exact item, on which mouse leave on keypress UP/DOWN start from last mouse selected element
				$.object_dom___previous_active_option	=$.object_dom___active_option;
				$.object_dom___active_option			=_;
				jQuery(object_dom___option).removeClass("class___element-status__mouseover").removeClass("class___element-status__mousedown");
			},
			
			
			F_ProcessEvent_keydown:function(object_dom___option)
			{
				if (jQuery(object_dom___option).hasClass("class___element-status__selected"))
					$.object___o_Option.F_Unselect(object_dom___option);
				else
					$.object___o_Option.F_Select(object_dom___option);
				
				jQuery(object_dom___option).removeClass("class___element-status__mouseover").addClass("class___element-status__mousedown");
					
				var varchar___client_id=__IdentifyBrowser().varchar___id;
				if (!$.bool___multiple_options_selection)
				{
					$.bool___cancel_options_hiding=false;
					
//					if (varchar___client_id!='ie')
						$.F_HideOptions();
				}
				else
				{
//	NOTE: in 'IE' based browsers onmousedown with 'return false' focus out from element, other browsers stay focused
					if (varchar___client_id!='ie')
						$.bool___cancel_options_hiding=false;
					else
					{
						$.bool___cancel_options_hiding=true;
						setTimeout($.object___C_InputField.F_Focus,5);
					}
				}
			},
			F_ProcessEvent_keyup:function()
			{
				if ($.bool___multiple_options_selection)
					jQuery($.object_dom___active_option).removeClass("class___element-status__mousedown").addClass("class___element-status__mouseover");
				else
					jQuery($.object_dom___active_option).removeClass("class___element-status__mousedown").removeClass("class___element-status__mouseover");
			}
		};
		
/*		$.F_CheckFocus=function()
		{
			if (jQuery($.object___C_InputField.object_dom___active_field).is(':focus'))
				$.object___C_InputField.F_Defocus();
			else
				$.object___C_InputField.F_Focus();
		};
*/
		
		$.F_Focus=function()
		{
			$.object_dom___swap_field.focus();
		};
		
//	*************************************************************************************************************************************************************************************************************
//	*************************************************************************************************************************************************************************************************************
		
		$.F_ShowOptions=function()
		{
			$.object_dom___options.style.display	='block';
			$.object_dom___component.style.zIndex	=11;
		};
		
		$.F_HideOptions=function()
		{			
			$.object_dom___options.style.display	='none';
			$.object_dom___component.style.zIndex	=0; // 'auto' doesn't work in IE6
		};
		
//	*************************************************************************************************************************************************************************************************************
//	*************************************************************************************************************************************************************************************************************

//	PERFORMANCE,ANALYZE: necessity to use cached value for some check or etc.
		$.F_GetValue=function()
		{
//			console.log($.object___selected_option_value);
//	preserve options selecting order			
			return __F_TransformObjectToString($.object___selected_option_value,$.string___multiple_values_separator);
//	preserve options postion order
//			return __F_TransformObjectToString($.object___selected_option_value,$.string___multiple_values_separator,_,true);
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
			else if ($.bool___multiple_options_selection && $.integer___selected_options_limit>0 && $.integer___selected_options_amount>$.integer___selected_options_limit)
			{
				$.F_SetValidationStatus(false,'overlimit');
				return false;
			}

			
//	ANALYZE: way how to validate each value in multivalues mode
						
			$.F_SetValidationStatus(true);
			return true;
		};
		
		$.F_SetValidationStatus=function(bool___status,varchar___error_type,string___error_desription)
		{
			if (bool___status)
			{				
				$.object___C_InputField.object_dom___component.children[0].className="class___element-validation_status__success";

				if ($.object_dom___validation_error_decription)
					$.object_dom___validation_error_decription.innerHTML="";
			}
			else if (varchar___error_type=='empty_field')
			{
				$.object___C_InputField.object_dom___component.children[0].className="class___element-validation_status__error class___element-validation_error_type__empty_field";

				if ($.object_dom___validation_error_decription)
					$.object_dom___validation_error_decription.innerHTML="This field can't be empty!";
			}
			else if (varchar___error_type=='overlimit')
			{
				$.object___C_InputField.object_dom___component.children[0].className="class___element-validation_status__error class___element-validation_error_type__overlimit";

				if ($.object_dom___validation_error_decription)
					$.object_dom___validation_error_decription.innerHTML="Too many options selected! Limit is: "+$.integer___selected_options_limit;
			}
		};
		
		$.F_ResetValidationStatus=function()
		{
			$.object___C_InputField.object_dom___component.children[0].className="";
		};
		
        /*HERMiT*/
        $.F_GetSelectedOption=function()
        {
            var
                v = jQuery($.object_dom___options).
                    find('ul:first').
                    find('li.class___element-status__selected').
                    attr('innerValue');

            if (typeof(v)=='undefined')
                v = $.object___C_InputField.object_dom___field.value;

            return v;
        };

        $.F_DeleteOptions=function()
        {
            jQuery($.object_dom___options).find('ul:first').empty();
            $.object___C_InputField.object_dom___field.value = 'Please select...';

        };

        $.F_AddOptions=function(aObjects)
        {
            var html = '';
            for(var i=0; i<aObjects.length; i++) {
               html += '<li innerValue="' + aObjects[i].value + '"><span>' + aObjects[i].text + '</span><input disabled="disabled" value="' + aObjects[i].value + '" /></li>';
            }

            jQuery($.object_dom___options).find('ul:first').append(html);

            $.F_Reinitialize();
        };

        $.F_ReplaceOptions=function(aObjects)
        {
            $.F_DeleteOptions();
            $.F_AddOptions(aObjects);
        };

        $.F_Reinitialize=function()
        {
            $.F_Initialize($.object___configuration);
        }
	};
	var __object_object___C_SelectionField={};
	
	
	

	
	
	
	