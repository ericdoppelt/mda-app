

function scheduleLBNL(priorities, generals, startDate, totalHours) {

    // FIND PRIORITY HOURS
    let  priorityLength = 0;
    for (let i = 0; i < priorities.length; i++) {
        let request = priorities[i];
        // change totalHours
        priorityLength += requset.totalHours;
    }
        // NUMBER OF 
}

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


