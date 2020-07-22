
// RETURNS A STRING IF THERE IS AN ERROR, OTHERWISE AN ARRAY SUGGESTION.
function scheduleLBNL(priorities, generals, startDate, totalHours) {
    
    // FIND PRIORITY HOURS
    let priorityLength = 0;
    priorities.forEach(request => priorityLength += request.totalHours);
    
    // CHECK IF PRIORITY HAS ENERGY CHANGE
    let priorityEnergyChange = hasEnergyChange(priorities);    

    // FIND OUT THE ALLOTED TIME CONSIDERING ONLY PRIORITY CHANGES
    // THIS IS WRONG
    let allotedHours = totalHours;

    if (priorityEnergyChange) allotedHours -= 8;
    else allotedHours -= 4;
    
    let generalHours = priorityLength - allotedHours;
    // COMPARE PRIORITY HOURS TO ALLOTED
    if (generalHours < 0) {
        return "Please select a priority list that fits within the alloted window.";
    }

    // ADD THE FIRST TUNE
    let suggestion= [];
    let startTune = createStartTune(startDate);
    suggestion.push(startTune);



    // AT THIS POINT, PRIORITY LIST FITS WITHIN WINDOW.
    // NOW, OPTIMIZE PRIORITY LIST.
    return "Called";
}

// RETURNS IF ENERGY CHANGE
function hasEnergyChange(requests) {
    let energySet = new Set();
    requests.forEach(request => 
        request.beams.values.forEach(energy => energySet.add(energy)));
    return (energySet.length <= 1);
}


// CREATES OBJECTS WITH STRINGS THAT CAN BE PASSED INTO DATE CONSTRUCTOR
function createStartTune(start) {
    let startDate = new Date(start);
    let endDate = new Date(start);
    let endHours = endDate.getHours() + 4;
    endDate.setHours(endHours);

    let returnedTune = {
        start: startDate,
        end: endDate,
    };
    console.log("Returned Start Tune");
    console.log(returnedTune);
}

function createEndTune(end) {
    let endDate = new Date(end);
    let startDate = new Date(end);
    let startHours = endDate.getHours() - 4;
    startDate.setHours(startHours);

    let returnedTune = {
        start: startDate,
        end: endDate,
    };
    console.log("Returned End Tune");
    console.log(returnedTune);
}

// RETURN 
function breakUpExperiments(experiments) {
    // ITERATE OVER IONS
    return 
} 
export default scheduleLBNL;


