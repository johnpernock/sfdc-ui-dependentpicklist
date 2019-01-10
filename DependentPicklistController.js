/**
 * Created by johnpernock from OpenGate Consulting on 2019-01-09.
 */
({
    doInit : function(component, event, helper) {
        component.find("loaddependent_spinner").set("v.class" , 'slds-show');
        // get the fields API name and pass it to helper function
        var controllingFieldAPI = component.get("v.controllingFieldAPI");
        var dependingFieldAPI = component.get("v.dependingFieldAPI");
        var objDetails = component.get("v.objDetail");
        // call the helper function
        helper.fetchPicklistValues(component,objDetails,controllingFieldAPI, dependingFieldAPI);
    },
    onControllerFieldChange: function(component, event, helper) {
        var controllerValueKey = event.getParam("value"); // get selected controller field value
        var depnedentFieldMap = JSON.parse(component.get("v.depnedentFieldMap"));
        var nullValueKey = {
                                                        value: null,
                                                        label: "--- None ---",
                                                        values: []
                                                    };
        if (controllerValueKey != null) {
            var ListOfDependentFields = depnedentFieldMap[controllerValueKey]['values'];
            console.log(ListOfDependentFields);
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledDependentFld" , false);
                helper.fetchDepValues(component, ListOfDependentFields);
            }else{
                component.set("v.bDisabledDependentFld" , true);
                component.set("v.listDependingValues", [nullValueKey]);
            }

        } else {
            component.set("v.listDependingValues", [nullValueKey]);
            component.set("v.bDisabledDependentFld" , true);
        }
    },
})
