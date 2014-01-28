

//	TODO: replace jQuery with CORE methods
//	ANALYZE: component name logic
	function C_ListBlockSwitcher()
	{
		var $=this,
			_=null;
		
		$.varchar___id						=_;
		$.object_dom___component			=_;
		$.array_object_dom___navigation_item=[];
		
//	ANALYZE: var name and logic (ability define by target ID and binded component)
		$.bool___target_scrollbar=_;
		
		$.varchar___target_id				=_;
		$.object_dom___target				=_;
		$.array_object_dom___target_item	=[];
		$.array_object___target_item		=[];
		
		$.integer___target_items_amount			=0;
		$.integer___selected_target_item_index	=0;
		
		$.F_Initialize=function(object___configuration)
		{
			if (object___configuration)
			{
				$.varchar___id							=object___configuration.varchar___id;
				$.object_dom___component				=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id);
				
				$.varchar___target_id					=object___configuration.varchar___target_id;
				$.bool___target_scrollbar				=object___configuration.bool___target_scrollbar;
				
//	ANALYZE: case, when you can defined set of switchable content, some list of elements
				$.object_dom___target					=object___configuration.object_dom___target||document.getElementById(object___configuration.string___target_DOM_id);
				
				$.integer___selected_target_item_index	=object___configuration.integer___selected_target_item_index||0;
				
//	ANALYZE: case, when you can defined set of switchable content, some list of elements
				var array_object_dom___navigation_item	=$.object_dom___component.children,
					integer___navigation_items_amount=array_object_dom___navigation_item.length;
			
				for (var integer___index=0;integer___index<integer___navigation_items_amount;integer___index++)
				{
					$.array_object_dom___navigation_item[integer___index]=array_object_dom___navigation_item[integer___index];

					(function(integer___index)
					{
						array_object_dom___navigation_item[integer___index].onmousedown=function()
						{
							$.F_SwitchTargetItemByIndex(integer___index);
						}
					})(integer___index);
					
					$.integer___target_items_amount++;
				}
				
				$.array_object_dom___target_item=$.object_dom___target.children;
				
				
/*				if ($.bool___target_scrollbar)
				{
					__object_object___C_ScrollableContainer[$.varchar___id]=new C_ScrollableContainer;
					__object_object___C_ScrollableContainer[$.varchar___id].F_Initialize
					({
						varchar___id:$.varchar___id,
						object_dom___component	:$.object_dom___target
					});
				}
*/
				
			}
		};
		
		
		$.F_SwitchTargetItemByIndex=function(integer___index)
		{
//	ANALYZE: check necessity
			if ($.array_object_dom___target_item[integer___index])
			{
//	show animation -?
				
//	save current target item scrolling position
				if (__object_object___C_ScrollableContainer[$.varchar___target_id])
				{
					$.array_object___target_item[$.integer___selected_target_item_index]={};				
					$.array_object___target_item[$.integer___selected_target_item_index].integer___container_scrolling_left_offset	=__object_object___C_ScrollableContainer[$.varchar___target_id].object_dom___container.scrollLeft;
					$.array_object___target_item[$.integer___selected_target_item_index].integer___container_scrolling_top_offset	=__object_object___C_ScrollableContainer[$.varchar___target_id].object_dom___container.scrollTop;
					
					if (__object_object___O_Scrollbar[$.varchar___target_id+'-horizontal'])
						$.array_object___target_item[$.integer___selected_target_item_index].integer___scrollbar_slider_left_offset	=__object_object___O_Scrollbar[$.varchar___target_id+'-horizontal'].object_dom___o_Slider.offsetLeft;
					if (__object_object___O_Scrollbar[$.varchar___target_id+'-vertical'])
						$.array_object___target_item[$.integer___selected_target_item_index].integer___scrollbar_slider_top_offset	=__object_object___O_Scrollbar[$.varchar___target_id+'-vertical'].object_dom___o_Slider.offsetTop;
				}
				
				if ($.array_object_dom___target_item[$.integer___selected_target_item_index])
				{
					$.array_object_dom___target_item[$.integer___selected_target_item_index].style.display="none";
					$.array_object_dom___navigation_item[$.integer___selected_target_item_index].className="";
				}

                /*HERMiT*/
                search_form_index = integer___index;
				$.integer___selected_target_item_index=integer___index;

//	ANALYZE: unificated method for all CSS3 properties (display: block | inline | inline-block | inline-table | list-item | none | run-in | table | table-caption | table-cell | table-column-group | table-column | table-footer-group | table-header-group | table-row | table-row-group)
				if ($.array_object_dom___target_item[$.integer___selected_target_item_index].tagName=='TABLE')
					$.array_object_dom___target_item[$.integer___selected_target_item_index].style.display="table";
				else if ($.array_object_dom___target_item[$.integer___selected_target_item_index].tagName=='DIV')
					$.array_object_dom___target_item[$.integer___selected_target_item_index].style.display="block";
//				else if ($.array_object_dom___target_item[$.integer___selected_target_item_index].tagName=='LI')
//					$.array_object_dom___target_item[$.integer___selected_target_item_index].style.display="list-item";

				$.array_object_dom___navigation_item[$.integer___selected_target_item_index].className="class___element-status__selected";

                // TODO продумать как лучше вызывать этот пересчет. Первичная инициализация у нас в E_Main
                /*HERMiT*/
                jQuery(".class_div___component-InputFieldWithSlider").each(function(integer___index,object_dom___element)
                {
                    var object___configuration=array_object___configuration[integer___index]||array_object___configuration[0];
                    object___configuration.object_dom___component=object_dom___element;
                    __object_object___C_InputFieldWithSlider[object___configuration.varchar___id]=new C_InputFieldWithSlider;
                    __object_object___C_InputFieldWithSlider[object___configuration.varchar___id].F_Initialize(object___configuration);
                });

//	restore selected target item scrolling position
				if (__object_object___C_ScrollableContainer[$.varchar___target_id] && $.array_object___target_item[$.integer___selected_target_item_index])
				{					
					__object_object___C_ScrollableContainer[$.varchar___target_id].object_dom___container.scrollLeft	=$.array_object___target_item[$.integer___selected_target_item_index].integer___container_scrolling_left_offset;
					__object_object___C_ScrollableContainer[$.varchar___target_id].object_dom___container.scrollTop		=$.array_object___target_item[$.integer___selected_target_item_index].integer___container_scrolling_top_offset;
					
					if (__object_object___O_Scrollbar[$.varchar___target_id+'-horizontal'])
						__object_object___O_Scrollbar[$.varchar___target_id+'-horizontal'].object_dom___o_Slider.offsetLeft	=$.array_object___target_item[$.integer___selected_target_item_index].integer___scrollbar_slider_left_offset;
					if (__object_object___O_Scrollbar[$.varchar___target_id+'-vertical'])
						__object_object___O_Scrollbar[$.varchar___target_id+'-vertical'].object_dom___o_Slider.offsetTop	=$.array_object___target_item[$.integer___selected_target_item_index].integer___scrollbar_slider_top_offset;
				}

				if (__object_object___O_Scrollbar[$.varchar___target_id+'-horizontal'])
					__object_object___O_Scrollbar[$.varchar___target_id+'-horizontal'].F_CheckAvailability();
				if (__object_object___O_Scrollbar[$.varchar___target_id+'-vertical'])
					__object_object___O_Scrollbar[$.varchar___target_id+'-vertical'].F_CheckAvailability();
			}
		};
	};
	var __object_object___C_ListBlockSwitcher={};
	