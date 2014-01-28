jQuery(document).ready(function(){
	function E_Main()
	{
		var $=this,
			_=null;
		
		$.varchar___class_name='E_Main';
		$.varchar___class_type='engine';
		
//	ANALYZE: var name 'array_object_dom___need_to_close_element';
//	TODO: on element delete, update this array
		$.array_object_dom___need_to_close_element=[];

		
		
		$.object___configuration=
		{
			
		};
		
		$.F_Initialize=function()
		{
//	shared components:
			(new C_InputField).F_Initialize
			({
				string___DOM_id:"id_div___component-InputField__Header_search"
			});

			(new C_Button).F_Initialize();
			
			jQuery(".class_table___component-RatingSelector").each(function()
			{
				(new C_RatingSelector).F_Initialize
				({
					object_dom___component:this
				});
			});

			if (document.getElementById("id_table___component-Paginator__LatestReviews"))
				(new C_Paginator).F_Initialize
				({
					string___DOM_id:"id_table___component-Paginator__LatestReviews",
					string___target_DOM_id:"id_div___component-PageViewer__LatestReviews",
					varchar___navigation_item_type:'action'
				});
			
			jQuery('.class___element-Datepicker').datepicker({'dateFormat':'yy-mm-dd'});

			if (document.getElementById("id_table___component-Paginator__search_results"))
				(new C_Paginator).F_Initialize
				({
					string___DOM_id					:"id_table___component-Paginator__search_results",
//					string___target_DOM_id			:"id_div___component-PageViewer__search_results",
					object_dom___target				:document.getElementById("id_div___component-ScrollableContainer__search_results").children[0],
					varchar___navigation_item_type	:'action'
				});

			jQuery(".class_div___component-InputFieldWithSlider").each(function(integer___index,object_dom___element)
			{
				var object___configuration=array_object___configuration[integer___index]||array_object___configuration[0];
				object___configuration.object_dom___component=object_dom___element;
				
				__object_object___C_InputFieldWithSlider[object___configuration.varchar___id]=new C_InputFieldWithSlider;
				__object_object___C_InputFieldWithSlider[object___configuration.varchar___id].F_Initialize(object___configuration);
			});
			
			
			jQuery(document).on('mouseup',function(object_dom___event)
			{
//	TODO: add event stack processing
				if (__object___C_InputFieldWithSlider_configuration.varchar___active_component_id)
					__object_object___C_InputFieldWithSlider[__object___C_InputFieldWithSlider_configuration.varchar___active_component_id].object___o_Slider.F_ProcessEvent_mouseup(object_dom___event);
				
				if (__object___O_Scrollbar_configuration.varchar___active_component_id)
					__object_object___O_Scrollbar[__object___O_Scrollbar_configuration.varchar___active_component_id].object___o_Slider.F_ProcessEvent_mouseup(object_dom___event);
			});
			jQuery(document).on('mousedown',function()
			{
//	TODO: add event stack processing
				if (!__object___C_InputFieldWithSlider_configuration.bool___mouse_text_selection_availability)
					return false;
				
				if (!__object___O_Scrollbar_configuration.bool___mouse_text_selection_availability)
					return false;
			});
			jQuery(document).on('mousemove',function(object_dom___event)
			{
//	TODO: add event stack processing
				if (__object___C_InputFieldWithSlider_configuration.varchar___active_component_id)
					__object_object___C_InputFieldWithSlider[__object___C_InputFieldWithSlider_configuration.varchar___active_component_id].object___o_Slider.F_ProcessEvent_mousemove(object_dom___event);
				
				if (__object___O_Scrollbar_configuration.varchar___active_component_id)
					__object_object___O_Scrollbar[__object___O_Scrollbar_configuration.varchar___active_component_id].object___o_Slider.F_ProcessEvent_mousemove(object_dom___event);
			});
			jQuery(document).on('selectstart',function()
			{
//	TODO: add event stack processing
				if (!__object___C_InputFieldWithSlider_configuration.bool___mouse_text_selection_availability)
					return false;

				if (!__object___O_Scrollbar_configuration.bool___mouse_text_selection_availability)
					return false;
			});
			

			
			
			
			
			if (document.getElementById("id_div___component-ScrollableContainer__search_criteria"))
			{
				__object_object___C_ScrollableContainer['search_criteria']=new C_ScrollableContainer;
				__object_object___C_ScrollableContainer['search_criteria'].F_Initialize
				({
					varchar___id:'search_criteria',
					string___DOM_id	:"id_div___component-ScrollableContainer__search_criteria"
				});
			}
			
			if (document.getElementById("id_div___component-ScrollableContainer__search_results"))
			{
				__object_object___C_ScrollableContainer['search_results']=new C_ScrollableContainer;
				__object_object___C_ScrollableContainer['search_results'].F_Initialize
				({
					varchar___id:'search_results',
					string___DOM_id	:"id_div___component-ScrollableContainer__search_results"
				});
			}
        };
			
//	ANALYZE: move to external/core Page Object/Engine on page initialization stage need link predefined page items to appropriate events like below ->
		$.F_AdjustCenterBlockHeight=function()
		{
//	DEV: need algorithm for universal case 
//			if (__object_object___C_TabsNavigator["id_div___component-TabsNavigator"].object_dom___tab_viewer_component.offsetHeight>jQuery(window).height())
			if (jQuery(document).height()>jQuery(window).height())
				document.getElementById("id_div___layer-Main").style.height="auto";
			else
				document.getElementById("id_div___layer-Main").style.height="100%";
		};
		
//	ANALYZE: ...F_AdjustPageCentering
		$.F_AdjustPageContentCentering=function()
		{
			return;
			var integer___window_width=jQuery(window).width();
			var integer___centering_element_width=jQuery("#id_div___element-Main").width();
			if (integer___window_width>integer___centering_element_width)
			{
				jQuery("#id_div___element-Main, #id_div___element-Header > div").css("margin-left",(integer___window_width-integer___centering_element_width)/2+"px");
				jQuery("#id_div___element-Header > div").css("width",integer___centering_element_width+"px");
			}
			else
			{
				jQuery("#id_div___element-Main, #id_div___element-Header > div").css("margin-left",0);
				jQuery("#id_div___element-Header > div").css("width","100%");
			}
		};
//	<-



	};
	var __object___E_Main=new E_Main;




//	****************************************************************************************************************************************************************************************************************************************
//	****************************************************************************************************************************************************************************************************************************************
//	****************************************************************************************************************************************************************************************************************************************
//	****************************************************************************************************************************************************************************************************************************************




	var __integer___window_last_width=0;
	var __integer___mouse_pointer_last_x_coordinate,
		__integer___mouse_pointer_last_y_coordinate;
	onload=function()
	{		
		__object___E_Main.F_Initialize();
		
		
		__integer___window_last_width=jQuery(window).width();
		
		__object___E_Main.F_AdjustPageContentCentering();
		
		__object___E_Main.F_AdjustCenterBlockHeight();
		
		
		onresize=function()
		{
			if (__integer___window_last_width!=jQuery(window).width() && Math.abs(jQuery(window).width()-__integer___window_last_width)>16) // fix for ie7-8
			{
				__object___E_Main.F_AdjustPageContentCentering();
				__object___E_Main.F_AdjustCenterBlockHeight();
			}
			__integer___window_last_width=jQuery(window).width();
		};
		onscroll=function()
		{
			
//			if ((jQuery(document).scrollTop()+jQuery(window).height())>jQuery(document).height()-100)
//				__object___E_Main.F_ProcessNextSearchResultRequest();
		};
		
		
		
		document.onmousemove=function(object_dom___event)
		{
/*			
			object_dom___event=object_dom___event||event;
			
			if (object_dom___event.clientX)
			{
				__integer___mouse_pointer_last_x_coordinate=object_dom___event.clientX;
				__integer___mouse_pointer_last_y_coordinate=object_dom___event.clientY;
			}
			else
			{
				__integer___mouse_pointer_last_x_coordinate=object_dom___event.pageX;
				__integer___mouse_pointer_last_y_coordinate=object_dom___event.pageY;
			}
*/
		};
		document.onclick=function(object_dom__event)
		{
/*			var array___temp=$.array_object_dom___need_to_close_element;
			for (var integer___index=0;integer___index<array___temp.length;integer___index++)
			{
				$.array_object_dom___need_to_close_element[integer___index].style.display='none';
				delete($.array_object_dom___need_to_close_element[integer___index]);
			}
*/			
		};
		document.onmousedown=function(object_dom__event)
		{
//			document.body.style.cursor='pointer';
		};
		document.onselectstart=function(object_dom__event)
		{
			
		};
		
/*		document.getElementById("id_input___search_subject").onkeypress=function(object_dom___event)
		{
			__object___E_Main.F_HideValidationErrorAlert();
			jQuery(this).next().hide(); // if on load event don't hide label
			if (!object_dom___event)
				object_dom___event=event;
			if (object_dom___event.keyCode==13)
				__object___E_Main.F_ProcessSearchRequest();
		};
*/

	};

    /*HERMiT*/
    $.F_ProcessRadiobox=function(object_dom___element, object_feature_name)
    {
        object_dom___element=object_dom___element.children[0];
        if (object_dom___element.className=="class_div___component-Radiobox")
        {
            if (object_dom___element.id=="id_div___component-Radiobox__test1_" + object_feature_name)
            {
                jQuery("#id_div___component-Radiobox__test1_" + object_feature_name).addClass('class___element-status__selected');
                jQuery("#id_div___component-Radiobox__test2_" + object_feature_name).removeClass('class___element-status__selected');

                jQuery("#id_div___component-Radiobox_" + object_feature_name).val(1);
            }
            else
            {
                jQuery("#id_div___component-Radiobox__test2_" + object_feature_name).addClass('class___element-status__selected');
                jQuery("#id_div___component-Radiobox__test1_" + object_feature_name).removeClass('class___element-status__selected');

                jQuery("#id_div___component-Radiobox_" + object_feature_name).val(0);
            }
        }



    };

    $.F_SelectAllSearchResults=function(object_dom___element)
    {
        if (object_dom___element.checked)
            jQuery('#id_div___component-ScrollableContainer__search_results').find('input').each(function(integer___index,object_dom___element)
            {
                object_dom___element.checked=true;
            });
        else
            jQuery('#id_div___component-ScrollableContainer__search_results').find('input').each(function(integer___index,object_dom___element)
            {
                object_dom___element.checked=false;
            });
    };



//	TEMP:


});

	