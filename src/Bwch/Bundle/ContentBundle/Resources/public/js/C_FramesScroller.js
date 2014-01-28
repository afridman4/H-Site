

//	TODO: replace jQuery with CORE methods
	function C_FramesScroller()
	{
		var $=this,
			_=null;
		
		
		$.object_dom___component=_;
		
		$.object___control=
		{
			object_dom___scroll_to_left		:_,
			object_dom___scroll_to_right	:_
		};
		
		$.object_dom___container=_;
		
		
		$.F_Initialize=function(object___configuration)
		{
			if (object___configuration)
			{
				if (document.getElementById(object___configuration.string___DOM_id))
				{
					$.object_dom___component						=document.getElementById(object___configuration.string___DOM_id);
					$.object___control.object_dom___scroll_to_left	=jQuery($.object_dom___component).children(".class_div___element-FramesScroller--control__scroll_to_left").children()[0];
					$.object___control.object_dom___scroll_to_right	=jQuery($.object_dom___component).children(".class_div___element-FramesScroller--control__scroll_to_right").children()[0];
					$.object_dom___container						=jQuery($.object_dom___component).children(".class_div___element-FramesScroller--items")[0];
				
				
					__object_object___E_Scroller[object___configuration.varchar___id]=new E_Scroller;
					__object_object___E_Scroller[object___configuration.varchar___id].object_dom___target=$.object_dom___container;
					
					
					jQuery($.object_dom___container).find(".class_td___element-FramesScroller--items--item").children('div').on('mouseenter',function()
					{
						this.className="class___element-status__mouseover";
					});
					jQuery($.object_dom___container).find(".class_td___element-FramesScroller--items--item").children('div').on('mouseleave',function()
					{
						this.className="";
					});
					
					jQuery($.object_dom___container).find(".class_td___element-FramesScroller--items--item").children('div').children('a').each(function(index, element)
					{
//	TEMP: solution, 20px padding need replace
						jQuery(this).height(jQuery(this).closest('td').outerHeight()-20);
					});
					
					
					$.object___control.object_dom___scroll_to_left.onmousedown=function()
					{
						__object_object___E_Scroller[object___configuration.varchar___id].F_StartScrollingToLeft();
						return false;
					};
					$.object___control.object_dom___scroll_to_left.onmouseup=function()
					{
						__object_object___E_Scroller[object___configuration.varchar___id].F_CancelScrolling();
					};
					$.object___control.object_dom___scroll_to_left.onmouseout=function()
					{
						__object_object___E_Scroller[object___configuration.varchar___id].F_CancelScrolling();
					};
					
					$.object___control.object_dom___scroll_to_right.onmousedown=function()
					{
						__object_object___E_Scroller[object___configuration.varchar___id].F_StartScrollingToRight();
						return false;
					};
					$.object___control.object_dom___scroll_to_right.onmouseup=function()
					{
						__object_object___E_Scroller[object___configuration.varchar___id].F_CancelScrolling();
					};
					$.object___control.object_dom___scroll_to_right.onmouseout=function()
					{
						__object_object___E_Scroller[object___configuration.varchar___id].F_CancelScrolling();
					};
					
					
					jQuery($.object___control.object_dom___scroll_to_left).on('mouseenter',function()
					{
						jQuery(this).addClass("class___element-status__mouseover");
					});
					jQuery($.object___control.object_dom___scroll_to_left).on('mouseleave',function()
					{
						jQuery(this).removeClass("class___element-status__mouseover");
					});
					
					jQuery($.object___control.object_dom___scroll_to_right).on('mouseenter',function()
					{
						jQuery(this).addClass("class___element-status__mouseover");
					});
					jQuery($.object___control.object_dom___scroll_to_right).on('mouseleave',function()
					{
						jQuery(this).removeClass("class___element-status__mouseover");
					});
				
				}
			}
		};
		
		
		
		
		
		
	};
	var __object_object___C_FramesScroller={};
	