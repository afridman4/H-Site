
//	TODO: replace jQuery with CORE methods
	
	var __object___C_ScrollableContainer_configuration={};
		__object___C_ScrollableContainer_configuration.bool___mouse_text_selection_availability=true;
		__object___C_ScrollableContainer_configuration.varchar___active_component_id='';

//	ANALYZE: component name (ScrollableBlock...etc.)
	function C_ScrollableContainer()
	{
		var $=this,
			_=null;
		
		$.varchar___id				=_;
		$.object_dom___component	=_;
		
//		$.integer___left_offset		=_;
//		$.integer___top_offset		=_;
		
		$.F_Initialize=function(object___configuration)
		{
			if (object___configuration)
			{
				$.varchar___id					=object___configuration.varchar___id;
				
				$.varchar___scrollbar_position	=object___configuration.varchar___scrollbar_position||'vertical'; // 'vertical' - default position
				
				$.object_dom___component		=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id);
				$.object_dom___container		=$.object_dom___component.children[0];
				
//	TODO: need update on window resize and recalculate depended values
//				$.integer___left_offset		=__GetElementAbsoluteXCoordinate($.object_dom___component); //Math.floor(jQuery($.object_dom___component).offset().left);
//				$.integer___top_offset		=__GetElementAbsoluteYCoordinate($.object_dom___component); //Math.floor(jQuery($.object_dom___component).offset().left);
				
				if ($.varchar___scrollbar_position=='both')
				{
/*
//	ANALYZE: necessity
					if (!$.object_dom___container.style.width)
						$.object_dom___container.style.width=$.object_dom___container.offsetWidth+'px';
					if (!$.object_dom___container.style.height)
						$.object_dom___container.style.height=$.object_dom___container.offsetHeight+'px';
*/					
					
//	first HTML code for horizontal scrollbar
					__object_object___O_Scrollbar[$.varchar___id+'-horizontal']=new O_Scrollbar;
					__object_object___O_Scrollbar[$.varchar___id+'-horizontal'].F_Initialize
					({
						varchar___id:$.varchar___id+'-horizontal',
						varchar___position:'horizontal',
						object_dom___component:$.object_dom___component.children[1]
					});
					
//	second HTML code for vertical scrollbar
					__object_object___O_Scrollbar[$.varchar___id+'-vertical']=new O_Scrollbar;
					__object_object___O_Scrollbar[$.varchar___id+'-vertical'].F_Initialize
					({
						varchar___id:$.varchar___id+'-vertical',
						varchar___position:'vertical',
						object_dom___component:$.object_dom___component.children[2]
					});
				}
				else
				{
/*
//	ANALYZE: necessity
					if (!$.object_dom___container.style.width && $.varchar___scrollbar_position=='horizontal')
						$.object_dom___container.style.width=$.object_dom___container.offsetWidth+'px';
					if (!$.object_dom___container.style.height && $.varchar___scrollbar_position=='vertical')
						$.object_dom___container.style.height=$.object_dom___container.offsetHeight+'px';
*/					
					__object_object___O_Scrollbar[$.varchar___id+'-'+$.varchar___scrollbar_position]=new O_Scrollbar;
					__object_object___O_Scrollbar[$.varchar___id+'-'+$.varchar___scrollbar_position].F_Initialize
					({
						varchar___id:$.varchar___id,
						varchar___position:$.varchar___scrollbar_position,
						object_dom___component:$.object_dom___component.children[1]
					});
				}
				
			}
		};
	};
	var __object_object___C_ScrollableContainer={};












