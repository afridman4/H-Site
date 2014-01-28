jQuery(document).ready(function(){

	var array_object___form_field_configuration=
	[
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id					:"id_div___component-InputField-form_id__SignIn-name__user_login",
			string___DOM_name				:"name_input___user_login",
			bool___required					:true,
			bool___autofocus				:true
		},
		{
			varchar___class_name			:'C_InputField',
			object_object___instance_group	:__object_object___C_InputField,
			string___DOM_id					:"id_div___component-InputField-form_id__SignIn-name__user_password",
			string___DOM_name				:"name_input___user_password",
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
*/
	__object_object___C_Form["id_div___component-Form__SignIn"]=new C_Form;
	__object_object___C_Form["id_div___component-Form__SignIn"].F_Initialize
	(
		{					
			varchar___id							:"SignIn",
			string___action_path					:"/_request_processor.php?varchar___request_id=sign_in",
			string___confirmation_control_DOM_id	:"id_div___component-Button-form_id__SignIn-action__confirm",
			array_object___field_configuration		:array_object___form_field_configuration,

            /*HERMiT*/
            varchar___form_id: 'signin_form'
        }
	);
});
