// Import all functions from put-item.js 
const lambda = require('../../../src/handlers/notify_estimation.js'); 
 
// This includes all tests for putItemHandler() 
describe('Test notifyEstimationHandler', function () { 

    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        putSpy.mockRestore(); 
    }); 
 
    // This test invokes putItemHandler() and compare the result  
    it('should add id to the table', async () => { 
        const returnedItem = {}; 
 
        // Return the specified value whenever the spied put function is called 
        putSpy.mockReturnValue({ 
            promise: () => Promise.resolve(returnedItem) 
        }); 
 
        const event = { 
            httpMethod: 'POST', 
            body: "{\"notification_type\":\"ESTIMATION_STATUS_UPDATED\",\"request\":{\"age\":45,\"bicep_circumference\":27.323706,\"calf_circumference\":36.243294,\"chest_circumference\":86.315414,\"created_at\":1561530296,\"updated_at\":1561530301,\"error_code\":null,\"error_detail\":null,\"front_image_url\":null,\"front_thumbnail_image_url\":null,\"gender\":\"male\",\"height\":173,\"high_hip_circumference\":74.957825,\"hip_circumference\":91.75341,\"id\":\"uniqueRequestId\",\"inseam_length\":85.749,\"knee_circumference\":38.093292,\"neck_circumference\":36.066647,\"outseam_length\":108.689705,\"race\":null,\"shoulder_width\":43.07665,\"side_image_url\":null,\"side_thumbnail_image_url\":null,\"sleeve_length\":82.65047,\"backlength\":null,\"underbust\":null,\"status\":\"completed\",\"thigh_circumference\":55.897587,\"mid_thigh_circumference\":48.660294,\"total_length\":155.41977,\"user_id\":\"uniqueUserId\",\"waist_circumference\":71.03106,\"weight\":68,\"wrist_circumference\":16.398588,\"fail_on_automatic_estimation_failure\":true,\"probabilityOfBicepCircumferenceInHitZone\":81,\"probabilityOfCalfCircumferenceInHitZone\":81,\"probabilityOfChestCircumferenceInHitZone\":98,\"probabilityOfHighHipCircumferenceInHitZone\":76,\"probabilityOfHipCircumferenceInHitZone\":84,\"probabilityOfInseamLengthInHitZone\":93,\"probabilityOfKneeCircumferenceInHitZone\":93,\"probabilityOfMidThighCircumferenceInHitZone\":94,\"probabilityOfNeckCircumferenceInHitZone\":86,\"probabilityOfOutseamLengthInHitZone\":88,\"probabilityOfShoulderWidthInHitZone\":83,\"probabilityOfSleeveLengthInHitZone\":89,\"probabilityOfThighCircumferenceInHitZone\":96,\"probabilityOfTotalLengthInHitZone\":100,\"probabilityOfWaistCircumferenceInHitZone\":96,\"probabilityOfWristCircumferenceInHitZone\":86}}"
        }; 
     
        // Invoke putItemHandler() 
        const result = await lambda.putItemHandler(event); 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify({}) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 