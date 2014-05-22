jQuery(document).ready(function(){

var planPrices = [];

    $("#caclucateButton").on('click', function(e) {
        e.preventDefault();

        var planname = planSelectionField.F_GetSelectedOption(),
            provider = providerSelectionField.F_GetSelectedOption(),
            timeperiod = periodSelectionField.F_GetSelectedOption(),
	    featuresValues = [],
	    featuresNames = [];

        if (provider == 'Please select...') {
            alert('Please select Provider.');
            return ;
        }
        if (planname == 'Please select...') {
            alert('Please select Plan.');
            return ;
        }
        if (isNaN(parseInt(timeperiod))) {
            alert('Please select time period.');
            return ;
        }

        $("#id_table___Plan-Feature-Details").find("input").each(function( index ) {
            if (typeof $( this ).attr('id') !== "undefined") {
                // YesNo Feature
                if ($( this ).attr('id').indexOf('id_div___component-Radiobox_') >= 0) {
		    featuresNames.push($( this ).attr('name'));
                    featuresValues.push($( this ).val());
                }
                // Int Feature
                if ($( this ).attr('id').indexOf('id_div___component-InputField_') >= 0) {
		    featuresNames.push($( this ).attr('name'));
                    featuresValues.push(parseInt($( this ).val()));
                }
            }

        });

        // Select Feature
        $("#id_table___Plan-Feature-Details").find("li.class___element-status__selected").each(function( index ) {
            var elInput = $($( this ).find("input:first"));
    	    featuresNames.push(elInput.attr('name'));
	    featuresValues.push((typeof features[elInput.attr('name')] !== 'undefined' ? features[elInput.attr('name')] + ',' : '') + elInput.val());
        });

        jQuery.ajax({
            url: "/ajax/calculatePlanCost",
            cache: false,
            async: true,
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({
	        provider: provider,
                planname: planname,
                timeperiod: timeperiod,
                featuresNames: featuresNames,
                featuresValues: featuresValues
            }),
            beforeSend: function(){
                jQuery('#calculatedPriceContainer').html('Please wait for calculation...');
                jQuery("body").css("cursor", "progress");
            },
            success: function(response) {
                if (response.status) {
                    var data = response.data.data;

                    jQuery('#calculatedPriceContainer').html('Price - ' + data.toFixed(2) + ' per ' + timeperiod + " months" );

                } else {
                    jQuery('#calculatedPriceContainer').html('Error occurred. Status is not set.');
                }
            },
            error: function(xhr, status, error) {
                jQuery('#calculatedPriceContainer').html('Error occurred ' + xhr.responseText + "status"+status + "err"+ error);
            },

            complete: function () {
                jQuery("body").css("cursor", "default");
            }
        });



    });

    function C_SelectionFieldReviewCollection() {

        var $=this,
            _=null;

            hTypeSelectionField = new C_SelectionField(),
            providerSelectionField = new C_SelectionField(),
            planSelectionField = new C_SelectionField(),
            periodSelectionField = new C_SelectionField(),

            newOptions = [];

        hTypeSelectionField.F_OnChange = function(li){
            planSelectionField.F_DeleteOptions();
            providerSelectionField.F_OnChange();
        }

        providerSelectionField.F_OnChange = function(li){

            newOptions = [];

            planSelectionField.F_DeleteOptions();

            jQuery.ajax({
                url: "/ajax/getPlansByHType",
                cache: false,
                async: true,
                type: "POST",
                dataType: "json",
                data: {
                    htype: hTypeSelectionField.F_GetSelectedOption(),
                    provider: this.F_GetSelectedOption()
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

                        planSelectionField.F_AddOptions(newOptions);

                    }
                },

                complete: function () {
                    jQuery("body").css("cursor", "default");
                }
            });
        }

        planSelectionField.F_OnChange = function(li){
            newOptions = [];
            planPrices = [];

            jQuery.ajax({
                url: "/ajax/getPlanPrices",
                cache: false,
                async: false,
                type: "POST",
                dataType: "json",
                data: {
                    provider: providerSelectionField.F_GetSelectedOption(),
                    planname: this.F_GetSelectedOption()
                },
                beforeSend: function(){
                    jQuery("body").css("cursor", "progress");
                },
                success: function(response) {
                    if (response.status) {
                        var data = response.data.data;

                        for(var i=0; i<data.length; i++) {
                            planPrices.push({
                                months: (data[i].number_timeunit * (data[i].timeunit == 'month' ? 1 : 12) ),
//                                price: (data[i].price / (data[i].number_timeunit * (data[i].timeunit == 'month' ? 1 : 12))),
                                price: (data[i].price / (data[i].timeunit == 'month' ? 1 : 12)),
                                currency: data[i].currency
                            });
                        }

                    }
                },

                complete: function () {
                    jQuery("body").css("cursor", "default");
                }
            });

            planPrices.sort(function f(a, b) {
                a = a.months;
                b = b.months;
                var c = 0
                if (a > b) c = 1;
                if (a < b) c = -1;
                return c
            });

            // Детали плана для таблички
            jQuery("#id_table___Plan-Feature-Details").empty();
            jQuery.ajax({
                url: "/ajax/getPlanDetailFeaturesHTML",
                cache: false,
                async: true,
                type: "POST",
                dataType: "json",
                data: {
                    htype: hTypeSelectionField.F_GetSelectedOption(),
                    provider: providerSelectionField.F_GetSelectedOption(),
                    planname: this.F_GetSelectedOption()
                },
                beforeSend: function(){
                    jQuery("body").css("cursor", "progress");
                },
                success: function(response) {
                    if (response.status) {
                        jQuery("#id_table___Plan-Feature-Details").append(response.data.data);

                        jQuery(".class_div___component-InputFieldWithSlider").each(function(integer___index,object_dom___element)
                        {
                            var object___configuration=array_object___configuration[integer___index]||array_object___configuration[0];
                            object___configuration.object_dom___component=object_dom___element;

                            __object_object___C_InputFieldWithSlider[object___configuration.varchar___id]=new C_InputFieldWithSlider;
                            __object_object___C_InputFieldWithSlider[object___configuration.varchar___id].F_Initialize(object___configuration);
                        });

                    }
                },

                complete: function () {
                    jQuery("body").css("cursor", "default");
                }
            });

        }

/*        periodSelectionField.F_OnChange = function(li){
            var selectedMonths = this.F_GetSelectedOption(),
                costPerMonth = 0,
                costPerYear = 0,
                costCurrency;

            for(var i=0;i<planPrices.length;i++) {
                if (planPrices[i].months > selectedMonths) {
                    costPerMonth = planPrices[(i == 0 ? 0 : i-1)].price;
                    costPerYear = costPerMonth * 12;
                    costCurrency = planPrices[(i == 0 ? 0 : i-1)].currency;
                    break;
                }
            }

            if (costPerMonth == 0) {
                costPerMonth = planPrices[planPrices.length - 1].price;
                costPerYear = costPerMonth * 12;
                costCurrency = planPrices[planPrices.length - 1].currency;
            }

            jQuery('#calculatedPriceContainer').html('Price - ' + costPerMonth.toFixed(2) + ' ' + costCurrency + ' per month or ' + costPerYear.toFixed(2) + ' ' + costCurrency + ' per year');

        }*/

        $.F_Initialize = function() {
            hTypeSelectionField.F_Initialize({
                string___DOM_id							:"id_div___component-SelectionField__action",
                bool___multiple_options_selection:false
            });

            providerSelectionField.F_Initialize({
                string___DOM_id							:"id_div___component-SelectionField__provider",
                bool___multiple_options_selection:false
            });

            planSelectionField.F_Initialize({
                string___DOM_id							:"id_div___component-SelectionField__plan",
                bool___multiple_options_selection:false
            });

            periodSelectionField.F_Initialize({
                string___DOM_id							:"id_div___component-SelectionField__time_period",
                bool___multiple_options_selection:false
            });
        }

    }

    (new C_SelectionFieldReviewCollection).F_Initialize();

    planSelectionField.F_OnChange();

});
