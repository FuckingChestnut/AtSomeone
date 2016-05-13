//extend module
var extend = function(input_object_1, input_object_2) {
        "use strict";
        if (temp_object === null) {
            return temp_object;
        }
        var temp_object_type = typeof temp_object;
        if (temp_object_type !== "object") {
            return temp_object;
        }
        var temp_object_is_window = temp_object.window === temp_object ? true : false,
            temp_new_object = {};
        if (temp_object_is_window) {
            return temp_object;
        };
        for (var temp_key in temp_object) {
            var temp_value = temp_object[temp_key],
                temp_value_type = typeof temp_value;
            if (temp_value_type === "object") {
                temp_value = arguments.callee(temp_value);
            };
            temp_new_object[temp_key] = temp_value;
        }
        return temp_new_object;

    },
    object_1 = {
        name: "pengchuan",
        info: {
            sex: "man",
            height: 183
        }
    },
    object_2 = {
        info: {
            weight: 120
        }
    },
    result = extend({}, object_1, object_2, true);
console.log(result);
