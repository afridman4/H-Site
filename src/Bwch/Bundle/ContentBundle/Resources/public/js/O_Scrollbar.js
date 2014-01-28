
	var __object___O_Scrollbar_configuration={};
	__object___O_Scrollbar_configuration.bool___mouse_text_selection_availability=true;
	__object___O_Scrollbar_configuration.varchar___active_component_id='';

//	IMPORTANT,TODO,ANALYZE: object or component???
//	IMPORTANT: add event stack processing (by component ID check if an event (shared between some components) already asigned)

//	ANALYZE: cases when use coordinate(x,y) | offset(top,left,vertical)
	function O_Scrollbar()
	{
		var $=this,
			_=null;
		
		$.varchar___id								='';
		$.varchar___position						='';
		$.object_dom___component					=_;
		
		$.integer___left_offset						=0;
		$.integer___top_offset						=0;
		
		$.object_dom___o_Slider						=_;
		$.integer___o_Slider_offset_width			=0;
		$.integer___o_Slider_offset_height			=0;
		$.integer___o_Slider_minimal_left_offset	=0;
		$.integer___o_Slider_maximal_left_offset	=0;
		
//	TEMP:
		$.integer___minimal_value_limit=0;
		$.integer___maximal_value_limit=0;
		$.integer___value_changing_step=0;
		
//	TEMP:
		$.array_object___mouse_cursor_position_info		=[];
		$.object_object___mouse_cursor_position_info	={};
		$.object_integer___o_Slider_left_offset_by_value={};
		
		
//	ANALYZE:
		$.integer___target_scrolling_minimal_left_offset	=0;
		$.integer___target_scrolling_maximal_left_offset	=0;
		$.integer___target_scrolling_minimal_top_offset		=0;
		$.integer___target_scrolling_maximal_top_offset		=0;		
		
		
		$.integer___minimal_mouse_cursor_coordinate_x=0;
		$.integer___maximal_mouse_cursor_coordinate_x=0;
		$.integer___minimal_mouse_cursor_coordinate_y=0;
		$.integer___maximal_mouse_cursor_coordinate_y=0;

		$.integer___mouse_cursor_coordinate_x=0;
		$.integer___mouse_cursor_coordinate_y=0;
		
		$.integer___previous_mouse_cursor_coordinate_x=0;
		$.integer___previous_mouse_cursor_coordinate_y=0;
		
		$.integer___mouse_cursor_horizontal_offset	=0;
		$.integer___mouse_cursor_vertical_offset	=0;
		
		$.float___o_Slider_movement_step			=0;
		
		
		$.F_ExecuteActionAfterScrollReachedRightEnd=_;
		
		
		$.F_Initialize=function(object___configuration)
		{
			if (object___configuration)
			{
				$.varchar___id=object___configuration.varchar___id;
				
				$.varchar___position=object___configuration.varchar___position;
				
				$.object_dom___component	=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id);
				$.object_dom___o_Slider		=jQuery("div div",$.object_dom___component)[0];
				
				if (!object___configuration.object_dom___target && !object___configuration.string___target_DOM_id)
					$.object_dom___target	=$.object_dom___component.parentNode.children[0];
				else 
					$.object_dom___target	=object___configuration.object_dom___target||document.getElementById(object___configuration.string___target_DOM_id);
					

				if ($.varchar___position=='horizontal')
				{
					$.integer___offset_width						=$.object_dom___component.offsetWidth;//Math.floor(jQuery($.object_dom___component).outerWidth());
	
//	TODO: need update on window resize and recalculate depended values
					$.integer___left_offset							=__GetElementAbsoluteXCoordinate($.object_dom___component); //Math.floor(jQuery($.object_dom___component).offset().left);
					
					$.integer___o_Slider_minimal_offset_width		=50;
					$.integer___o_Slider_maximal_left_offset		=$.integer___offset_width-$.integer___o_Slider_minimal_offset_width;
					
//	ANALYZE: case, when separate controls present, need include their dimensions
//	ANALYZE: when start offset not 0, saved scrolling position
					$.integer___o_Slider_minimal_left_offset		=0;
					
					$.integer___target_scrolling_minimal_left_offset=0;
//	IMPORTANT,ANALYZE: possible problem width border, padding/margin while calculating offsetWidth/offsetHeight
					$.integer___target_scrolling_maximal_left_offset=$.object_dom___target.scrollWidth-$.object_dom___target.offsetWidth;
					
					var integer___borders_width=jQuery($.object_dom___component).children('div').children('b').width()+jQuery($.object_dom___component).children('div').children('i').width();

					jQuery($.object_dom___component).children('div').children('em').css('width',$.integer___offset_width-integer___borders_width+'px');
					
					if ($.integer___target_scrolling_maximal_left_offset>$.integer___o_Slider_maximal_left_offset)
					{
						$.integer___o_Slider_offset_width			=$.integer___o_Slider_minimal_offset_width;
						$.integer___o_Slider_maximal_left_offset	=$.integer___offset_width-$.integer___o_Slider_offset_width;

						$.object___o_Slider.F_InitializeWidth(integer___borders_width);
						
						$.integer___minimal_mouse_cursor_coordinate_x=$.integer___left_offset;
						$.integer___maximal_mouse_cursor_coordinate_x=$.integer___left_offset+$.integer___offset_width-$.integer___o_Slider_offset_width;
						
						
						var integer___target_scrolling_step						=Math.ceil($.integer___target_scrolling_maximal_left_offset/$.integer___o_Slider_maximal_left_offset);
						$.float___o_Slider_movement_step						=$.integer___o_Slider_maximal_left_offset/$.integer___target_scrolling_maximal_left_offset;
//	if (integer___o_Slider.movement_step==1)
						var integer___target_scrolling_steps_amount				=Math.ceil($.integer___o_Slider_maximal_left_offset);
						
						var integer___target_scrolling_step_adjustments_amount	=integer___target_scrolling_step*integer___target_scrolling_steps_amount-$.integer___target_scrolling_maximal_left_offset;
						var integer___target_scrolling_step_adjustments_interval=Math.floor(integer___target_scrolling_steps_amount/integer___target_scrolling_step_adjustments_amount);
						
						$.object___o_Slider.F_CalculateMovementSteps
						(
							integer___target_scrolling_step,
							integer___target_scrolling_steps_amount,
							integer___target_scrolling_step_adjustments_amount,
							integer___target_scrolling_step_adjustments_interval
						);
						
//	ANALYZE,TODO: need adjustment of accuracy

//	set slider position by target
						$.object___o_Slider.F_InitializePosition();
						
						$.object___o_Slider.F_ProcessEvent_mousemove=function(object_dom___event)
						{
							object_dom___event=object_dom___event||event;
							
							$.integer___mouse_cursor_coordinate_x=object_dom___event.clientX||object_dom___event.pageX;
							
							$.integer___mouse_cursor_coordinate_x+=Math.ceil(jQuery(document).scrollLeft()); //document.body.scrollLeft
								
							$.integer___mouse_cursor_horizontal_offset=$.integer___mouse_cursor_coordinate_x-$.integer___previous_mouse_cursor_coordinate_x;
							
							if ($.object_dom___o_Slider.offsetLeft+$.integer___mouse_cursor_horizontal_offset>=$.integer___o_Slider_maximal_left_offset)
							{
								$.object___o_Slider.integer___movement_step_index	=integer___target_scrolling_steps_amount;
								
								$.object_dom___o_Slider.style.left			=$.integer___o_Slider_maximal_left_offset+'px';
								$.object_dom___target.scrollLeft			=$.integer___target_scrolling_maximal_left_offset;

								if (typeof($.F_ExecuteActionAfterScrollReachedRightEnd)=='function')
									$.F_ExecuteActionAfterScrollReachedRightEnd();
							}
							else if ($.object_dom___o_Slider.offsetLeft+$.integer___mouse_cursor_horizontal_offset<=$.integer___o_Slider_minimal_left_offset)
							{
								$.object___o_Slider.integer___movement_step_index	=0;
								
								$.object_dom___o_Slider.style.left			=$.integer___o_Slider_minimal_left_offset+'px';
								$.object_dom___target.scrollLeft			=$.integer___target_scrolling_minimal_left_offset;
							}
							else
							{
//								$.integer___mouse_cursor_vertical_offset	=$.integer___mouse_cursor_coordinate_y-$.integer___previous_mouse_cursor_coordinate_y;
								$.object_dom___o_Slider.style.left			=$.object_dom___o_Slider.offsetLeft+$.integer___mouse_cursor_horizontal_offset+'px';


//								console.log($.object___o_Slider.integer___mouse_cursor_top_offset+":"+$.object___o_Slider.integer___action_point_top_offset);
								
//	if $.object___o_Slider step ==1 
/*								if ($.integer___mouse_cursor_coordinate_y>$.integer___previous_mouse_cursor_coordinate_y)
									$.object___o_Slider.integer___movement_step_index++;
								else if ($.integer___mouse_cursor_coordinate_y<$.integer___previous_mouse_cursor_coordinate_y)
									$.object___o_Slider.integer___movement_step_index--;
								
								if ($.object___o_Slider.integer___movement_step_index>integer___target_scrolling_steps_amount)
									$.object___o_Slider.integer___movement_step_index=integer___target_scrolling_steps_amount;
								else if ($.object___o_Slider.integer___movement_step_index<0)
									$.object___o_Slider.integer___movement_step_index=0;
*/
/*	if $.object___o_Slider step >1
								$.object___o_Slider.integer___mouse_cursor_top_offset=$.integer___mouse_cursor_coordinate_y-$.integer___top_offset-$.object_dom___o_Slider.offsetTop;
								
								if ($.object___o_Slider.integer___mouse_cursor_top_offset>$.object___o_Slider.integer___action_point_top_offset)
									$.object___o_Slider.integer___movement_step_index++;
								else if ($.object___o_Slider.integer___mouse_cursor_top_offset<$.object___o_Slider.integer___action_point_top_offset)
									$.object___o_Slider.integer___movement_step_index--;
*/
//console.log($.object___o_Slider.array_object___movement_step_info[$.object___o_Slider.integer___movement_step_index].integer___target_scrolling_offset)
								$.object_dom___target.scrollLeft=$.object___o_Slider.array_object___movement_step_info[$.object_dom___o_Slider.offsetLeft].integer___target_scrolling_offset;
								
								$.integer___previous_mouse_cursor_coordinate_x=$.integer___mouse_cursor_coordinate_x;
							}
						};
					}
					else
					{
						$.integer___o_Slider_offset_width			=$.integer___offset_width-$.integer___target_scrolling_maximal_left_offset;
						$.integer___o_Slider_maximal_left_offset	=$.integer___offset_width-$.integer___o_Slider_offset_width;
						
						if ($.object_dom___target.scrollLeft>0)
							$.object_dom___o_Slider.style.left=$.object_dom___target.scrollLeft+'px';
						
						$.object___o_Slider.F_InitializeWidth(integer___borders_width);
						
						$.object___o_Slider.F_ProcessEvent_mousemove=function(object_dom___event)
						{
							object_dom___event=object_dom___event||event;
							
							$.integer___mouse_cursor_coordinate_x=object_dom___event.clientX||object_dom___event.pageX;

							$.integer___mouse_cursor_coordinate_x+=Math.ceil(jQuery(document).scrollLeft()); //document.body.scrollLeft
						
							$.integer___mouse_cursor_horizontal_offset=$.integer___mouse_cursor_coordinate_x-$.integer___previous_mouse_cursor_coordinate_x;
							
							if ($.object_dom___o_Slider.offsetLeft+$.integer___mouse_cursor_horizontal_offset>=$.integer___o_Slider_maximal_left_offset)
								$.object_dom___o_Slider.style.left=$.integer___o_Slider_maximal_left_offset+'px';
							else if ($.object_dom___o_Slider.offsetLeft+$.integer___mouse_cursor_horizontal_offset<=$.integer___o_Slider_minimal_left_offset)
								$.object_dom___o_Slider.style.left=$.integer___o_Slider_minimal_left_offset+'px';
							else
							{
								$.object_dom___o_Slider.style.left=$.object_dom___o_Slider.offsetLeft+$.integer___mouse_cursor_horizontal_offset+'px';
								
								$.integer___previous_mouse_cursor_coordinate_x=$.integer___mouse_cursor_coordinate_x;
							}
							
							$.object_dom___target.scrollLeft=$.object_dom___o_Slider.offsetLeft;
						};
					}
					
				}
				else if ($.varchar___position=='vertical')
				{
					$.integer___offset_height						=$.object_dom___component.offsetHeight;//Math.floor(jQuery($.object_dom___component).outerWidth());
	
//	TODO: need update on window resize and recalculate depended values
					$.integer___top_offset							=__GetElementAbsoluteYCoordinate($.object_dom___component); //Math.floor(jQuery($.object_dom___component).offset().left);
					
					$.integer___o_Slider_minimal_offset_height		=50;
					$.integer___o_Slider_maximal_top_offset			=$.integer___offset_height-$.integer___o_Slider_minimal_offset_height;
					
//	ANALYZE: case, when separate controls present, need include their dimensions
//	ANALYZE: when start offset not 0, saved scrolling position
					$.integer___o_Slider_minimal_top_offset			=0;
					
					$.integer___target_scrolling_minimal_top_offset	=0;
//	IMPORTANT,ANALYZE: possible problem width border, padding/margin while calculating offsetWidth/offsetHeight
					$.integer___target_scrolling_maximal_top_offset	=$.object_dom___target.scrollHeight-$.object_dom___target.offsetHeight;
					
					var integer___borders_height=jQuery($.object_dom___component).children('div').children('b').height()+jQuery($.object_dom___component).children('div').children('i').height();

					jQuery($.object_dom___component).children('div').children('em').css('height',$.integer___offset_height-integer___borders_height+'px');
					
					if ($.integer___target_scrolling_maximal_top_offset>$.integer___o_Slider_maximal_top_offset)
					{
						$.integer___o_Slider_offset_height		=$.integer___o_Slider_minimal_offset_height;
						$.integer___o_Slider_maximal_top_offset	=$.integer___offset_height-$.integer___o_Slider_offset_height;
						
						$.object___o_Slider.F_InitializeHeight(integer___borders_height);
						
						$.integer___minimal_mouse_cursor_coordinate_y=$.integer___top_offset;
						$.integer___maximal_mouse_cursor_coordinate_y=$.integer___top_offset+$.integer___offset_height-$.integer___o_Slider_offset_height;
						
//						$.integer___minimal_value_limit	=object___configuration.integer___minimal_value_limit;
//						$.integer___maximal_value_limit	=object___configuration.integer___maximal_value_limit;
		
//						$.integer___value_changing_step					=object___configuration.integer___value_changing_step||1;
						
						var integer___target_scrolling_step						=Math.ceil($.integer___target_scrolling_maximal_top_offset/$.integer___o_Slider_maximal_top_offset);
						$.float___o_Slider_movement_step						=$.integer___o_Slider_maximal_top_offset/$.integer___target_scrolling_maximal_top_offset;
//	if (integer___o_Slider.movement_step==1)
						var integer___target_scrolling_steps_amount				=Math.ceil($.integer___o_Slider_maximal_top_offset);
						
						var integer___target_scrolling_step_adjustments_amount	=integer___target_scrolling_step*integer___target_scrolling_steps_amount-$.integer___target_scrolling_maximal_top_offset;
						var integer___target_scrolling_step_adjustments_interval=Math.floor(integer___target_scrolling_steps_amount/integer___target_scrolling_step_adjustments_amount);
						
/*						console.log
						(
							integer___target_scrolling_step*integer___target_scrolling_steps_amount+"\r\n"
								+":"+$.integer___o_Slider_maximal_top_offset+"\r\n"
								+":"+integer___target_scrolling_step+"\r\n"
								+":"+integer___target_scrolling_steps_amount+"\r\n"
								+":"+integer___target_scrolling_step_adjustments_amount+"\r\n"
								+":"+integer___target_scrolling_step_adjustments_interval+"\r\n"
								+"-----------------------------------------------------------------------"
						);
*/						
//						F_CalculateMovementSteps(integer___maximal_step,integer___maximal_steps_amount,integer___step_adjustments_amount,integer___maximal_step_adjustments_interval);
						$.object___o_Slider.F_CalculateMovementSteps
						(
							integer___target_scrolling_step,
							integer___target_scrolling_steps_amount,
							integer___target_scrolling_step_adjustments_amount,
							integer___target_scrolling_step_adjustments_interval
						);
						
//	ANALYZE,TODO: need adjustment of accuracy
//						console.log($.object_dom___target.scrollTop+":"+$.float___o_Slider_movement_step);
//	set slider position by target
						$.object___o_Slider.F_InitializePosition();
						
//						console.log($.object___o_Slider.array_object___movement_step_info);
						
						$.object___o_Slider.F_ProcessEvent_mousemove=function(object_dom___event)
						{
							object_dom___event=object_dom___event||event;
							
							$.integer___mouse_cursor_coordinate_y=object_dom___event.clientY||object_dom___event.pageY;
							
							$.integer___mouse_cursor_coordinate_y+=Math.ceil(jQuery(document).scrollTop()); //document.body.scrollLeft
								
							$.integer___mouse_cursor_vertical_offset=$.integer___mouse_cursor_coordinate_y-$.integer___previous_mouse_cursor_coordinate_y;
							
							if ($.object_dom___o_Slider.offsetTop+$.integer___mouse_cursor_vertical_offset>=$.integer___o_Slider_maximal_top_offset)
							{
								$.object___o_Slider.integer___movement_step_index	=integer___target_scrolling_steps_amount;
								
								$.object_dom___o_Slider.style.top					=$.integer___o_Slider_maximal_top_offset+'px';
								$.object_dom___target.scrollTop			=$.integer___target_scrolling_maximal_top_offset;
							}
							else if ($.object_dom___o_Slider.offsetTop+$.integer___mouse_cursor_vertical_offset<=$.integer___o_Slider_minimal_top_offset)
							{
								$.object___o_Slider.integer___movement_step_index	=0;
								
								$.object_dom___o_Slider.style.top					=$.integer___o_Slider_minimal_top_offset+'px';
								$.object_dom___target.scrollTop			=$.integer___target_scrolling_minimal_top_offset;
							}
							else
							{
//								$.integer___mouse_cursor_vertical_offset	=$.integer___mouse_cursor_coordinate_y-$.integer___previous_mouse_cursor_coordinate_y;
								$.object_dom___o_Slider.style.top			=$.object_dom___o_Slider.offsetTop+$.integer___mouse_cursor_vertical_offset+'px';


//								console.log($.object___o_Slider.integer___mouse_cursor_top_offset+":"+$.object___o_Slider.integer___action_point_top_offset);
								
//	if $.object___o_Slider step ==1 
/*								if ($.integer___mouse_cursor_coordinate_y>$.integer___previous_mouse_cursor_coordinate_y)
									$.object___o_Slider.integer___movement_step_index++;
								else if ($.integer___mouse_cursor_coordinate_y<$.integer___previous_mouse_cursor_coordinate_y)
									$.object___o_Slider.integer___movement_step_index--;
								
								if ($.object___o_Slider.integer___movement_step_index>integer___target_scrolling_steps_amount)
									$.object___o_Slider.integer___movement_step_index=integer___target_scrolling_steps_amount;
								else if ($.object___o_Slider.integer___movement_step_index<0)
									$.object___o_Slider.integer___movement_step_index=0;
*/
/*	if $.object___o_Slider step >1
								$.object___o_Slider.integer___mouse_cursor_top_offset=$.integer___mouse_cursor_coordinate_y-$.integer___top_offset-$.object_dom___o_Slider.offsetTop;
								
								if ($.object___o_Slider.integer___mouse_cursor_top_offset>$.object___o_Slider.integer___action_point_top_offset)
									$.object___o_Slider.integer___movement_step_index++;
								else if ($.object___o_Slider.integer___mouse_cursor_top_offset<$.object___o_Slider.integer___action_point_top_offset)
									$.object___o_Slider.integer___movement_step_index--;
*/
//console.log($.object___o_Slider.array_object___movement_step_info[$.object___o_Slider.integer___movement_step_index].integer___target_scrolling_offset)
								$.object_dom___target.scrollTop=$.object___o_Slider.array_object___movement_step_info[$.object_dom___o_Slider.offsetTop].integer___target_scrolling_offset;
								
								$.integer___previous_mouse_cursor_coordinate_y=$.integer___mouse_cursor_coordinate_y;
							}
						};
					}
					else
					{
						$.integer___o_Slider_offset_height		=$.integer___offset_height-$.integer___target_scrolling_maximal_top_offset;
						$.integer___o_Slider_maximal_top_offset	=$.integer___offset_height-$.integer___o_Slider_offset_height;
						
						if ($.object_dom___target.scrollTop>0)
							$.object_dom___o_Slider.style.top=$.object_dom___target.scrollTop+'px';

						$.object___o_Slider.F_InitializeHeight(integer___borders_height);
						
						$.object___o_Slider.F_ProcessEvent_mousemove=function(object_dom___event)
						{
							object_dom___event=object_dom___event||event;
							
							$.integer___mouse_cursor_coordinate_y=object_dom___event.clientY||object_dom___event.pageY;

							$.integer___mouse_cursor_coordinate_y+=Math.ceil(jQuery(document).scrollTop()); //document.body.scrollLeft
							
							$.integer___mouse_cursor_vertical_offset=$.integer___mouse_cursor_coordinate_y-$.integer___previous_mouse_cursor_coordinate_y;
							
							if ($.object_dom___o_Slider.offsetTop+$.integer___mouse_cursor_vertical_offset>=$.integer___o_Slider_maximal_top_offset)
								$.object_dom___o_Slider.style.top=$.integer___o_Slider_maximal_top_offset+'px';
							else if ($.object_dom___o_Slider.offsetTop+$.integer___mouse_cursor_vertical_offset<=$.integer___o_Slider_minimal_top_offset)
								$.object_dom___o_Slider.style.top=$.integer___o_Slider_minimal_top_offset+'px';
							else
							{
								$.object_dom___o_Slider.style.top=$.object_dom___o_Slider.offsetTop+$.integer___mouse_cursor_vertical_offset+'px';
								
								$.integer___previous_mouse_cursor_coordinate_y=$.integer___mouse_cursor_coordinate_y;
							}
							
							$.object_dom___target.scrollTop=$.object_dom___o_Slider.offsetTop;
						};
					}

/*					console.log($.object_dom___component.offsetHeight);
					console.log
					(
						$.integer___offset_height+"\r\n"
							+":"+$.integer___top_offset+"\r\n"
							+":"+$.integer___o_Slider_maximal_top_offset+"\r\n"
							+":"+$.integer___target_scrolling_maximal_top_offset+"\r\n"
							+":"+$.object_dom___target.scrollHeight+":"+$.object_dom___target.offsetHeight+"\r\n"
							+"-----------------------------------------------------------------------"
					);
*/
				}
				
				$.object_dom___o_Slider.onmousedown=function(object_dom___event)
				{
					$.object___o_Slider.F_ProcessEvent_mousedown(object_dom___event);
					return false;
				};
				
				jQuery($.object_dom___component).children('div').children('em').on('mousedown',function(object_dom___event)
				{
					$.object___o_Slider.F_MoveToMouseCursor(object_dom___event);
				});


/*				console.log($.integer___o_Slider_offset_width
							+":"+integer___o_Slider_maximal_moving_step
							+":"+integer___o_Slider_maximal_moving_steps_amount
							+":"+integer___o_Slider_moving_step_adjustments_amount
							+":"+integer___o_Slider_maximal_moving_step_adjustments_interval
							+"-----------------------------------------------------------------------");
*/
//	ANALYZE: necessity to check availability before full initialization
				$.F_CheckAvailability();
			}
		};
		
		$.object___o_Slider=
		{
			integer___action_point_top_offset	:0,
			integer___action_point_left_offset	:0,

			integer___mouse_cursor_left_offset	:0,
			integer___mouse_cursor_top_offset	:0,
			
			array_object___movement_step_info 	:[],
			
			integer___movement_step_index		:0,
			integer___movement_steps_amount		:0,
			
			F_InitializePosition:function()
			{
				if ($.object_dom___target.scrollLeft>0)
				{
					if (Math.ceil($.object_dom___target.scrollLeft*$.float___o_Slider_movement_step)>=$.integer___o_Slider_maximal_left_offset)
						$.object_dom___o_Slider.style.left=$.integer___o_Slider_maximal_left_offset+'px';
					else if (Math.ceil($.object_dom___target.scrollLeft*$.float___o_Slider_movement_step)<=$.integer___o_Slider_minimal_left_offset)
						$.object_dom___o_Slider.style.left=$.integer___o_Slider_minimal_left_offset+'px';
					else 
						$.object_dom___o_Slider.style.left=Math.ceil($.object_dom___target.scrollLeft*$.float___o_Slider_movement_step)+'px';
				}
				else if ($.object_dom___target.scrollTop>0)
				{
					if (Math.ceil($.object_dom___target.scrollTop*$.float___o_Slider_movement_step)>=$.integer___o_Slider_maximal_top_offset)
						$.object_dom___o_Slider.style.top=$.integer___o_Slider_maximal_top_offset+'px';
					else if (Math.ceil($.object_dom___target.scrollTop*$.float___o_Slider_movement_step)<=$.integer___o_Slider_minimal_top_offset)
						$.object_dom___o_Slider.style.top=$.integer___o_Slider_minimal_top_offset+'px';
					else 
						$.object_dom___o_Slider.style.top=Math.ceil($.object_dom___target.scrollTop*$.float___o_Slider_movement_step)+'px';
				}
			},
			
			F_InitializeWidth:function(integer___borders_width)
			{
				jQuery($.object_dom___o_Slider).css('width',$.integer___o_Slider_offset_width+'px');
				jQuery($.object_dom___o_Slider).children('em').css('width',$.integer___o_Slider_offset_width-integer___borders_width+'px');
			},
			F_InitializeHeight:function(integer___borders_height)
			{
				jQuery($.object_dom___o_Slider).css('height',$.integer___o_Slider_offset_height+'px');
				jQuery($.object_dom___o_Slider).children('em').css('height',$.integer___o_Slider_offset_height-integer___borders_height+'px');
			},
			
			F_ProcessEvent_mousedown:function(object_dom___event)
			{
				object_dom___event=object_dom___event||event;
				
				$.integer___mouse_cursor_coordinate_x=object_dom___event.clientX||object_dom___event.pageX;
				$.integer___mouse_cursor_coordinate_y=object_dom___event.clientY||object_dom___event.pageY;
				
				$.integer___mouse_cursor_coordinate_x+=Math.ceil(jQuery(document).scrollLeft()); //document.body.scrollLeft
				$.integer___mouse_cursor_coordinate_y+=Math.ceil(jQuery(document).scrollTop()); //document.body.scrollTop
				
				$.integer___previous_mouse_cursor_coordinate_x=$.integer___mouse_cursor_coordinate_x;
				$.integer___previous_mouse_cursor_coordinate_y=$.integer___mouse_cursor_coordinate_y;
				
				$.object___o_Slider.integer___action_point_left_offset	=$.integer___mouse_cursor_coordinate_x-$.integer___left_offset-$.object_dom___o_Slider.offsetLeft;
				$.object___o_Slider.integer___action_point_top_offset	=$.integer___mouse_cursor_coordinate_y-$.integer___top_offset-$.object_dom___o_Slider.offsetTop;

				__object___O_Scrollbar_configuration.varchar___active_component_id=$.varchar___id+'-'+$.varchar___position;
				__object___O_Scrollbar_configuration.bool___mouse_text_selection_availability=false;
				
				document.getElementById("id_div___layer-Main").style.cursor="pointer"; //fix for FF (document.body.style.cursor='pointer';)
			},
			F_ProcessEvent_mouseup:function()
			{
				$.integer___previous_mouse_cursor_coordinate_x=_;
				$.integer___previous_mouse_cursor_coordinate_y=_;
				
				__object___O_Scrollbar_configuration.varchar___active_component_id=_;
				__object___O_Scrollbar_configuration.bool___mouse_text_selection_availability=true;
				
				document.getElementById("id_div___layer-Main").style.cursor="default"; //fix for FF (document.body.style.cursor='default';)
			},
			
			F_ProcessEvent_mousemove:_,
			
//	ANALYZE: case, when pass direct offsets (left,top,scrolling_left,scrolling_top) necessity and performance
			F_MoveToPosition:function(integer___offset,integer___scrolling_offset)
			{
				if ($.varchar___position=='horizontal')
				{
					$.object_dom___o_Slider.style.left	=integer___offset+'px';
					$.object_dom___target.scrollLeft	=integer___scrolling_offset;
				}
				else if ($.varchar___position=='vertical')
				{					
					$.object_dom___o_Slider.style.top	=integer___offset+'px';
					$.object_dom___target.scrollTop		=integer___scrolling_offset;
				}
			},
			
			F_MoveToMouseCursor:function(object_dom___event)
			{
				object_dom___event=object_dom___event||event;
				
				if ($.varchar___position=='horizontal')
				{
					$.integer___mouse_cursor_coordinate_x=object_dom___event.clientX||object_dom___event.pageX;
	
					$.integer___mouse_cursor_coordinate_x+=Math.ceil(jQuery(document).scrollLeft()); //document.body.scrollLeft
					
					$.integer___mouse_cursor_horizontal_offset=$.integer___mouse_cursor_coordinate_x-$.integer___left_offset;
					
					if ($.integer___mouse_cursor_horizontal_offset>=$.integer___o_Slider_maximal_left_offset)
						$.object_dom___o_Slider.style.left=$.integer___o_Slider_maximal_left_offset+'px';
					else if ($.integer___mouse_cursor_horizontal_offset<=$.integer___o_Slider_minimal_left_offset)
						$.object_dom___o_Slider.style.left=$.integer___o_Slider_minimal_left_offset+'px';
					else 
						$.object_dom___o_Slider.style.left=$.integer___mouse_cursor_horizontal_offset+'px';
					
					if ($.integer___target_scrolling_maximal_left_offset>$.integer___o_Slider_maximal_left_offset)
						$.object_dom___target.scrollLeft=$.object___o_Slider.array_object___movement_step_info[$.object_dom___o_Slider.offsetLeft].integer___target_scrolling_offset;
					else 
						$.object_dom___target.scrollLeft=$.object_dom___o_Slider.offsetLeft;
				}
				else if ($.varchar___position=='vertical')
				{					
					$.integer___mouse_cursor_coordinate_y=object_dom___event.clientY||object_dom___event.pageY;
	
					$.integer___mouse_cursor_coordinate_y+=Math.ceil(jQuery(document).scrollTop()); //document.body.scrollLeft
					
					$.integer___mouse_cursor_vertical_offset=$.integer___mouse_cursor_coordinate_y-$.integer___top_offset;
					
					if ($.integer___mouse_cursor_vertical_offset>=$.integer___o_Slider_maximal_top_offset)
						$.object_dom___o_Slider.style.top=$.integer___o_Slider_maximal_top_offset+'px';
					else if ($.integer___mouse_cursor_vertical_offset<=$.integer___o_Slider_minimal_top_offset)
						$.object_dom___o_Slider.style.top=$.integer___o_Slider_minimal_top_offset+'px';
					else 
						$.object_dom___o_Slider.style.top=$.integer___mouse_cursor_vertical_offset+'px';
					
					if ($.integer___target_scrolling_maximal_top_offset>$.integer___o_Slider_maximal_top_offset)
						$.object_dom___target.scrollTop=$.object___o_Slider.array_object___movement_step_info[$.object_dom___o_Slider.offsetTop].integer___target_scrolling_offset;
					else 
						$.object_dom___target.scrollTop=$.object_dom___o_Slider.offsetTop;
				}
			},
			
			F_CalculateMovementSteps:function(integer___maximal_step,integer___maximal_steps_amount,integer___step_adjustments_amount,integer___maximal_step_adjustments_interval)
			{
				var integer___step_adjustments_counter=0;
				var integer___offset=0;
				
				$.object___o_Slider.array_object___movement_step_info[0]=
				{
					integer___offset							:$.integer___o_Slider_minimal_top_offset,
					integer___target_scrolling_offset	:$.integer___target_scrolling_minimal_top_offset
				};

				for (var integer___index=1;integer___index<=integer___maximal_steps_amount;integer___index++)
				{
//	TODO,IMPORTANT: for case with 'integer___maximal_step_adjustments_interval=1' avoid first come min steps then all max, its cause outcentering indicator on middle values (shifted to right)
					if (integer___index%integer___maximal_step_adjustments_interval==0 
						&& integer___step_adjustments_counter<integer___step_adjustments_amount)
					{						
						integer___step_adjustments_counter++;
						integer___offset+=integer___maximal_step-1;
					}
					else 
						integer___offset+=integer___maximal_step;
										
					$.object___o_Slider.array_object___movement_step_info[integer___index]=
					{
						integer___offset							:integer___offset,
//	END: calculate target offset
						integer___target_scrolling_offset	:integer___offset//integer___index*$.integer___value_changing_step>$.integer___maximal_value_limit?$.integer___maximal_value_limit:integer___index*$.integer___value_changing_step
					}
					
				}
			}
		};

		$.F_CheckAvailability=function()
		{
//			console.log($.object_dom___target.scrollHeight+":"+$.object_dom___target.offsetHeight);
			if ($.varchar___position=='horizontal' && $.object_dom___target.scrollWidth>$.object_dom___target.offsetWidth)
			{
				$.object_dom___component.style.visibility='visible';
				
				jQuery($.object_dom___target).addClass("class_div___element-horizontal_scrollbar_status__visible");
				
//				$.object___o_Slider.F_InitializePosition();
			}
			else if ($.varchar___position=='vertical' && $.object_dom___target.scrollHeight>$.object_dom___target.offsetHeight)
			{
				$.object_dom___component.style.visibility='visible';
//	ANALYZE: class name 'class_div___element-ScrollableContainer-vertical_scrollbar_status__visible' and status....(enabled,active etc...)
				jQuery($.object_dom___target).addClass("class_div___element-vertical_scrollbar_status__visible");
				
//				$.object___o_Slider.F_InitializePosition();
			}
			else
			{
				$.object_dom___component.style.visibility='hidden';
				
//	ANALYZE,OPTMIZE: per companent need only one operation horizontal or vertical, but using composit name conversion BAD way due to optimization algorithm (hard to compress composit names)
				jQuery($.object_dom___target).removeClass("class_div___element-horizontal_scrollbar_status__visible");
				jQuery($.object_dom___target).removeClass("class_div___element-vertical_scrollbar_status__visible");
			}
		};
	};
	var __object_object___O_Scrollbar={};
	
	
	
