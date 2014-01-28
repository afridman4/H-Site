

//	ANALYZE: necessity to use class___component without tag name (table or div)

//	TODO: replace jQuery with CORE methods
	function C_Button()
	{
		var $=this,
			_=null;
		
		$.F_Initialize=function()
		{
			jQuery(document).on('mouseenter',".class___component-Button",function()
			{
				if (this.tagName=='TABLE')
					this.rows[0].cells[0].className="class___element-status__mouseover";
				else
					this.children[0].className="class___element-status__mouseover";
			});
			jQuery(document).on('mouseleave',".class___component-Button",function()
			{
				if (this.tagName=='TABLE')
					this.rows[0].cells[0].className="";
				else
					this.children[0].className="";
			});
			jQuery(document).on('mousedown',".class___component-Button",function()
			{
				if (this.tagName=='TABLE')
					this.rows[0].cells[0].className="class___element-status__mousedown";
				else
					this.children[0].className="class___element-status__mousedown";
			});
			jQuery(document).on('mouseup',".class___component-Button",function()
			{
				if (this.tagName=='TABLE')
					this.rows[0].cells[0].className="class___element-status__mouseover";
				else
					this.children[0].className="class___element-status__mouseover";
			});
		};
	};
	var __object_object___C_Button={};
	
		
	
	

	

