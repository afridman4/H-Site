

//	TODO: replace jQuery with CORE methods
//	ANALYZE: var name array_object_dom___navigation_item
	function C_Paginator()
	{
		var $=this,
			_=null;
		
		
		$.object_dom___component				=_;
		$.array_object_dom___navigation_item	=[];
		
		$.object_dom___target					=_;
		$.array_object_dom___target_item		=[];
		
		$.integer___pages_amount				=0;
		$.integer___selected_page_index			=0;
		$.integer___previous_selected_page_index=0;
		
		$.object___control=
		{
//	ANALYZE: prefix 'show_' (can exist oposite action - 'hide_')
			object_dom___show_first_page		:_,
			object_dom___show_previous_page		:_,
			object_dom___show_next_page			:_,
			object_dom___show_last_page			:_
		};
		
		
		$.F_Initialize=function(object___configuration)
		{
			if (object___configuration)
			{
				$.object_dom___component							=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id);
				$.object_dom___target								=object___configuration.object_dom___target||document.getElementById(object___configuration.string___target_DOM_id);
				
				$.integer___selected_page_index						=object___configuration.integer___selected_page_index||$.integer___selected_page_index;

//	ANYLYZE: necessity to init $.integer___previous_selected_page_index here by configuration				

				$.object___control.object_dom___show_previous_page	=jQuery($.object_dom___component).find(".class_div___element-Paginator--control__show_previous_page")[0];
				$.object___control.object_dom___show_next_page		=jQuery($.object_dom___component).find(".class_div___element-Paginator--control__show_next_page")[0];
			
//	events:
				$.object___control.object_dom___show_previous_page.onclick=function()
				{
					$.F_ShowPreviousPage();
				};
				$.object___control.object_dom___show_next_page.onclick=function()
				{
					$.F_ShowNextPage();
				};
				
				if (object___configuration['varchar___navigation_item_type']=='action')
				{
//	TODO: reorganize for set direct container
				
					var array_object_dom___navigation_item	=jQuery($.object_dom___component).find(".class_div___element-Paginator--navigation_items")[0].children,
						integer___navigation_items_amount	=array_object_dom___navigation_item.length;
					
					for (var integer___index=0;integer___index<integer___navigation_items_amount;integer___index++)
					{
//	link to child div/a on which attached events
						$.array_object_dom___navigation_item[integer___index]	=array_object_dom___navigation_item[integer___index].children[0];
						
						if (jQuery(array_object_dom___navigation_item[integer___index].children[0]).hasClass(".class___element-status__selected"))
							$.integer___previous_selected_page_index			=integer___index;

						(function(integer___index)
						{
//	ANALYZE,USABILITY: event type - click (change appearance/process only after mouse up) or mousedown?
							array_object_dom___navigation_item[integer___index].children[0].onclick=function()
							{
								$.F_ShowPageByIndex(integer___index);
							};
							
//	prevent text mouse selection
							array_object_dom___navigation_item[integer___index].children[0].onmousedown=function()
							{
								return false;
							};
//	IE
							array_object_dom___navigation_item[integer___index].children[0].onselectstart=function()
							{
								return false;
							};
							
							
						})(integer___index);
						
						$.integer___pages_amount++;
					}
					
//	ANALYZE: prcessing linked objects
					if ($.object_dom___target)
						$.array_object_dom___target_item=$.object_dom___target.children;
				}
				
				jQuery(array_object_dom___navigation_item).on('mouseenter',function()
				{
					jQuery(this).children().addClass("class___element-status__mouseover");
				});
				jQuery(array_object_dom___navigation_item).on('mouseleave',function()
				{
					jQuery(this).children().removeClass("class___element-status__mouseover");
				});
				
				jQuery($.object___control.object_dom___show_previous_page).children().on('mouseenter',function()
				{
					jQuery(this).addClass("class___element-status__mouseover");
				});
				jQuery($.object___control.object_dom___show_previous_page).children().on('mouseleave',function()
				{
					jQuery(this).removeClass("class___element-status__mouseover");
				});
				jQuery($.object___control.object_dom___show_next_page).children().on('mouseenter',function()
				{
					jQuery(this).addClass("class___element-status__mouseover");
				});
				jQuery($.object___control.object_dom___show_next_page).children().on('mouseleave',function()
				{
					jQuery(this).removeClass("class___element-status__mouseover");
				});
			}
		};
		
		
		
		$.F_ShowFirstPage=function()
		{
			
		};
		$.F_ShowPreviousPage=function()
		{
//	ANALYZE: necessity for case, when navigation is looped from left to right and reverse
			if ($.integer___selected_page_index>0)
				$.F_ShowPageByIndex($.integer___selected_page_index-1);
		};
		
		$.F_ShowPageByIndex=function(integer___index)
		{
			$.integer___selected_page_index																=integer___index;
			$.array_object_dom___navigation_item[$.integer___previous_selected_page_index].className	="";
			$.array_object_dom___navigation_item[$.integer___selected_page_index].className				="class___element-status__selected";
			
//	ANALYZE: check necessity
			if ($.array_object_dom___target_item[integer___index])
			{
//	hide previous selected page
//	TODO,ANALYZE: show loading animation by C_Animator component
//	show target page
				
				if ($.array_object_dom___target_item[$.integer___previous_selected_page_index])
					$.array_object_dom___target_item[$.integer___previous_selected_page_index].style.display	="none";
				
				if ($.array_object_dom___target_item[$.integer___selected_page_index].tagName=='TABLE')
					$.array_object_dom___target_item[$.integer___selected_page_index].style.display		="table";
				else if ($.array_object_dom___target_item[$.integer___selected_page_index].tagName=='DIV')
					$.array_object_dom___target_item[$.integer___selected_page_index].style.display		="block";
//				else if ($.array_object_dom___target_item[$.integer___selected_page_index].tagName=='LI')
//					$.array_object_dom___target_item[$.integer___selected_page_index].style.display		="list-item";
			}
			else
			{
//	initiate page loading (via AJAX or etc.)
			}
			
			$.integer___previous_selected_page_index	=$.integer___selected_page_index;
		};
		
		$.F_ShowNextPage=function()
		{
			if ($.integer___selected_page_index<$.integer___pages_amount-1)
				$.F_ShowPageByIndex($.integer___selected_page_index+1);
			
		};
		$.F_ShowLastPage=function()
		{
			
		};
		
		
	};
	var __object_object___C_Paginator={};
	