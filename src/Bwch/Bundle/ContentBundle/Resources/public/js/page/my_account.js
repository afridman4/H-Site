jQuery(document).ready(function(){

	jQuery(".class_div___element-MyRecentReviews p a").on("click",function()
	{
		if (jQuery(this).prev().is(":visible"))
		{
			jQuery(this).prev().hide();
			
			jQuery(this).children("sup").show();
			jQuery(this).children("sub").hide();
		}
		else
		{
			jQuery(this).prev().show();
			
			jQuery(this).children("sup").hide();
			jQuery(this).children("sub").show();
		}
	});
	
	
	jQuery(".class_div___element-AccountDetails .class_div___element .class___element-action__show_form").on("click",function()
	{
		$.F_ShowForm(this);
	});
	
	jQuery(".class_div___element-AccountDetails .class_div___element label").on("click",function()
	{
		$.F_SelectCurrentUserEmailAddress(this);
	});
	
//	TEMP:
	$.F_ShowForm=function(object_dom___element)
	{
		jQuery(object_dom___element).closest(".class_div___element-AccountDetails--item").children(".class_div___element").hide();
		jQuery(object_dom___element).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").show();
		
		__object_object___C_Form[jQuery(object_dom___element).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").attr('id')].F_ResetFieldsValidationStatus();
		__object_object___C_Form[jQuery(object_dom___element).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").attr('id')].F_Focus();
	};
	$.F_SelectCurrentUserEmailAddress=function(object_dom___element)
	{
		jQuery(object_dom___element).closest('.class_div___element').find("input[name='name_input___user_email_address']").each(function()
		{
			this.checked=false;
		});
		jQuery(object_dom___element).closest('table').find("input[name='name_input___user_email_address']")[0].checked=true;
	};
	


//	Form: UserNameEditing
//	**********************************************************************************************************************
	
//	var array_string___input_field_DOM_id=[],
//		string___default_input_field_DOM_id="";
		
	var array_object___form_field_configuration=
	[
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id                 :"id_div___component-InputField-form_id__UserNameEditing-name__user_name",
			string___DOM_name				:"name_input___user_name",
			bool___required					:true
		}
	];
	
/*	for (var integer___index=0;integer___index<array_object___configuration.length;integer___index++)
	{
		__object_object___C_InputField[array_object___configuration[integer___index].string___DOM_id]=new C_InputField;
		__object_object___C_InputField[array_object___configuration[integer___index].string___DOM_id].F_Initialize(array_object___configuration[integer___index]);
		
		array_string___input_field_DOM_id.push(array_object___configuration[integer___index].string___DOM_id);
		
		if (array_object___configuration[integer___index].bool___autofocus)
			string___default_input_field_DOM_id=array_object___configuration[integer___index].string___DOM_id;
	}
	if (!string___default_input_field_DOM_id)
		string___default_input_field_DOM_id=array_object___configuration[0].string___DOM_id;
*/

	__object_object___C_Form["id_div___component-Form__UserNameEditing"]=new C_Form;
	__object_object___C_Form["id_div___component-Form__UserNameEditing"].F_Initialize
	(
		{					
			varchar___id:"UserNameEditing",
			string___action_path:"/_request_processor.php?varchar___request_id=set_user_name",
			array_object___field_configuration		:array_object___form_field_configuration,
			string___confirmation_control_DOM_id:"id_div___component-Button-form_id__UserNameEditing-action__confirm",
			string___cancelation_control_DOM_id		:"id_a___element-form_id__UserNameEditing-action__cancel",

            /*HERMiT*/
            bool___submit_ajax: true,
            string___submit_url: '/ajax/updateUser',
            varchar___form_id: "formUserNameEditing"
		}
	);

	__object_object___C_Form["id_div___component-Form__UserNameEditing"].F_ExecuteCodeAfterCancelation=function(object_dom___control)
	{
		jQuery(object_dom___control).closest(".class_div___element-AccountDetails--item").children(".class_div___element").show();
		jQuery(object_dom___control).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").hide();
	};
	__object_object___C_Form["id_div___component-Form__UserNameEditing"].F_ExecuteCodeAfterSuccessfulSubmissionProcessingComplete=function(object___response)
	{
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___element").show().children('div').html(object___response.object___result.object_string___modified_field['name_input___user_name']);
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").hide();
		this.F_HideSubmissionStatusDescription();
	};
	

//	Form: UserEmailAddressEditing
//	**********************************************************************************************************************
	
	var array_object___form_field_configuration=
	[
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id:"id_div___component-InputField-form_id__UserEmailAddressEditing-name__user_email_address",
			string___DOM_name				:"name_input___user_email_address",
			varchar___validation_rule_id:'email_address',
			bool___required					:true
		}
	];
	
	__object_object___C_Form["id_div___component-Form__UserEmailAddressEditing"]=new C_Form;
	__object_object___C_Form["id_div___component-Form__UserEmailAddressEditing"].F_Initialize
	(
		{					
			varchar___id:"UserEmailAddressEditing",
			string___action_path:"/_request_processor.php?varchar___request_id=set_user_email_address",
			array_object___field_configuration		:array_object___form_field_configuration,
			string___confirmation_control_DOM_id:"id_div___component-Button-form_id__UserEmailAddressEditing-action__confirm",
			string___cancelation_control_DOM_id		:"id_a___element-form_id__UserEmailAddressEditing-action__cancel",

            /*HERMiT*/
            bool___submit_ajax: true,
            string___submit_url: '/ajax/updateUser',
            varchar___form_id: "formUserEmailAddressEditing"
		}
	);
	
	__object_object___C_Form["id_div___component-Form__UserEmailAddressEditing"].F_ExecuteCodeAfterCancelation=function(object_dom___control)
	{
		jQuery(object_dom___control).closest(".class_div___element-AccountDetails--item").children(".class_div___element").show();
		jQuery(object_dom___control).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").hide();
	};
	__object_object___C_Form["id_div___component-Form__UserEmailAddressEditing"].F_ExecuteCodeAfterSuccessfulSubmissionProcessingComplete=function(object___response)
	{
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___element").show().children('div').html(object___response.object___result.object_string___modified_field['name_input___user_email_address']);
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").hide();
		this.F_HideSubmissionStatusDescription();
	};


	
//	Form: UserEmailEditing/Addition
//	**********************************************************************************************************************
	
/*	var array_string___input_field_DOM_id=[],
		string___default_input_field_DOM_id="";
	var array_object___configuration=
	[
		{
			string___DOM_id:"id_div___component-InputField-form_id__UserEmailAddressEditing-name__user_email_address",
			varchar___validation_rule_id:'email_address',
			bool___required:true
//			bool___autofocus:true
		}
	];
	
	for (var integer___index=0;integer___index<array_object___configuration.length;integer___index++)
	{
		__object_object___C_InputField[array_object___configuration[integer___index].string___DOM_id]=new C_InputField;
		__object_object___C_InputField[array_object___configuration[integer___index].string___DOM_id].F_Initialize(array_object___configuration[integer___index]);
		
		array_string___input_field_DOM_id.push(array_object___configuration[integer___index].string___DOM_id);
		
		if (array_object___configuration[integer___index].bool___autofocus)
			string___default_input_field_DOM_id=array_object___configuration[integer___index].string___DOM_id;
	}
	if (!string___default_input_field_DOM_id)
		string___default_input_field_DOM_id=array_object___configuration[0].string___DOM_id;

	__object_object___C_Form["id_div___component-Form__UserEmailAddressEditing"]=new C_Form;
	__object_object___C_Form["id_div___component-Form__UserEmailAddressEditing"].F_Initialize
	(
		{					
			varchar___id:"UserEmailAddressEditing",
			string___action_path:"/_request_processor.php?varchar___request_id=add_user_email_address",
			array_string___input_field_DOM_id:array_string___input_field_DOM_id,
			string___default_input_field_DOM_id:string___default_input_field_DOM_id,
			string___confirmation_control_DOM_id:"id_div___component-Button-form_id__UserEmailAddressEditing-action__confirm",
			string___cancelation_control_DOM_id:"id_a___element-form_id__UserEmailAddressEditing-action__cancel",
			bool___autofocus_on_default_field:false
		}
	);
	
	__object_object___C_Form["id_div___component-Form__UserEmailAddressEditing"].F_ExecuteCodeAfterCancelation=function(object_dom___control)
	{
		jQuery(object_dom___control).closest(".class_div___element-AccountDetails--item").children(".class_div___element").show();
		jQuery(object_dom___control).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").hide();
	};
	
	__object_object___C_Form["id_div___component-Form__UserEmailAddressEditing"].F_ExecuteCodeAfterSuccessfulSubmissionProcessingComplete=function(object___response)
	{
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___element").show();//.children('div').html(object___response.object___result.object_string___modified_field['name_input___user_email_address']);
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").hide();
		this.F_HideSubmissionStatusDescription();
		
		jQuery(".class_div___element-AccountDetails .class_div___element .class___element-action__show_form").off("click");
		
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___element").find(".class___element-action__show_form").last().html("Remove").removeClass("class___element-action__show_form").addClass("class___element-action__send_request");
		
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___element").append(object___response.object___result);
		
		jQuery(".class_div___element-AccountDetails .class_div___element label").on("click",function()
		{
			$.F_SelectCurrentUserEmailAddress(this);
		});
		
		
		
		jQuery(".class_div___element-AccountDetails .class_div___element .class___element-action__show_form").on("click",function()
		{
			$.F_ShowForm(this);
		});
	};
	
*/
//	Form: UserPasswordEditing
//	**********************************************************************************************************************

	var array_object___form_field_configuration=
	[
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id			:"id_div___component-InputField-form_id__UserPasswordEditing-name__user_old_password",
			string___DOM_name				:"name_input___user_old_password",
			bool___required					:true
		},
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id					:"id_div___component-InputField-form_id__UserPasswordEditing-name__user_new_password",
			string___DOM_name				:"name_input___user_new_password",
			bool___required					:true
		}
	];
	
	__object_object___C_Form["id_div___component-Form__UserPasswordEditing"]=new C_Form;
	__object_object___C_Form["id_div___component-Form__UserPasswordEditing"].F_Initialize
	(
		{					
			varchar___id:"UserPasswordEditing",
			string___action_path:"/_request_processor.php?varchar___request_id=set_user_password",
			array_object___field_configuration		:array_object___form_field_configuration,
			string___confirmation_control_DOM_id:"id_div___component-Button-form_id__UserPasswordEditing-action__confirm",
			string___cancelation_control_DOM_id		:"id_a___element-form_id__UserPasswordEditing-action__cancel",

            /*HERMiT*/
            bool___submit_ajax: true,
            string___submit_url: '/ajax/updateUser',
            varchar___form_id: "formUserPasswordEditing"
		}
	);
	
	__object_object___C_Form["id_div___component-Form__UserPasswordEditing"].F_ExecuteCodeAfterCancelation=function(object_dom___control)
	{
		jQuery(object_dom___control).closest(".class_div___element-AccountDetails--item").children(".class_div___element").show();
		jQuery(object_dom___control).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").hide();
	};
	__object_object___C_Form["id_div___component-Form__UserPasswordEditing"].F_ExecuteCodeAfterSuccessfulSubmissionProcessingComplete=function(object___response)
	{
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___element").show();//.children('div').html(object___response.object___result.object_string___modified_field['name_input___user_password']);
		jQuery(this.object_dom___component).closest(".class_div___element-AccountDetails--item").children(".class_div___component-Form").hide();
		this.F_HideSubmissionStatusDescription();
	};
});
