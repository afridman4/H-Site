

//	TODO: replace jQuery with CORE methods
//	TODO: replace mouseleave event simulation for IE
	function C_RatingSelector()
	{
		var $=this,
			_=null;
		
		$.object_dom___component				=_;
		
		$.array_object_dom___navigation_item	=[];
		
		$.F_Initialize=function(object___configuration)
		{
			$.object_dom___component							=object___configuration.object_dom___component||document.getElementById(object___configuration.string___DOM_id);
			
			var array_object_dom___navigation_item				=jQuery('td',$.object_dom___component)[0].children,
				integer___navigation_items_amount				=array_object_dom___navigation_item.length; // due to 2 sub childs

			for (var integer___index=0, integer___sup_DOM_element_index=0, integer___sub_DOM_element_index=1; integer___index<integer___navigation_items_amount; integer___index++, integer___sup_DOM_element_index+=2, integer___sub_DOM_element_index+=2)
			{
//	link to child div/a on which attached events
				
				$.array_object_dom___navigation_item.push(array_object_dom___navigation_item[integer___index].children[0]);
				$.array_object_dom___navigation_item.push(array_object_dom___navigation_item[integer___index].children[1]);
				
//				$.array_object_dom___navigation_item[integer___index]=array_object_dom___navigation_item[integer___index].children[0];
//				$.array_object_dom___navigation_item[integer___index2]=array_object_dom___navigation_item[integer___index].children[1];
				
//				if (jQuery(array_object_dom___navigation_item[integer___index].children[0]).hasClass(".class___element-status__selected"))
//					$.integer___previous_selected_page_index			=integer___index;

				(function(integer___index,integer___sup_DOM_element_index,integer___sub_DOM_element_index)
		{
//	ANALYZE,USABILITY: event type - click (change appearance/process only after mouse up) or mousedown?
					array_object_dom___navigation_item[integer___index].children[0].onclick=function() // <sup>
			{
						$.F_SetRating(integer___sup_DOM_element_index);
					};
					array_object_dom___navigation_item[integer___index].children[1].onclick=function() // <sub>
					{
						$.F_SetRating(integer___sub_DOM_element_index);
					};
					
					array_object_dom___navigation_item[integer___index].children[0].onmouseover=function() // <sup>
					{
						$.F_SetActiveNavigationItem(integer___sup_DOM_element_index);
					};
					array_object_dom___navigation_item[integer___index].children[1].onmouseover=function() // <sub>
					{
						$.F_SetActiveNavigationItem(integer___sub_DOM_element_index);
					};
				})(integer___index,integer___sup_DOM_element_index,integer___sub_DOM_element_index);
			}
			
//			console.log($.array_object_dom___navigation_item);
			
/*			jQuery('sup, sub',$.object_dom___component).on('mouseenter',function()
			{
				if (jQuery($.object_dom___component).hasClass("class___element-status__disabled"))
					return;
				
				var integer___current_index=parseInt(this.parentNode.className.split(' ')[2].split("index__")[1]);
				

				if (integer___current_index>0)
					for (var integer___index=0;integer___index<=integer___current_index;integer___index++)
						jQuery(this).closest('table').find(".class___element-index__"+integer___index).children('b').addClass("class___element-status__mouseover");
				else
					this.className="class___element-status__mouseover";
			});
*/			
			
			jQuery('sup, sub',$.object_dom___component).on('mouseleave',function()
			{
//				if (jQuery(this).closest(".class_table___component-RatingSelector").length==0)
				jQuery(this).removeClass('class___element-status__mouseover');
			});
			jQuery($.object_dom___component).on('mouseleave',function()
			{
				jQuery('sup, sub',$.object_dom___component).removeClass('class___element-status__mouseover');
			});
			
			
			
/*
			jQuery('.class_td___component-RatingSelector--item b').on('click',function()
			{
                */
/*HERMiT*//*

                */
/*Если мы не на странице Submit Review, то запрещаем менять звездочки*//*

                if (!jQuery(this).closest('table').hasClass("class_table___component-RatingSelector_enabled")) {
                    return;
                }

                */
/*Даем возможность выбрать рейтинг повторно*//*

				if (jQuery(this).closest('table').hasClass("class_table___component-RatingSelector__20x19_orange")) {
                    jQuery(this).closest('table').find('b').each(function (index, self) {
                        jQuery(self).removeClass('class___element-status__selected');
                    });
                }

				var integer___current_index=parseInt(this.parentNode.className.split(' ')[2].split("index__")[1]);

                */
/*HERMiT*//*

                var tableId = jQuery(this).closest('table').attr('id');
                if (tableId)
                    jQuery('#review_' + tableId).val(integer___current_index);

				var bool___selection_status=false;
				if (integer___current_index>0)
					for (var integer___index=0;integer___index<=integer___current_index;integer___index++)
						jQuery(this).closest('table').find(".class___element-index__"+integer___index).children('b').removeClass('class___element-status__mouseover').addClass("class___element-status__selected");
				else
					this.className="class___element-status__selected";
				jQuery(this).closest('table').addClass("class___element-status__disabled");
			});
*/

		};
		
		
		$.F_SetRating=function(integer___navigation_item_index) // 'sup','sub'
		{
            /*HERMiT*/
/*			if (jQuery($.object_dom___component).hasClass("class___element-status__disabled"))
				return;*/

            /*Если мы не на странице Submit Review, то запрещаем менять звездочки*/
             if (!jQuery($.object_dom___component).closest('table').hasClass("class_table___component-RatingSelector_enabled")) {
                 return;
             } else {
             /* Иначе даем возможность выбрать рейтинг повторно*/
                 jQuery('sup, sub', $.object_dom___component).removeClass('class___element-status__selected');
             }

            /*HERMiT*/
            var tableId = jQuery($.object_dom___component).closest('table').attr('id');
            if (tableId)
                jQuery('#review_' + tableId).val(integer___navigation_item_index+1);

			for (var integer___index=0;integer___index<=integer___navigation_item_index;integer___index++)
				jQuery($.array_object_dom___navigation_item[integer___index]).removeClass('class___element-status__mouseover').addClass("class___element-status__selected");

			jQuery($.object_dom___component).addClass("class___element-status__disabled");
		};
		
		$.F_SetActiveNavigationItem=function(integer___navigation_item_index)
		{
			if (jQuery($.object_dom___component).hasClass("class___element-status__disabled"))
				return;
			
//	PERFORMANCE/ANALYZE: necessity
			jQuery('sup, sub',$.object_dom___component).removeClass('class___element-status__mouseover');
			
			for (var integer___index=0;integer___index<=integer___navigation_item_index;integer___index++)
				jQuery($.array_object_dom___navigation_item[integer___index]).addClass("class___element-status__mouseover");
		};
	};
	var __object_object___C_RatingSelector={};
	
	
	
	
	
	