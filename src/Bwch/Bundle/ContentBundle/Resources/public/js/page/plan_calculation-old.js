jQuery(document).ready(function(){

var planPrices = [];

    function C_SelectionFieldReviewCollection() {

        var $=this,
            _=null;

            hTypeSelectionField = new C_SelectionField(),
            providerSelectionField = new C_SelectionField(),
            planSelectionField = new C_SelectionField();
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
                url: "/ajax/getPlanDetailFeatures",
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
                        var data = response.data.data;

                        // Заполним табличку
                        var html = '';
                        for(var i=0; i<data.length; i++) {
                            html += '<tr class="class_tr___element-height__25px" style="height:25px;">' +
                                    '<th><i>' + data[i].displayname + '</i></th>' +
                                    '<td><b>' + (data[i].type == 'yesno' ? 'YES' : data[i].value) + (data[i].type == 'int' && data[i].value != 'UNLIMITED' ? data[i].unit : '') + '</b></td>' +
                                    '</tr>';
                        }
                        jQuery("#id_table___Plan-Feature-Details").append(html);

                    }
                },

                complete: function () {
                    jQuery("body").css("cursor", "default");
                }
            });

        }

        periodSelectionField.F_OnChange = function(li){
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

        }

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
