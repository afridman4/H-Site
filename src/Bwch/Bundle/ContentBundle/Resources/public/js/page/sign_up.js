jQuery(document).ready(function(){

	var array_object___form_field_configuration=
	[
        {
            varchar___class_name			:'C_InputField',
            object_object___instance_group	:__object_object___C_InputField,
            string___DOM_id					:"id_div___component-InputField-form_id__SignUp-name__user_login",
            string___DOM_name				:"name_input___user_login",
            bool___autofocus				:true,
            bool___required					:true
        },{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id					:"id_div___component-InputField-form_id__SignUp-name__user_name",
			string___DOM_name				:"name_input___user_name",
			bool___required					:true
		},
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id					:"id_div___component-InputField-form_id__SignUp-name__user_email_address",
			string___DOM_name				:"name_input___user_email_address",
			varchar___validation_rule_id	:'email_address',
			bool___required					:true
		},
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id					:"id_div___component-InputField-form_id__SignUp-name__user_password",
			string___DOM_name				:"name_input___user_password",
			bool___required					:true
		},
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id					:"id_div___component-InputField-form_id__SignUp-name__user_password_confirmation",
			string___linked_component_DOM_id:"id_div___component-InputField-form_id__SignUp-name__user_password",
			string___DOM_name				:"name_input___user_password_confirmation",
			bool___required					:true
		},
	];

	__object_object___C_Form["id_div___component-Form__SignUp"]=new C_Form;
	__object_object___C_Form["id_div___component-Form__SignUp"].F_Initialize
	(
		{					
			varchar___id			:"SignUp",
			string___action_path	:"/_request_processor.php?varchar___request_id=sign_up",
			array_object___field_configuration		:array_object___form_field_configuration,
			string___confirmation_control_DOM_id:"id_div___component-Button-form_id__SignUp-action__confirm",

            /*HERMiT*/
            varchar___form_id: 'signup_form'
		}
	);
});
