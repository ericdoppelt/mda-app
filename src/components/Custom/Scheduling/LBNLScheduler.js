// RETURNS A STRING IF THERE IS AN ERROR, OTHERWISE AN ARRAY SUGGESTION.

import { remove } from "mobx";

    
function scheduleLBNL(priorities, generals, start, end) {

    console.log(priorities);
    console.log(generals);
    // DEFINED AND DATE OBEJCTS
    let startDate = new Date(start);
    let endDate = new Date(end);

   

    let downTime = -1;
    let beamTime = -1;
    let returned = [];
    let splitPriorities = splitUpRequests(priorities);
    let prioritySchedule = optimize(splitPriorities, startDate, endDate);
    console.log("priority schedule");
    console.log(prioritySchedule);
    if (prioritySchedule[0] === false) return "Please select a priority list that fits within the alloted window.";
    else {
        beamTime = prioritySchedule[0];
        downTime = prioritySchedule[1];
        returned = prioritySchedule[2];
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
        let tempScheduleInfo = optimize(allSplitRequests, startDate, endDate);
        if (tempScheduleInfo[0] === false) return;
        else {
            if (tempScheduleInfo[0] > beamTime || tempScheduleInfo[0] === beamTime && tempScheduleInfo[1] < downTime) {
                beamTime = tempScheduleInfo[0];
                downTime = tempScheduleInfo[1];
                returned = tempScheduleInfo[2];
            }
        }
    });
    return returned;
}


// WORKS ON SPLIT REQUESTS
function optimize(requestsSplit, startDate, endDate) {
    console.log("OPTIMIZING");
    let returnedSchedule = [];
    let allRequests = requestsSplit.slice();
    let pointerCurrent = new Date(startDate);
    console.log("START DATE POINTER");
    console.log(startDate.getHours());
    let pointer = {
        start: startDate,
        end: endDate,
        current: pointerCurrent,
        endTune: false,
        downTime: 0,
        beamTime: 0,
        index: -1,
    }

    addTunes(returnedSchedule, requestsSplit, pointer); 
    findPerfectSixteens(returnedSchedule, allRequests, pointer);

    findPerfectEights(returnedSchedule, allRequests, pointer);

    //findSlightSixteens(returnedSchedule, allRequests, downtime);
    //findSlightEights(returnedSchedule, allRequests, downtime);
    return [pointer.beamTime, pointer.downTime, returnedSchedule];
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
        for (let i = 0; i < match.length; i++) {
            console.log(match[i]);
        }
        console.log("HEEEERREE");
        console.log(request);
        console.log(match);
        if (match === false) return;
        else {
            let matches = match[0];
            let offset = match[1];
            addPerfectMatch(returnedSchedule, request, matches, offset, request.shifts, pointer, allRequests);
            let removed = matches.push(request);
            removeExperiments(allRequests, removed);
            removeExperiments(sixteens, removed);
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
        match = getEightsMatch(request, allRequests);
        if (match === false) return;
        else {
            let mainMatch = request;
            let firstMatch = match[0];
            let secondMatch = match[1];
            let offset = match[2];
            addPerfectEightsMatch(returnedSchedule, mainMatch, firstMatch, secondMatch, offset, request.shifts, pointer, allRequests);
            let removed = [];
            for (let i = 0; i < firstMatch.length; i++) {
                removed.push(firstMatch[i]);
            }
            for (let j = 0; j < secondMatch.length; j++) {
                removed.push(secondMatch[j]);
            }
            removed.push(mainMatch);
            console.log("REMOVED");
            console.log(removed);
            removeExperiments(allRequests, removed);
            removeExperiments(eights, removed);
        }
    });
}

// firstMatch and secondMatch are ARRAYS
function addPerfectEightsMatch(returnedSchedule, mainRequest, firstMatch, secondMatch, offset, times, pointer, allRequests) {

    let excludedRequests = [];
    for (let i = 0; i < firstMatch.length; i++) {
        excludedRequests.push(firstMatch[i]);
    }
    for (let j = 0; j < firstMatch.length; j++) {
        excludedRequests.push(secondMatch[j]);
    }
    excludedRequests.push(mainRequest);
    addAllSameEnergy(returnedSchedule, mainRequest.energy, excludedRequests, pointer, allRequests);

    let firstMatchIndex = 0;
    let firstMatchShifts = 0;

    let secondMatchIndex = 0;
    let secondMatchShifts = 0;

    // MEANS THERE ARE MORE SHIFTS FOR MATCHES
    if (offset === -1) {
        addExperiment(returnedSchedule, firstMatch[firstMatchIndex], pointer);
        addExperiment(returnedSchedule, secondMatch[secondMatchIndex], pointer);
    }

    for (let i = 0; i < times; i++) {
        addExperiment(returnedSchedule, mainRequest, pointer);

        // CHECK TO ITERATE TO NEXT MATCHES SHIFT
        if (firstMatchShifts === firstMatch[firstMatchIndex].shifts) {
            firstMatchIndex += 1;
            firstMatchShifts = 0;
        }
        addExperiment(returnedSchedule, firstMatch[firstMatchIndex], pointer);

        if (secondMatchShifts === secondMatch[secondMatchIndex].shifts) {
            secondMatchIndex += 1;
            secondMatchShifts = 0;
        }
        addExperiment(returnedSchedule, secondMatch[secondMatchIndex], pointer);

        if (offset === 1) {
            addExperiment(returnedSchedule, mainRequest, pointer);
        }
    }
}

function getEightsMatch(mainRequest, allRequests) {
    let energy = mainRequest.energy;
    let shifts = mainRequest.shifts;

    let possibleMatches = [];
    let neutralOffsets = [];
    let positiveOffsets = [];
    // BASE CASE SO DIFFERENT FORMAT
    let firstNegativeMatch;

    let request;
    for (let i = 0; i < allRequests.length; i++) {
        request = allRequests[i];
        if (request.hoursOn === 8 && request.energy === energy && !equals(mainRequest, request)) {
            console.log(request);
            possibleMatches.push(request);
            if (request.shifts === shifts + 1) {
                // BEST OPTION IS FINDING 2 REQUESTS WITH +1 SHIFT. IF FOUND, RETURN.
                if (firstNegativeMatch != undefined) return [[firstNegativeMatch], [request], -1];
                else firstNegativeMatch = request;
            }
            else if (request.shifts === shifts) {
                if (neutralOffsets.length < 2) neutralOffsets.push(request);

            }
            else if (request.shifts === shifts - 1) {
                if (positiveOffsets.length < 2) positiveOffsets.push(request);
            }
        }
    }

    // HERE MEANS NO BASE CASE OF TWO +1S WERE FOUND
    if (neutralOffsets.length === 2) return [[neutralOffsets[0]],[neutralOffsets[1]], 0];
    else if (positiveOffsets.length === 2) return [[positiveOffsets[0]], [positiveOffsets[1]], 1];
    else return false;
}


// THIS IS ALL THAT IS LEFT
// ASSUMES THIS IS AN 8/16 or 16/8 PERFECT MATCH AT SAME ENERGY
// OFFSET OF -1 ADDS SECOND EXPERIMENT ONCE BEFORE, OFFSET OF 1 ADDS FIRST EXPERIMENT ONCE AFTER
function addPerfectMatch(returnedSchedule, request, matches, offset, times, pointer, allRequests) {
    let matchesIndex = 0;
    let matchesShifts = 0;
    // IF NO OFFSET, ADD ALL SAME ENERGY NOW.
    let excludedRequests = matches.push(request);
    addAllSameEnergy(returnedSchedule, request.energy, excludedRequests, pointer, allRequests);
    
    if (offset === -1) {
        addExperiment(returnedSchedule, matches[matchesIndex], pointer);
        matchesShifts += 1;
    }
     
    for (let i = 0; i < times; i++) {
        addExperiment(returnedSchedule, request, pointer);

        // CHECK TO ITERATE TO NEXT MATCHES SHIFT
        if (matchesShifts === matches[matchesIndex].shifts) {
            matchesIndex += 1;
            matchesShifts = 0;
        }
        addExperiment(returnedSchedule, matches[matchesIndex], pointer);
    }

    if (offset === 1) {
        addExperiment(returnedSchedule, request, pointer);
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
            
            if (!excluded) {
                console.log("excluded");
                addExperiment(returnedSchedule, request, pointer);
            }
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


function addDownTime(returnedSchedule, pointer) {
    let startTune = new Date(pointer.current.getTime());
    let endTune = new Date(startTune.getTime());
    endTune.setHours(endTune.getHours() + 4);
    let downTime = {
        start: startTune,
        end: endTune,
        type: "downtime"
    }
    returnedSchedule.push(downTime);
    pointer.downTime += 4;
    pointer.current.setHours(pointer.current.getHours() + 4);
    pointer.index += 1;
}

// MOVES POINTER AND ADDS EXPERIMENT
function addExperiment(returnedSchedule, experiment, pointer) {
    console.log("ADDING EXPERIMENT");
    console.log(experiment);
    console.log(pointer.index);
    console.log(returnedSchedule[pointer.index].type != "downtime");
    console.log(returnedSchedule[pointer.index].energy != experiment.energy);
    if (returnedSchedule[pointer.index].type != "downtime" && returnedSchedule[pointer.index].energy != experiment.energy) {
        addDownTime(returnedSchedule, pointer);
    }

    let startExperiment = new Date(pointer.current.getTime());
    pointer.current.setHours(pointer.current.getHours() + experiment.hoursOn);
    let endExperiment = new Date(pointer.current.getTime());
    
    let addedExperiment = {
        start: startExperiment,
        end: endExperiment,
        type: "beamtime",
        energy: experiment.energy,
        id: experiment.id,
    }
    returnedSchedule.push(addedExperiment);
    pointer.index += 1;
    pointer.beamTime += experiment.hoursOn;
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
            console.log(request);
            possibleMatches.push(request);
            if (request.shifts === shifts + 1) {
                console.log("REQUEST - 1");
                console.log(request);
                return [request, -1];
            }
            else if (request.shifts === shifts) {
                console.log("REQUEST 0");
                console.log(request);
                if (neutralOffsets === []) neutralOffsets = request;
            }
            else if (request.shifts === shifts - 1) {
                console.log("REQUEST 1");
                console.log(request);
                if (positiveOffsets === []) positiveOffsets = request;
            }
        }
    }

    if (possibleMatches.length === 0) return false;

    // IF HERE, NO NEGATIVE OFFSETS WERE FOUND
    if (neutralOffsets.length != 0) return [neutralOffsets, 0];

    if (positiveOffsets.length != 0) return [[positiveOffsets], 1];
    // IF HERE, THEN THERE ARE NO GOOD OPTIONS AND ALL ARRAYS ARE EMPTY.

    // CHECK FOR SUBSETS, NOW MOVE ONTO EIGHTS
    // THIS IS O(2^N), but N should be very small in practice.

    let negativeOffsets = [];
    let n = possibleMatches.length; 
    let totalShifts, subset;
    console.log(possibleMatches);
    // FIND ALL SUBSETS OF EIGHT HOUR CHUNKS
    for (let i = 0; i < (1<<n); i++) {
        subset = [];
        console.log('cleared subset');
        console.log(subset.length);
        totalShifts = 0
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) > 0) {
                subset.push(possibleMatches[j]);
                totalShifts +=  possibleMatches[j].shifts;
            }
        }
        // IF THEY SUM TO CLOSE TO +/-1 SHIFTS, CONSIDER THEM
        // OTHERWISE IGNORE
        if (totalShifts === shifts + 1) positiveOffsets.push(subset);
        if (totalShifts === shifts) neutralOffsets.push(subset);
        if (totalShifts === shifts - 1) negativeOffsets.push(subset);
    }

    if (negativeOffsets.length > 0) {
        console.log("-1 SUBSET");
        for (let i = 0; i < negativeOffsets.length; i++) {
            console.log(negativeOffsets[i]);
        }
        console.log(getSmallestSubset(negativeOffsets));
        return [getSmallestSubset(negativeOffsets), -1];
    }
    if (neutralOffsets.length > 0) {
        console.log("0 SUBSET");
        console.log(getSmallestSubset(neutralOffsets));
        return [getSmallestSubset(neutralOffsets), 0];
    }
    if (positiveOffsets.length > 0) {
        console.log("1 SUBSET");
        console.log(getSmallestSubset(positiveOffsets));
        return [getSmallestSubset(positiveOffsets), 1];
    }

    // AT THIS POINT, NO PERFECT MATCHES EXIST.
    console.log("RETURNING FALSE");
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

// ASSUMES SUBSETS != []
function getSmallestSubset(subsets) {
    let smallest = Number.MAX_VALUE;
    let set;
    for (let i = 0; i < subsets.length; i++) {
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
        energySet.add(request.energy);
    });
    return (energySet.length > 1);
}


// CREATES OBJECTS WITH STRINGS THAT CAN BE PASSED INTO DATE CONSTRUCTOR
function addStartTune(returnedSchedule, pointer) {
    let startTune = pointer.start;
    let endTune = new Date(pointer.start);
    endTune.setHours(endTune.getHours() + 4);
    let returnedTune = {
        start: startTune,
        end: endTune,
        type: "downtime"
    };
    returnedSchedule.push(returnedTune);
    pointer.downTime += 4;
    pointer.current.setHours(pointer.current.getHours() + 4);
    pointer.index = 0;
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
    pointer.index += 1;
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
}
*/