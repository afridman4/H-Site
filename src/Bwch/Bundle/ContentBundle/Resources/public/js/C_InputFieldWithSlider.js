
	var __object___C_InputFieldWithSlider_configuration={};
	__object___C_InputFieldWithSlider_configuration.bool___mouse_text_selection_availability=true;
	__object___C_InputFieldWithSlider_configuration.varchar___active_component_id='';
	
	function C_InputFieldWithSlider()
	{
		var $=this,
			_=null;
		
		$.varchar___id;
		$.object_dom___component;
		
		$.integer___left_offset;
		
		$.object_dom___o_Slider;
		$.object_dom___input_field;
		
		$.string___value_prefix;
		$.string___value_postfix;

		$.integer___o_Slider_minimal_left_offset;
		$.integer___o_Slider_maximal_left_offset;
		
		$.integer___minimal_value_limit;
		$.integer___maximal_value_limit;
		
		$.integer___value_changing_step;
		
		$.array_object___mouse_cursor_position_info		=[];
		$.object_object___mouse_cursor_position_info	={};
		$.object_integer___o_Slider_left_offset_by_value={};
		
		$.string___alternative_minimal_value	="";
		$.string___alternative_maximal_value	="";
		
		$.integer___mouse_cursor_x_coordinate	=0;

		$.integer___mouse_cursor_position_index	=0;
		
		
		$.F_Initialize=function(object___configuration)
		{
			if (object___configuration)
			{
				$.varchar___id=object___configuration.varchar___id;
				
				$.object_dom___component		=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id);
													
				$.integer___offset_width		=$.object_dom___component.offsetWidth;//Math.floor(jQuery($.object_dom___component).outerWidth());
				
//				alert($.object_dom___component.offsetWidth+" : "+jQuery($.object_dom___component).outerWidth());

//	TODO: need update on window resize and recalculate depended values
				$.integer___left_offset			=__GetElementAbsoluteXCoordinate($.object_dom___component); //Math.floor(jQuery($.object_dom___component).offset().left);
				
				$.object_dom___o_Slider					=jQuery($.object_dom___component).children('i').children('b')[0];
				$.integer___o_Slider_offset_width		=$.object_dom___o_Slider.offsetWidth;

				$.integer___o_Slider_minimal_left_offset	=0;
				$.integer___o_Slider_maximal_left_offset	=$.integer___offset_width-$.integer___o_Slider_offset_width;
				
				$.object_dom___input_field		=jQuery($.object_dom___component).find('input')[0];
				
				$.integer___minimal_value_limit	=object___configuration.integer___minimal_value_limit;
				$.integer___maximal_value_limit	=object___configuration.integer___maximal_value_limit;
				
				$.string___value_prefix 		=object___configuration.string___value_prefix||"";
				$.string___value_postfix		=object___configuration.string___value_postfix||"";
				
				$.string___alternative_minimal_value			=object___configuration.string___alternative_minimal_value||"";
				$.string___alternative_maximal_value			=object___configuration.string___alternative_maximal_value||"";
				
				$.integer___value_changing_step					=object___configuration.integer___value_changing_step||1;

//	TODO: need add left shift to adjust indicators centering (current - process action by left side of indicator) shift=indicator_width/2;
				$.integer___minimal_mouse_x_coordinate			=$.integer___left_offset;
				$.integer___maximal_mouse_x_coordinate			=$.integer___left_offset+$.integer___offset_width-$.integer___o_Slider_offset_width;
				
				
				var integer___o_Slider_maximal_moving_step			=Math.ceil($.integer___o_Slider_maximal_left_offset/Math.ceil($.integer___maximal_value_limit/$.integer___value_changing_step));
				var integer___o_Slider_maximal_moving_steps_amount	=Math.ceil($.integer___maximal_value_limit/$.integer___value_changing_step);
				
				var integer___o_Slider_moving_step_adjustments_amount			=integer___o_Slider_maximal_moving_step*integer___o_Slider_maximal_moving_steps_amount-$.integer___o_Slider_maximal_left_offset;
				var integer___o_Slider_maximal_moving_step_adjustments_interval	=Math.floor(integer___o_Slider_maximal_moving_steps_amount/integer___o_Slider_moving_step_adjustments_amount);
				
/*				console.log($.integer___o_Slider_offset_width
							+":"+integer___o_Slider_maximal_moving_step
							+":"+integer___o_Slider_maximal_moving_steps_amount
							+":"+integer___o_Slider_moving_step_adjustments_amount
							+":"+integer___o_Slider_maximal_moving_step_adjustments_interval
							+"-----------------------------------------------------------------------");
*/				
								
				var integer___o_Slider_moving_step_adjustments_counter=0;
				var integer___o_Slider_left_offset=0;
				
				$.array_object___mouse_cursor_position_info[0]=
				{
					integer___o_Slider_left_offset:0,
					integer___value:$.integer___minimal_value_limit
				};
//				var integer___temp_value;
				for (var integer___index=1;integer___index<=integer___o_Slider_maximal_moving_steps_amount;integer___index++)
				{
//	TODO,IMPORTANT: for case with 'integer___o_Slider_maximal_moving_step_adjustments_interval=1' avoid first come min steps, then all max, its cause outcentering indicator on middle values (shifted to right)
					if (integer___index%integer___o_Slider_maximal_moving_step_adjustments_interval==0 
						&& integer___o_Slider_moving_step_adjustments_counter<integer___o_Slider_moving_step_adjustments_amount)
					{						
						integer___o_Slider_moving_step_adjustments_counter++;
						integer___o_Slider_left_offset+=integer___o_Slider_maximal_moving_step-1;
					}
					else 
						integer___o_Slider_left_offset+=integer___o_Slider_maximal_moving_step;
										
					$.array_object___mouse_cursor_position_info[integer___index]=
					{
						integer___o_Slider_left_offset	:integer___o_Slider_left_offset,
						integer___value					:integer___index*$.integer___value_changing_step>$.integer___maximal_value_limit?$.integer___maximal_value_limit:integer___index*$.integer___value_changing_step
					}
				}
//				console.log($.array_object___mouse_cursor_position_info);
				
				for (var integer___index=0;integer___index<$.array_object___mouse_cursor_position_info.length;integer___index++)
				{
					$.object_object___mouse_cursor_position_info['_'+$.array_object___mouse_cursor_position_info[integer___index].integer___o_Slider_left_offset]=
					{
						integer___o_Slider_left_offset	:$.array_object___mouse_cursor_position_info[integer___index].integer___o_Slider_left_offset,
						string___value					:$.F_AdjustValue($.array_object___mouse_cursor_position_info[integer___index].integer___value)
					};
//					console.log($.array_object___mouse_cursor_position_info[integer___index].integer___value+":"+$.array_object___mouse_cursor_position_info[integer___index].integer___o_Slider_left_offset);
//					console.log($.array_object___mouse_cursor_position_info[integer___index].integer___o_Slider_left_offset+":");
					
					$.object_integer___o_Slider_left_offset_by_value['_'+$.array_object___mouse_cursor_position_info[integer___index].integer___value]=$.array_object___mouse_cursor_position_info[integer___index].integer___o_Slider_left_offset;
				}
				$.array_object___mouse_cursor_position_info=_;
			
				
				$.object_dom___o_Slider.onmousedown=function(object_dom___event)
				{
//					console.log($.object_dom___o_Slider);
	//				document.body.style.cursor='pointer';
					document.getElementById("id_div___layer-Main").style.cursor="pointer"; //fix for FF
					
					__object___C_InputFieldWithSlider_configuration.varchar___active_component_id=$.varchar___id;
					$.object___o_Slider.F_ProcessEvent_mousedown(object_dom___event);
					return false;
				};
	
				jQuery($.object_dom___input_field).on('keydown',function(object_dom___event)
				{
	//	ANALYZE: need fix
	/*				if (parseInt(object_dom___event.keyCode)>=48 && parseInt(object_dom___event.keyCode)<=57)
						setTimeout(function()
						{
							$.object___o_Slider.F_SetPositionByValue(null,false);
						},100);
	*/				
					if (object_dom___event.keyCode==13)
						$.object___o_Slider.F_SetPositionByValue();
				});

				$.object___o_Slider.F_SetPositionByValue();
			
			}
		};
		
		$.object___o_Slider=
		{
			F_ProcessEvent_mousedown:function()
			{
				__object___C_InputFieldWithSlider_configuration.bool___mouse_text_selection_availability=false;
			},
			F_ProcessEvent_mouseup:function()
			{
				__object___C_InputFieldWithSlider_configuration.bool___mouse_text_selection_availability=true;
				__object___C_InputFieldWithSlider_configuration.varchar___active_component_id=_;
				
				document.getElementById("id_div___layer-Main").style.cursor="default"; //fix for FF
//				document.body.style.cursor='default';
			},
			F_ProcessEvent_mousemove:function(object_dom___event)
			{
				object_dom___event=object_dom___event||event;
				
				$.integer___mouse_cursor_x_coordinate=object_dom___event.clientX||object_dom___event.pageX;
								
//				console.log(document.documentElement.scrollLeft+":"+jQuery(document).scrollLeft())
				$.integer___mouse_cursor_x_coordinate+=Math.ceil(jQuery(document).scrollLeft()); //document.body.scrollLeft
				
				
				if ($.integer___mouse_cursor_x_coordinate>=$.integer___maximal_mouse_x_coordinate)
					$.integer___mouse_cursor_position_index=$.integer___o_Slider_maximal_left_offset;
				else if ($.integer___mouse_cursor_x_coordinate<=$.integer___minimal_mouse_x_coordinate)
					$.integer___mouse_cursor_position_index=0;
				else 
					$.integer___mouse_cursor_position_index=$.integer___mouse_cursor_x_coordinate-$.integer___left_offset;
				
//				console.log($.integer___left_offset+":"+$.integer___mouse_cursor_position_index+":"+$.integer___o_Slider_maximal_left_offset);
				
//	Fix for cases, when EVENT take a miss
/*				if ($.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index]===undefined)
					while (true)
					{
						$.integer___mouse_cursor_position_index++;
						if ($.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index])
						{
							$.object_dom___o_Slider.style.left	=$.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index].integer___o_Slider_left_offset+'px';
							$.object_dom___input_field.value			=$.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index].string___value;
						}
						break;
					}
*/
//	ANALYZE: necessity
//	Fix for case when cursor position miss (+-1px)
				if ($.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index]===undefined)
					$.integer___mouse_cursor_position_index++;
				if ($.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index]===undefined)
					$.integer___mouse_cursor_position_index-=2;
				if ($.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index])
				{
					$.object_dom___o_Slider.style.left	=$.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index].integer___o_Slider_left_offset+'px';
					$.object_dom___input_field.value	=$.object_object___mouse_cursor_position_info['_'+$.integer___mouse_cursor_position_index].string___value;
				}
				
			},
//	ANALYZE: necessity of 'bool___field_value_updated'
			F_SetPositionByValue:function(integer___value,bool___field_value_updated)
			{
				if (integer___value===undefined)
					integer___value=parseInt($.object_dom___input_field.value,10)||$.integer___minimal_value_limit;
                /*HERMiT*/
				if (integer___value >= 0)
				{
					var integer___o_Slider_left_offset;
					if (integer___value>=$.integer___maximal_value_limit)
//	TODO: need fix for case when $.object_object___mouse_cursor_position_info['_1']=0 reqrited by 1 (when value 100 max, interval 1)
//						integer___o_Slider_left_offset=$.object_integer___o_Slider_left_offset_by_value['_'+$.integer___maximal_value_limit];
						integer___o_Slider_left_offset=$.integer___o_Slider_maximal_left_offset;
					else if (integer___value<=$.integer___minimal_value_limit)
//						integer___o_Slider_left_offset=$.object_integer___o_Slider_left_offset_by_value['_'+$.integer___minimal_value_limit];
						integer___o_Slider_left_offset=$.integer___o_Slider_minimal_left_offset;
					else
					{
						if (integer___value%$.integer___value_changing_step!=0)
							integer___value=Math.ceil(integer___value/$.integer___value_changing_step)*$.integer___value_changing_step;
						integer___o_Slider_left_offset=$.object_integer___o_Slider_left_offset_by_value['_'+integer___value];
					}
					
					if (bool___field_value_updated!==false)
						$.object_dom___input_field.value=$.F_AdjustValue(integer___value);
					
					$.object_dom___o_Slider.style.left=integer___o_Slider_left_offset+'px';
				}
			}
		};
		
		$.F_AdjustValue=function(integer___value)
		{
			if (integer___value>=$.integer___maximal_value_limit)
				return $.string___alternative_maximal_value||$.string___value_prefix+$.integer___maximal_value_limit+$.string___value_postfix;
			else if (integer___value<=$.integer___minimal_value_limit)// && integer___value-$.integer___value_changing_step!=0)
				return $.string___alternative_minimal_value||$.string___value_prefix+$.integer___minimal_value_limit+$.string___value_postfix;
			else 
				return $.string___value_prefix+integer___value+$.string___value_postfix;
		};
		
	};
	var __object_object___C_InputFieldWithSlider={};
	
	
	