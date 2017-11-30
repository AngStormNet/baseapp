import { ArrayService } from './array.service';


describe('Array Helper: ', () => {    
    //Test User Service methods/functions
    let arrayService = new ArrayService();

    const assigned = ['First', 'Third'];
    const available = ['First', 'Second', 'Third', 'Fourth'];

    it('#getIds works correctly', () => {
        /* Verify the getIds method returns correct array.  */
        const testArray = [
            {
                id: 4,
                name: 'three',
            },
            {
                id: 2,
                name: 'three',
            }
        ]
        const result = arrayService.getIds(testArray);
        expect(result).toEqual([4,2]);
    });

    it('#getIds returns empty array', () => {
        /* Verify the getIds method returns an empty array  */
        const testArray = [
            {
                abbr: 3,
                name: 'three',

            },
            {
                abbr: 2,
                name: 'three',
            }
        ]
        const result = arrayService.getIds(testArray);
        expect(result).toEqual([]);
    });

    it('#removeSecondaryFromPrimary returns correct Array', () => {
        /* This will remove First and Third from the Available array and leave Second and Fourth */
        const groups = arrayService.removeSecondaryFromPrimary(assigned, available);
        expect(groups).toEqual(['Second', 'Fourth']);
    });
    
    it('#hasAtLeastOneValue returns true', () => {
        /* Verify the array has at least 1 valid value. */
        const test_values = ['email logs', '', ''];
        const result = arrayService.hasAtLeastOneValue(test_values);
        expect(result).toBeTruthy();
    });

    it('#hasAtLeastOneValue returns false', () => {
        /* Verify the array does not have a valid value.  */
        const test_values = [0, '', false, undefined, null, {}];
        const result = arrayService.hasAtLeastOneValue(test_values);
        expect(result).toBeFalsy();
    });

});