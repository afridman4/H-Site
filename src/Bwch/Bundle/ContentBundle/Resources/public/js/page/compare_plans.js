jQuery(document).ready(function(){

    __object_object___C_ScrollableContainer['compare_plans']=new C_ScrollableContainer;
	__object_object___C_ScrollableContainer['compare_plans'].F_Initialize
	({
		varchar___id				:'compare_plans',
		object_dom___component		:document.getElementById("id_div___component-ScrollableContainer__compare_plans"),
		varchar___scrollbar_position	:'horizontal'
	});
	
	jQuery(".class_table___element-style__2 td i").on("mouseenter",function(object_dom___event)
	{
        /*HERMiT*/
        if (jQuery("#id_div___layer-PlanDetailsItemDescription p")[jQuery(this).closest('tr')[0].rowIndex-1].innerText.length > 0) {
            jQuery("#id_div___layer-PlanDetailsItemDescription").show().css('left',jQuery(this).position().left+30+'px').css('top',jQuery(this).position().top+20+'px');
            jQuery("#id_div___layer-PlanDetailsItemDescription p").hide();
            jQuery("#id_div___layer-PlanDetailsItemDescription p")[jQuery(this).closest('tr')[0].rowIndex-1].style.display='block';
        }
	});
	
	jQuery(".class_table___element-style__2 td i").on("mouseleave",function(object_dom___event)
	{
		jQuery("#id_div___layer-PlanDetailsItemDescription").hide();
		jQuery("#id_div___layer-PlanDetailsItemDescription p").hide();
	});
});
