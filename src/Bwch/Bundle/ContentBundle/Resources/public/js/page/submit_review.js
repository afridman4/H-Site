jQuery(document).ready(function(){

    function C_SelectionFieldReviewCollection() {

        var $=this,
            _=null;

            providerSelectionField = new C_SelectionField(),
            planSelectionField = new C_SelectionField();

        providerSelectionField.F_OnChange = function(li){

            var newOptions = []

            jQuery.ajax({
                url: "/ajax/getPlans",
                cache: false,
                async: true,
                type: "POST",
                dataType: "json",
                data: {
                    provider: providerSelectionField.F_GetSelectedOption()
                },
                beforeSend: function(){
                    jQuery("body").css("cursor", "progress");
                },
                success: function(response) {
                    if (response.status) {
                        var data = response.data.data;

                        for(var i=0; i<data.length; i++) {
                            newOptions.push({text:data[i].planname, value:data[i].planname});
                        }

                        planSelectionField.F_ReplaceOptions(newOptions);

                    }
                },

                complete: function () {
                    jQuery("body").css("cursor", "default");
                }
            });

        }

        planSelectionField.F_OnChange = function(li){
        }

        $.F_Initialize = function() {
            providerSelectionField.F_Initialize({
                string___DOM_id					    :"id_div___component-SelectionField__provider",
                bool___multiple_options_selection   :false
            });

            planSelectionField.F_Initialize({
                string___DOM_id							:"id_div___component-SelectionField__plan",
                bool___multiple_options_selection:false
            });
        }

    }

    (new C_SelectionFieldReviewCollection).F_Initialize();

});
