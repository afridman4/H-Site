
	function E_Scroller()
	{
		var $=this,
			_=null;
		
		$.handle___scrolling_to_left_iteration;
		$.handle___scrolling_to_right_iteration;
		$.handle___scrolling_to_top_iteration;
		$.handle___scrolling_to_bottom_iteration;
		
		$.integer___frame_motion_initial_delay		=50; //milliseconds
		$.integer___frame_motion_delay				=$.integer___frame_motion_initial_delay;
		$.integer___frame_motion_initial_interval	=22; //pixels
		$.integer___frame_motion_interval			=$.integer___frame_motion_initial_interval;
		$.integer___frames_per_action				=0;
		
		$.object_dom___target;

		$.integer___target_scrolling_width;
		$.integer___target_scrolling_height;
		$.integer___target_width;
		$.integer___target_height;
		
		$.F_ExecuteActionOnScrollMoveToLeft,
		$.F_ExecuteActionOnScrollMoveToRight,
		$.F_ExecuteActionOnScrollMoveToTop,
		$.F_ExecuteActionOnScrollMoveToBottom,
		$.F_ExecuteActionOnScrollReachedLeftEnd,
		$.F_ExecuteActionOnScrollReachedRightEnd,
		$.F_ExecuteActionOnScrollReachedTopEnd,
		$.F_ExecuteActionOnScrollReachedBottomEnd;
		
		
		$.F_Initialize=function(object___configuration)
		{
//			if (object___configuration)
//				$.object_dom___target=document.getElementById(object___configuration.string___target_DOM_id);
		};
		
		$.F_AdjustDimensions=function()
		{
			$.integer___target_scrolling_width	=parseInt($.object_dom___target.scrollWidth,10);
			$.integer___target_scrolling_height	=parseInt($.object_dom___target.scrollHeight,10);
			$.integer___target_width			=parseInt($.object_dom___target.clientWidth,10)-(parseInt($.object_dom___target.style.paddingLeft,10)||0)-(parseInt($.object_dom___target.style.paddingRight,10)||0);
//	ANALYZE: necessity to cutomize this by configuration or detect automatically
//			$.integer___target_height=parseInt($.object_dom___target.clientHeight,10)-(parseInt($.object_dom___target.style.paddingTop,10)||0)-(parseInt($.object_dom___target.style.paddingBottom,10)||0);
		};
		
		$.F_StartScrollingToLeft=function()
		{	
			$.F_ScrollToLeft();
			$.handle___scrolling_to_left_iteration=setInterval($.F_ScrollToLeft,$.integer___frame_motion_delay);
		};
		
		$.F_StartScrollingToRight=function()
		{	
			$.F_ScrollToRight();
			$.handle___scrolling_to_right_iteration=setInterval($.F_ScrollToRight,$.integer___frame_motion_delay);
		};
		
		$.F_StartScrollingToTop=function()
		{	
			$.F_ScrollToTop();
			$.handle___scrolling_to_top_iteration=setInterval($.F_ScrollToTop,$.integer___frame_motion_delay);
		};
		
		$.F_StartScrollingToBottom=function()
		{	
			$.F_ScrollToBottom();
			$.handle___scrolling_to_bottom_iteration=setInterval($.F_ScrollToBottom,$.integer___frame_motion_delay);
		};
		
		$.F_ResetDelays=function()
		{
			$.integer___frames_per_action=0;
			$.integer___frame_motion_interval=$.integer___frame_motion_initial_interval;
		};
		
		$.F_CancelScrolling=function()
		{
			$.F_ResetDelays();
			clearInterval($.handle___scrolling_to_left_iteration);
			clearInterval($.handle___scrolling_to_right_iteration);
		};

//	accelerate scrolling after predefined amount of time		
		$.F_AdjustFrameMotionDelay=function()
		{			
			if ($.integer___frame_motion_interval*$.integer___frames_per_action>=1000)
				if ($.integer___frame_motion_interval<50)
					$.integer___frame_motion_interval+=1;
		};
		
		$.F_AdjustTargetDimensions=function()
		{			
			$.integer___target_scrolling_width	=parseInt($.object_dom___target.scrollWidth,10);
			$.integer___target_scrolling_height	=parseInt($.object_dom___target.scrollHeight,10);
			$.integer___target_width			=parseInt($.object_dom___target.clientWidth,10)-parseInt($.object_dom___target.style.paddingLeft,10)-parseInt($.object_dom___target.style.paddingRight,10);
			$.integer___target_height			=parseInt($.object_dom___target.clientHeight,10)-parseInt($.object_dom___target.style.paddingTop,10)-parseInt($.object_dom___target.style.paddingBottom,10);
		};
		
		$.F_ScrollToLeft=function()
		{			
			$.integer___frames_per_action++;
			$.F_AdjustFrameMotionDelay();
			
			$.object_dom___target.scrollLeft-=$.integer___frame_motion_interval;
			
			if (parseInt($.object_dom___target.scrollLeft,10)<=0)
			{
				$.F_ResetDelays();
				clearInterval($.handle___scrolling_to_left_iteration);
				
				if ($.F_ExecuteActionOnScrollReachedLeftEnd)
					$.F_ExecuteActionOnScrollReachedLeftEnd();
			}
			else if ($.F_ExecuteActionOnScrollMoveToLeft)
				$.F_ExecuteActionOnScrollMoveToLeft();
		};
		
		$.F_ScrollToRight=function()
		{			
			$.integer___frames_per_action++;
			$.F_AdjustFrameMotionDelay();
			
			$.object_dom___target.scrollLeft+=$.integer___frame_motion_interval;
			
			if (parseInt($.object_dom___target.scrollLeft,10)+$.integer___target_width>=$.integer___target_scrolling_width)
			{
				$.F_ResetDelays();
				clearInterval($.handle___scrolling_to_right_iteration);
				
				if ($.F_ExecuteActionOnScrollReachedRightEnd)
					$.F_ExecuteActionOnScrollReachedRightEnd();
			}
			else if ($.F_ExecuteActionOnScrollMoveToRight)
				$.F_ExecuteActionOnScrollMoveToRight();
		};
		
		$.F_ScrollToTop=function()
		{			
			$.integer___frames_per_action++;
			$.F_AdjustFrameMotionDelay();
			
			$.object_dom___target.scrollTop-=$.integer___frame_motion_interval;
			
			if (parseInt($.object_dom___target.scrollTop,10)<=0)
			{
				$.F_ResetDelays();
				clearInterval($.handle___scrolling_to_top_iteration);
				
				if ($.F_ExecuteActionOnScrollReachedTopEnd)
					$.F_ExecuteActionOnScrollReachedTopEnd();
			}
			else if ($.F_ExecuteActionOnScrollMoveToTop)
				$.F_ExecuteActionOnScrollMoveToTop();
		};
		
		$.F_ScrollToBottom=function()
		{			
			$.integer___frames_per_action++;
			$.F_AdjustFrameMotionDelay();
			
			$.object_dom___target.scrollTop+=$.integer___frame_motion_interval;
			
			if (parseInt($.object_dom___target.scrollTop,10)+$.integer___target_height>=$.integer___target_scrolling_height)
			{
				$.F_ResetDelays();
				clearInterval($.handle___scrolling_to_bottom_iteration);
				
				if ($.F_ExecuteActionOnScrollReachedBottomEnd)
					$.F_ExecuteActionOnScrollReachedBottomEnd();
			}
			else if ($.F_ExecuteActionOnScrollMoveToBottom)
				$.F_ExecuteActionOnScrollMoveToBottom();
		};
		
		
		$.F_ScrollToLeftEnd=function()
		{
			if ($.F_ExecuteActionOnScrollReachedLeftEnd)
				$.F_ExecuteActionOnScrollReachedLeftEnd();
			$.F_ResetDelays();
			$.object_dom___target.scrollLeft=0;
		};
		
		$.F_ScrollToRightEnd=function()
		{
			if ($.F_ExecuteActionOnScrollReachedRightEnd)
				$.F_ExecuteActionOnScrollReachedRightEnd();
			$.F_ResetDelays();
			$.object_dom___target.scrollLeft=$.integer___target_scrolling_width-$.integer___target_width;
		};
		
		$.F_ScrollToTopEnd=function()
		{
			if ($.F_ExecuteActionOnScrollReachedTopEnd)
				$.F_ExecuteActionOnScrollReachedTopEnd();
			$.F_ResetDelays();
			$.object_dom___target.scrollTop=0;
		};
		
		$.F_ScrollToBottomEnd=function()
		{
			if ($.F_ExecuteActionOnScrollReachedBottomEnd)
				$.F_ExecuteActionOnScrollReachedBottomEnd();
			$.F_ResetDelays();
			$.object_dom___target.scrollTop=$.integer___target_scrolling_height-$.integer___target_height;
		};
		
		
		
		
	};
	var __object_object___E_Scroller={};
	
		
	

	
	

