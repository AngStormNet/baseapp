import { Component } from '@angular/core';


export class ArrayService {
    // Methods to help manipulate javascript arrays.

    getIds(anArray) {
        //Take an array of objects that have the 'id' field.
        //Return an array of object.id values.
        let ids = [];
        for(let item of anArray) {
            if(item.id) {
                ids.push(item.id);
            }
        }
        return ids;
    }

    hasAtLeastOneValue(values) {
        /*
        values is an array of various values.
        Return true if at least 1 value in the array has a valid value.
        */
        return values.some(this.isDefined);
    }

    isDefined(value) {
        /*
        Will evaluate to true if value is not:
            null
            undefined
            NaN
            empty string ("")
            0
            false
        Reference:
        https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in
        */
        if(value) {
            // test for an empty array
            return value.length;
        }
        return false;
    }

    removeSecondaryFromPrimary(secondary, primary) {
        // Remove items from the primary array that exist in the secondary array.
        // Return the new primary array.
        for(let item of secondary) {
            var index = primary.indexOf(item)
            primary.splice(index, 1);
        }
        return(primary);
    }
}
