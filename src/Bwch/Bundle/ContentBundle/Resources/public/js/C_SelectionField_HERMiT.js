	
	var array___temp=[];

//	TODO: replace jQuery with CORE methods
	function C_SelectionField()
	{
		var $=this,
			_=null;
		
		$.object_dom___component;
		
		$.object_dom___options;
		
		$.object_dom___active_option=_; // highlighted, not selected
		
		$.object___C_InputField;

        /*HERMiT*/
        $.object___configuration;
//	ANALYZE: var name
		$.bool___option_selecting=false;
		
		$.bool___multiple_options_selecting=false;
		
		$.integer___selected_options_amount=0;
		
		
		$.F_Initialize=function(object___configuration)
		{
			if (object___configuration)
			{
                $.object___configuration = object___configuration;

				$.object_dom___component		=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id);
				$.object_dom___options			=jQuery($.object_dom___component).find('.class_div___element-SelectionField--options')[0];
				
				$.bool___multiple_options_selecting	=object___configuration.bool___multiple_options_selecting;

				$.object___C_InputField=new C_InputField;
				$.object___C_InputField.F_Initialize
				({
					object_dom___component:jQuery($.object_dom___component).find(".class_div___component-InputField")[0],
					bool___disabled_state:true
				});
				
//	Init default value
				
				if ($.object___C_InputField.object_dom___field.value)
				{
//	select option with default name
					jQuery($.object_dom___options).find('li').each(function()
					{
						if (jQuery(this).find('input')[0].value==$.object___C_InputField.object_dom___field.value)
							jQuery(this).addClass("class___element-status__selected");
					});
				}
				
				
                $.object___C_InputField.F_ProcessExternalActionOnEvent_focusin=function()
				{
					$.F_ShowOptions();
				};
				
				$.object___C_InputField.F_ProcessExternalActionOnEvent_focusout=function(varchar___mode)
				{
					if (varchar___mode!='force_hiding')
					{
						if (!$.bool___option_selecting
						|| ($.bool___option_selecting && !$.bool___multiple_options_selecting))
						$.F_HideOptions();
					}
					else if (varchar___mode=='force_hiding')
						$.F_HideOptions();
					
					
					$.bool___option_selecting=false;
				};
				
				$.object___C_InputField.F_ProcessExternalActionOnEvent_keypress=function(integer___key_code)
				{
					if (integer___key_code==38)
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
					else if (integer___key_code==40)
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
				
				
				jQuery("li",$.object_dom___options).on('mousedown',function()
				{

					if (jQuery(this).hasClass("class___element-status__selected"))
					{
						delete(array___temp[this.sourceIndex]);
						
						$.integer___selected_options_amount--;
						
						if ($.bool___multiple_options_selecting && $.integer___selected_options_amount>1)
							$.object___C_InputField.object_dom___field.value="Multiple values selected";
						else if ($.integer___selected_options_amount==0)
							$.object___C_InputField.object_dom___field.value="";
						else if ($.integer___selected_options_amount==1)
						{
							
							for (var var___key in array___temp)
							{
								$.object___C_InputField.object_dom___field.value=array___temp[var___key].children[0].value;
								break;
							}
						}
						else
							$.object___C_InputField.object_dom___field.value=jQuery(this).find('input')[0].value;
							
/*						if ($.bool___multiple_options_selecting)
							jQuery(this).find('input').attr("disabled","disabled");*/
                        jQuery(this).find('input').attr("checked", false);
					}
					else
					{
						array___temp[this.sourceIndex]=this;
						$.integer___selected_options_amount++;
						
						if ($.bool___multiple_options_selecting && $.integer___selected_options_amount>1)
							$.object___C_InputField.object_dom___field.value="Multiple values selected";
						else if ($.integer___selected_options_amount==0)
							$.object___C_InputField.object_dom___field.value="";
						else
							$.object___C_InputField.object_dom___field.value=jQuery(this).find('input')[0].value;
						
						
						
//	TEMP:
						if ($.bool___multiple_options_selecting)
						{
							jQuery(this).find('input').removeAttr("disabled");
						}
						else
						{
							jQuery($.object_dom___options).find('li').each(function()
							{
								jQuery(this).removeClass("class___element-status__mousedown").removeClass("class___element-status__selected");
                                jQuery(this).find('input').attr("checked", false);
							});
						}

                        jQuery(this).find('input').attr("checked", true);
                    }
					
					jQuery(this).removeClass("class___element-status__mouseover").addClass("class___element-status__mousedown");
					
					
					$.bool___option_selecting=true;

                    /*HERMiT*/
                    if ($.F_OnChange)
                        $.F_OnChange(this);

//	ANALYZE: ...
//					setTimeout($.object___C_InputField.object_dom___active_field.focus,10);
				});
				
				jQuery("li",$.object_dom___options).on('mouseup',function()
				{
					if (jQuery(this).hasClass("class___element-status__selected"))
					{
						jQuery(this).removeClass("class___element-status__mousedown").removeClass("class___element-status__selected").addClass("class___element-status__mouseover");
					}
					else
					{
						jQuery(this).removeClass("class___element-status__mousedown").addClass("class___element-status__selected").addClass("class___element-status__mouseover");
					}
					
					$.object___C_InputField.object_dom___active_field.focus();
				});
				
				jQuery("li",$.object_dom___options).on('mouseenter',function()
				{
					$.object_dom___active_option=this;

//	ANALYZE:
					jQuery(this).parent().find('li').each(function()
					{
						jQuery(this).removeClass("class___element-status__mouseover");
					});
										
					jQuery(this).addClass("class___element-status__mouseover");
				});
				jQuery("li",$.object_dom___options).on('mouseleave',function()
				{
					jQuery(this).removeClass("class___element-status__mouseover");

//	NOTE: if need select exect item, on which mouse leave on keypress UP/DOWN start from last mouse selected element
					$.object_dom___previous_active_option=$.object_dom___active_option;
					
					$.object_dom___active_option=_;
				});
		
			}
		};
		
		$.F_ShowOptions=function()
		{
			$.object_dom___options.style.display='block';
			
			$.object_dom___component.style.zIndex=11;
		};
		
		$.F_HideOptions=function()
		{
			$.object_dom___options.style.display='none';
			
			$.object_dom___component.style.zIndex='auto';
		};

        /*HERMiT*/
        $.F_GetSelectedOption=function()
        {
            var
                v = jQuery($.object_dom___options).
                    find('ul:first').
                    find('li.class___element-status__mousedown').
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
               html += '<li>' + aObjects[i].text + ' <input disabled="disabled" value="' + aObjects[i].value + '" /></li>';
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