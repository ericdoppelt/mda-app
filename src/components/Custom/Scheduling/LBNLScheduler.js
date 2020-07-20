
// RETURNS A STRING IF THERE IS AN ERROR, OTHERWISE AN ARRAY SUGGESTION.
function scheduleLBNL(priorities, generals, startDate, totalHours) {

    // FIND PRIORITY HOURS
    let priorityLength = 0;
    priorities.forEach(request => priorityLength += request.totalHours);
    
    // CHECK IF PRIORITY HAS ENERGY CHANGE
    let priorityEnergyChange = false;
    priorities.forEach(request => {
        if (hasEnergyChange(request)) priorityEnergyChange = true;
    });

    // FIND OUT THE ALLOTED TIME CONSIDERING ONLY PRIORITY CHANGES
    let allotedHours = totalHours;
    if (priorityEnergyChange) allHours -= 8;
    else allHours -= 4;
    
    let generalHours = priorityLength - allotedHours;
    // COMPARE PRIORITY HOURS TO ALLOTED
    if (generalHours < 0) {
        return "Please select a priority list that fits within the alloted window.";
    }

    // AT THIS POINT, PRIORITY LIST FITS WITHIN WINDOW.
    // NOW, OPTIMIZE PRIORITY LIST.
    

}

// RETURNS IF ENERGY CHANGE
function hasEnergyChange(request) {
    let beams = request.beams;
    if (beams.length === 1) return false;
    else {
        let energySet = new Set();
        let energies = beams.values();
        energies.forEach(energy => energySet.add(energy));
        return (energySet.length === 1);
    }
}

export default scheduleLBNL;


