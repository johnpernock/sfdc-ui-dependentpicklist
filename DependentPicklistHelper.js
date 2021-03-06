/**
 * Created by johnpernock from OpenGate Consulting on 2019-01-09.
 */
({
    fetchPicklistValues: function(component,objDetails,controllerField, dependentField) {
        // call the server side function
        var action = component.get("c.getDependentMap");
        // pass paramerters [object definition , contrller field name ,dependent field name] -
        // to server side function
        action.setParams({
            'objDetail' : objDetails,
            'contrfieldApiName': controllerField,
            'depfieldApiName': dependentField
        });
        //set callback
        action.setCallback(this, function(response) {
            component.find("loaddependent_spinner").set("v.class" , 'slds-hide');
            if (response.getState() == "SUCCESS") {
                //store the return response from server (map<string,List<string>>)
                var StoreResponse = JSON.parse(response.getReturnValue());
                console.log(StoreResponse);
                // once set #StoreResponse to depnedentFieldMap attribute
                component.set("v.depnedentFieldMap",response.getReturnValue());
                // create a empty array for store map keys(@@--->which is controller picklist values)
                var listOfkeys = []; // for store all map keys (controller picklist values)
                var ControllerField = []; // for store controller picklist value to set on lightning:select.

                // play a for loop on Return map
                // and fill the all map key on listOfkeys variable.
                for (var singlekey in StoreResponse) {
                    var controlValue = StoreResponse[singlekey];
                    listOfkeys.push(controlValue);
                }

                //set the controller field value for lightning:select
                if (listOfkeys != undefined && listOfkeys.length > 0) {
                    var nullValueKey = {
                        value: null,
                        label: "--- None ---",
                        values: []
                    };
                    ControllerField.push(nullValueKey);
                }

                for (var i = 0; i < listOfkeys.length; i++) {
                    ControllerField.push(listOfkeys[i]);
                }
                ControllerField.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
                // set the ControllerField variable values to country(controller picklist field)
                component.set("v.listControllingValues", ControllerField);
            }else{
                alert('Something went wrong..');
            }
        });
        $A.enqueueAction(action);
    },

    fetchDepValues: function(component, ListOfDependentFields) {
        // create a empty array var for store dependent picklist values for controller field
        var dependentFields = [];
        var nullValueKey = {
                                value: null,
                                label: "--- None ---",
                                values: []
                            };
        dependentFields.push(nullValueKey);
        for (var i = 0; i < ListOfDependentFields.length; i++) {
            dependentFields.push(ListOfDependentFields[i]);
        }
        // set the dependentFields variable values to store(dependent picklist field) on lightning:select
        component.set("v.listDependingValues", dependentFields);

    },

})

