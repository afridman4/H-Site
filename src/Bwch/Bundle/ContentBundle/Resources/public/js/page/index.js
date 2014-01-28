jQuery(document).ready(function(){

	(new C_FramesScroller).F_Initialize
	({
		varchar___id	:"FramesScroller",
		string___DOM_id	:"id_div___component-FramesScroller"
	});
	
	(new C_ListBlockSwitcher).F_Initialize
	({
		varchar___id			:'temp1',
		string___DOM_id			:"id_ul___component-ListBlockSwitcher__temp1",
//		string___target_DOM_id	:"id_div___component-ScrollableContainer__HostingPlanFeatures",
		varchar___target_id		:'HostingPlanFeatures',
		object_dom___target		:document.getElementById("id_div___component-ScrollableContainer__HostingPlanFeatures").children[0]
	});
	
	__object_object___C_ScrollableContainer['HostingPlanFeatures']=new C_ScrollableContainer;
	__object_object___C_ScrollableContainer['HostingPlanFeatures'].F_Initialize
	({
		varchar___id	:'HostingPlanFeatures',
		string___DOM_id	:"id_div___component-ScrollableContainer__HostingPlanFeatures"
	});
});
