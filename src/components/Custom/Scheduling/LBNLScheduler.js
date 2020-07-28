// RETURNS A STRING IF THERE IS AN ERROR, OTHERWISE AN ARRAY SUGGESTION.
function scheduleLBNL(priorities, generals, start, end) {
    let dummyData = [];

    let startDate = new Date(start);
    let startTuneEnd = new Date(start);
    startTuneEnd.setHours(startTuneEnd.getHours() + 4);
    let dummyStart = {
        start: startDate,
        end: startTuneEnd,
        type: "downtime",
    };
    dummyData.push(dummyStart);

    let endDate = new Date(end);
    let startEndTune = new Date(endDate.getTime());
    startEndTune.setHours(startEndTune.getHours() - 4);
    let dummyEnd = {
        start: startEndTune,
        end: endDate,
        type: "downtime",
    };
    dummyData.push(dummyEnd);

    let expOneEnd = new Date(startTuneEnd.getTime());
    expOneEnd.setHours(expOneEnd.getHours() + 16);
    let experimentOne = {
        start: startTuneEnd,
        end: expOneEnd,
        type: "beamtime",
        energy: 20,
        id: 1,
    }
    dummyData.push(experimentOne);

    let expTwoEnd = new Date(expOneEnd.getTime());
    expTwoEnd.setHours(expTwoEnd.getHours() + 8);
    let experimentTwo = {
        start: expOneEnd,
        end: expTwoEnd,
        type: "beamtime",
        energy: 20,
        id: 2,
    }
    dummyData.push(experimentTwo);

    let expThreeEnd = new Date(expTwoEnd.getTime());
    expThreeEnd.setHours(expThreeEnd.getHours() + 16);

    let experimentThree = {
        start: expTwoEnd,
        end: expThreeEnd,
        type: "beamtime",
        energy: 20,
        id: 1,
    }
    dummyData.push(experimentThree);

    let expFourEnd = new Date(expThreeEnd.getTime());
    expFourEnd.setHours(expFourEnd.getHours() + 8);

    let experimentFour = {
        start: expThreeEnd,
        end: expFourEnd,
        type: "beamtime",
        energy: 20,
        id: 1,
    }
    dummyData.push(experimentFour);


    let transitionEnd = new Date(expFourEnd.getTime());
    transitionEnd.setHours(transitionEnd.getHours() + 4);

    let transition = {
        start: expFourEnd,
        end: transitionEnd,
        type: "downtime",
    }
    dummyData.push(transition);

    let expFiveEnd = new Date(transitionEnd.getTime());
    expFiveEnd.setHours(expFiveEnd.getHours() + 16);

    let experimentFive = {
        start: transitionEnd,
        end: expFiveEnd,
        type: "beamtime",
        energy: 30,
        id: 3,
    }
    dummyData.push(experimentFive);
    console.log("Scheduling Data");
    console.log(dummyData);
    return dummyData;
}

function development(priorities, generals, start, end) {
    console.log("SCHEDULE");
    console.log(priorities);
    console.log(generals);

    let startDate = new Date(start);
    let endDate = new Date(end);

    let downTime = -1;
    let returned = [];
    let splitPriorities = splitUpRequests(priorities);
    let prioritySchedule = optimize(splitPriorities, startDate, endDate);
    if (prioritySchedule[0] === false) return "Please select a priority list that fits within the alloted window.";
    else {
        downTime = prioritySchedule[0];
        returned = prioritySchedule[1];
    }

    let n = generals.length; 
    let subsets = [];
    let subset, allSplitRequests, splitAddedRequests;

    for (let i = 0; i < (1<<n); i++) {
        subset = [];
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) > 0) {
                subset.push(generals[j]);
            }
        }
        subsets.push(subset);
    }

    subsets.forEach(subset => {
        allSplitRequests = splitPriorities.slice();
        splitAddedRequests = splitUpRequests(subset);
        splitAddedRequests.forEach(splitRequest => allSplitRequests.push(splitRequest));
        let tempScheduleInfo = optimize(allSplitRequests);
        if (tempScheduleInfo[0] === false) return;
        else {
            if (tempScheduleInfo[0] < downTime) {
                downTime = tempScheduleInfo[0];
                returned = tempScheduleInfo[1];
            }
        }
    });

    return returned;
}

// WORKS ON SPLIT REQUESTS
function optimize(requestsSplit, startDate, endDate) {
    let returnedSchedule = [];
    let downtime = 0;
    let allRequests = requestsSplit.slice();
    let pointer = {
        start: startDate,
        end: endDate,
        current: startDate,
        endTune: false,
        downTime: 0,
    }

    addTunes(returnedSchedule, requestsSplit, pointer); 

    findPerfectSixteens(returnedSchedule, allRequests, downtime);
    //findPerfectEights(returnedSchedule, allRequests, downtime);

    //findSlightSixteens(returnedSchedule, allRequests, downtime);
    //findSlightEights(returnedSchedule, allRequests, downtime);

    return returnedSchedule;
}

function addTunes(returnedSchedule, splitRequests, pointer) {
    
    addStartTune(returnedSchedule, pointer);
    
    if (hasEnergyChange(splitRequests)) {
        addEndTune(returnedSchedule, pointer);
    }
}

function findPerfectSixteens(returnedSchedule, allRequests, pointer) {
    let sixteens = [];
    allRequests.forEach(request => {
        if (request.hoursOn === 16) sixteens.push(request);
    });

    sortExperiments(sixteens);

    let match;
    sixteens.forEach(request => {
        match = getMatch(request, allRequests, 8);
        if (match === false) return;
        else {
            let matches = match[0];
            let offset = match[1];
            addPerfectMatch(returnedSchedule, request, matches, offset, request.shifts, pointer, allRequests);
            let removed = matches.push(request);
            removeExperiments(allRequests, removed);
        }
    });
}

function findPerfectEights(returnedSchedule, allRequests, pointer) {
    let eights = [];
    allRequests.forEach(request => {
        if (request.hoursOn === 8) eights.push(request);
    });

    sortExperiments(eights);

    let match;
    eights.forEach(request => {
        match = getMatch(request, allRequests, 16);
        if (match === false) return;
        else {
            addPerfectMatch(returnedSchedule, request, match[0],  match[1], request.shifts, pointer, allRequests);
            let removed = [request, match];
            removeExperiments(allRequests, removed);
        }
    });
}

// THIS IS ALL THAT IS LEFT
// ASSUMES THIS IS AN 8/16 or 16/8 PERFECT MATCH
// OFFSET OF -1 ADDS SECOND EXPERIMENT ONCE BEFORE, OFFSET OF 1 ADDS FIRST EXPERIMENT ONCE AFTER
function addPerfectMatch(returnedSchedule, request, matches, offset, times, pointer, allRequests) {
    

    // IF NO OFFSET, ADD ALL SAME ENERGY NOW.
    if (offset === 0) addAllSameEnergy(returnedSchedule, request.energy, matches, pointer, allRequests);

    if (offset === -1) {
        addExperiment(returnedSchedule, matches, pointer);
    }
    
    for (let i = 0; i < times; i++) {
        addAllSameEnergy(returnedSchedule, request.energy, matches, pointer, allRequests);
        addExperiment(returnedSchedule, request, pointer);
        addExperiment(returnedSchedule, matches, pointer);
    }

    // HANDLE END
    if (offset === 1) {
        addExperiment(returnedSchedule, request, pointer);
        addAllSameEnergy(returnedSchedule, request.energy, matches, pointer, allRequests);
    }
    else if (offset === -1) {
        addAllSameEnergy(returnedSchedule, matches[0].energy, matches, pointer, allRequests);
    } 
    else if (offset === 0) {
        addAllSameEnergy(returnedSchedule, matches[0].energy, matches, pointer, allRequests);
    }
}

function addAllSameEnergy(returnedSchedule, energy, excludedRequests, pointer, allRequests) {
    let request, excluded;
    for (let i = 0; i < allRequests.length; i++) {
        request = allRequests[i];
        excluded = false;
        if (request.energy === energy && request.shifts === 1) {
            for (let j = 0; j < excludedRequests.length; j++) {
                let excludedRequest = excludedRequests[j];
                if (equals(excludedRequest, request)) {
                    excluded = true;
                    break;
                }
            }
            if (!excluded) addExperiment(returnedSchedule, request, pointer);
        }
    }
}

function removeExperiments(allRequests, requestsToRemove) {
    for (let i = 0; i < requestsToRemove.length; i++) {
        for (let j = 0; j < allRequests.length; j++) {
            if (equals(requestsToRemove[i], allRequests[j])) {
                allRequests.splice(j, 1);
                break;
            }
        }
    }
}

function equals(experimentOne, experimentTwo) {
    if (experimentOne.ions === experimentTwo.ions &&
        experimentOne.shifts === experimentTwo.shifts &&
        experimentOne.hoursOn === experimentTwo.hoursOn &&
        experimentOne.hoursOff === experimentTwo.hoursOff &&
        experimentOne.energy === experimentTwo.energy &&
        experimentOne.id === experimentTwo.id) 
        return true;

    return false;
}



// MOVES POINTER AND ADDS EXPERIMENT
function addExperiment(returnedSchedule, expirement, pointer) {
    let startExperiment = new Date(pointer.current.getTime());
    pointer.current.setHours(pointer.current.getHours() + expirement.hoursOn);
    let endExperiment = new Date(pointer.current.getTime());
    let addedExperiment = {
        start: startExperiment,
        end: endExperiment,
        type: "beamtime",
        energy: expirement.energy,
        id: expirement.id,
    }
    returnedSchedule.push(addedExperiment);
}

// REQUEST SHOULD BE SIXTEEN HOURS
function getMatch(mainRequest, allRequests, hours) {
    let energy = mainRequest.energy;
    let shifts = mainRequest.shifts;

    let possibleMatches = [];
    
    let neutralOffsets = [];
    let positiveOffsets = [];

    let request;
    for (let i = 0; i < allRequests.length; i++) {
        request = allRequests[i];
    
        if (request.hoursOn === hours && request.energy === energy) {
            possibleMatches.push(request);
            if (request.shifts === shifts + 1) {
                return [request, -1];
            }
            else if (request.shifts === shifts) {
                if (neutralOffsets === []) neutralOffsets = request;
            }
            else if (request.shifts === shifts - 1) {
                if (positiveOffsets === []) positiveOffsets = request;
            }
        }
    }

    // IF HERE, NO NEGATIVE OFFSETS WERE FOUND
    if (neutralOffsets != []) return [neutralOffsets, 0];
    if (positiveOffsets != []) return [positiveOffsets, 1];


    // IF HERE, THEN THERE ARE NO GOOD OPTIONS AND ALL ARRAYS ARE EMPTY.

    // CHECK FOR SUBSETS, NOW MOVE ONTO EIGHTS
    // THIS IS O(2^N), but N should be very small in practice.

    let negativeOffsets = [];
    let n = possibleMatches.length; 
    let totalShifts, subset;
    // FIND ALL SUBSETS OF EIGHT HOUR CHUNKS
    for (let i = 0; i < (1<<n); i++) {
        subset = [];
        totalShifts = 0
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) > 0) {
                subset.push(possibleMatches[j]);
                totalShifts +=  possibleMatches[j].shifts;
            }
        }
        // IF THEY SUM TO CLOSE TO +/-1 SHIFTS, CONSIDER THEM
        // OTHERWISE IGNORE
        if (totalShifts == shifts + 1) positiveOffsets.push(subset);
        if (totalShifts == shifts) neutralOffsets.push(subset);
        if (totalShifts == shifts - 1) negativeOffsets.push(subset);
    }

    if (negativeOffsets != []) return [getSmallestSubset(negativeOffsets), -1];
    if (neutralOffsets != []) return [getSmallestSubset(neutralOffsets), 0];
    if (positiveOffsets != []) return [getSmallestSubset(positiveOffsets), 1];

    // AT THIS POINT, NO PERFECT MATCHES EXIST.
    return false;
}

// USES BUBBLE SORT, COULD BE CHANGED FOR EFFICIENCY
// REQUITES SPLIT EXPERIMENTS
function sortExperiments(experiments) {
    var length = experiments.length;
    for (var i = 0; i < length; i++) { 
        for (var j = 0; j < (length - i - 1); j++) { 
            if(experiments[j].shifts > experiments[j+1].shifts) {
                var tmp = experiments[j];
                experiments[j] = experiments[j+1];
                experiments[j+1] = tmp;
            }
        }        
    }
}

function getSmallestSubset(subsets) {
    let smallest = Number.MAX_VALUE;
    let set;
    for (let i = 0; i < subsets; i++) {
        if (subsets[i].length < smallest) {
            set = subsets[i];
            smallest = set.length;
        }
    }
    return set;
}

function splitUpRequests(requests) {
    let returnedRequests = [];

    requests.forEach(request => {
        let tempBeams = request.beams;
        let tempID = request.id;
        let energies = Object.keys(tempBeams);
        energies.forEach(tempEnergy => {
            let beamInfo = tempBeams[tempEnergy];
            let tempExperiment = {
                ions: beamInfo[0],
                shifts: beamInfo[1],
                hoursOn: beamInfo[2],
                hoursOff: beamInfo[3],
                energy: tempEnergy,
                id: tempID,
            }
            returnedRequests.push(tempExperiment);
        });
    });
    return returnedRequests;
}



// RETURNS IF ENERGY CHANGE
function hasEnergyChange(requests) {
    let energySet = new Set();
    requests.forEach(request => {
        let beams = request.beams;
        let energies = Object.keys(beams);
        energies.forEach(energy => energySet.add(energy));
    });
    return (energySet.length > 1);
}


// CREATES OBJECTS WITH STRINGS THAT CAN BE PASSED INTO DATE CONSTRUCTOR
function addStartTune(returnedSchedule, pointer) {
    let endTune = new Date(pointer.start);
    endTune.setHours(endTune.getHours() + 4);
    
    let returnedTune = {
        start: pointer.start,
        end: endTune,
        type: "downtime"
    };

    returnedSchedule.push(returnedTune);
    pointer.downTime += 4;
    pointer.current.setHours(pointer.current.getHours() + 4);
}

function addEndTune(returnedSchedule, pointer) {
    let startTune = new Date(pointer.end);
    startTune.setHours(pointer.end.getHours() - 4);

    let returnedTune = {
        start: startTune,
        end: pointer.end,
        type: "downtime"
    };
    
    returnedSchedule.push(returnedTune);
    pointer.downTime += 4;
    pointer.endTune = true;
}


export default scheduleLBNL;




/* 

function findPerfectDoubleMatch(request, otherRequests){
    // CHANGE THE ATTRIBUTE NAMES
    let energy = request.energy;
    let shifts = request.shifts;
    let hours = request.hours;

    otherRequests.forEach(tempRequest => {
        let tempEnergy = tempRequest.energy;
        let tempShifts = tempRequest.shifts;
        if (tempEnergy === energy && tempShifts === shifts && hoursMatchDouble(request, tempRequest)) {
            return tempRequest;
        }
    });

    otherRequests.forEach(tempRequest => {
        let tempEnergy = tempRequest.energy;
        let tempShifts = tempRequest.shifts;
        if (tempEnergy === energy && tempShifts === shifts - 1 && hoursMatchDouble(request, tempRequest)) {
            return tempRequest;
        }
    });

    otherRequests.forEach(tempRequest => {
        let tempEnergy = tempRequest.energy;
        let tempShifts = tempRequest.shifts;
        if (tempEnergy === energy && tempShifts === shifts + 1 && hoursMatchDouble(request, tempRequest)) {
            return tempRequest;
        }
    });

    return false;
}


function hoursMatchDouble(firstRequest, secondRequest) {
    let first = firstRequest.hours;
    let second = secondRequest.hours;
    if (first === 8 && second === 16) {
        return true;
    } else if (first == 16  && second == 8) {
        return true;
}
}

function hoursMathTriple(firstRequest, secondRequest, thirdRequest) {
    let first = firstRequest.hours;
    let second = secondRequest.hours;
    let third = thirdRequest.hours;
    if (first === 16 && second === 16 && third == 16) {
        return true;
    }
// } */