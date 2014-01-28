jQuery(document).ready(function(){

//	var array_string___input_field_DOM_id=[],
//		string___default_input_field_DOM_id="";

	var array_object___form_field_configuration=
	[
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id					:"id_div___component-InputField-form_id__Contact__user_email_address",
			string___DOM_name				:"name_input___user_email_address",
			varchar___validation_rule_id	:'email_address',
			bool___required					:true,
			bool___autofocus				:true
		},
        {
            varchar___class_name			:'C_InputField',
            object_object___instance_group	:__object_object___C_InputField,
            string___DOM_id					:"id_div___component-InputField-form_id__Contact__user_name",
            string___DOM_name				:"name_input___user_name",
            bool___autofocus				:true,
            bool___required					:true
        },
        {
            varchar___class_name			:'C_InputField',
            object_object___instance_group	:__object_object___C_InputField,
            string___DOM_id					:"id_div___component-InputField-form_id__Contact__subject",
            string___DOM_name				:"name_input___subject",
            bool___autofocus				:true,
            bool___required					:true
        },
        {
            varchar___class_name			:'C_InputField',
            object_object___instance_group	:__object_object___C_InputField,
            string___DOM_id					:"id_div___component-InputField-form_id__Contact__message",
            string___DOM_name				:"name_input___message",
            bool___autofocus				:true,
            bool___required					:true
        }
	];
	
	__object_object___C_Form["id_div___component-Form__Contact"]=new C_Form;
	__object_object___C_Form["id_div___component-Form__Contact"].F_Initialize
	(
		{					
			varchar___id							:"Contact",
			string___action_path					:"/_request_processor.php?varchar___request_id=contact_us",
			string___confirmation_control_DOM_id	:"id_div___component-Button-form_id__Contact-action__confirm",
			array_object___field_configuration		:array_object___form_field_configuration,

            /*HERMiT*/
            varchar___form_id: 'contact_form'
        }
	);
});
