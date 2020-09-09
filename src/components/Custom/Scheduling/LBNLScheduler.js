// RETURNS A STRING IF THERE IS AN ERROR, OTHERWISE AN ARRAY SUGGESTION.
    
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
    console.log(splitPriorities);
    let prioritySchedule = optimize(splitPriorities, startDate, endDate);
    console.log(prioritySchedule);
    if (prioritySchedule === false) return false;
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
        if (tempScheduleInfo === false) return;
        else {
            if ((tempScheduleInfo[0] > beamTime) || (tempScheduleInfo[0] === beamTime && tempScheduleInfo[1] < downTime)) {
                beamTime = tempScheduleInfo[0];
                downTime = tempScheduleInfo[1];
                returned = tempScheduleInfo[2];
            }
        }
    });
    console.log("returned schedule");
    console.log(JSON.parse(JSON.stringify(returned)));
    return returned;
}


// WORKS ON SPLIT REQUESTS
function optimize(requestsSplit, startDate, endDate) {
    console.log("new take");
    let returnedSchedule = [];
    let allRequests = requestsSplit.slice();
    let pointerCurrent = new Date(startDate);
    let pointer = {
        start: startDate,
        end: endDate,
        current: pointerCurrent,
        endTune: false,
        downTime: 0,
        beamTime: 0,
        openTime: 0,
        index: -1,
    }

    addTunes(returnedSchedule, requestsSplit, pointer); 
    findPerfectSixteens(returnedSchedule, allRequests, pointer);
    findPerfectEights(returnedSchedule, allRequests, pointer);
    findSlightSixteens(returnedSchedule, allRequests, pointer);
    //findSlightEights(returnedSchedule, allRequests, downtime);
    addAllElse(returnedSchedule, allRequests, pointer);
    
    console.log(JSON.parse(JSON.stringify(pointer)));
    if (hasValidEnd(pointer)) return [pointer.beamTime, pointer.downTime, returnedSchedule];
    else return false;
}

function hasValidEnd(pointer) {
    console.log(JSON.parse(JSON.stringify((pointer))));
    if (pointer.endTune) {
        let endTesting = new Date(pointer.end.getTime());
        endTesting.setHours(endTesting.getHours() - 4);
        if (pointer.current > endTesting) return false;
    }
    else if (pointer.current > pointer.end) return false;
    return true;
}


function addTunes(returnedSchedule, splitRequests, pointer) {
    
    addStartTune(returnedSchedule, pointer);
    
    if (hasEnergyChange(splitRequests)) {
        addEndTune(returnedSchedule, pointer);
    }
}

function findPerfectSixteens(returnedSchedule, allRequests, pointer) {
    let sixteens = getExperimentsByDuration(allRequests, 16);

    sortDescending(sixteens);

    let match;
    sixteens.forEach(request => {
        match = getPerfectMatch(request, allRequests, 8);
        if (match === false) return;
        else {
            let matches = match[0];
            let offset = match[1];
            addPerfectMatch(returnedSchedule, request, matches, offset, request.shifts, pointer, allRequests);
            let removed = matches.push(request);
            removeExperiments(allRequests, removed);
            removeExperiments(sixteens, [request]);
        }
    });
}

function findPerfectEights(returnedSchedule, allRequests, pointer) {
    let eights = getExperimentsByDuration(allRequests, 8);
    
    sortDescending(eights);

    let match;
    eights.forEach(request => {
        match = getPerfectEightsMatch(request, allRequests);
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
            removeExperiments(allRequests, removed);
            removeExperiments(eights, removed);
        }
    });
}

function findSlightSixteens(returnedSchedule, allRequests, pointer) {
    let sixteens = getExperimentsByDuration(allRequests, 16);
    sortAscending(sixteens);

    let match;
    sixteens.forEach(request => {
        match = getSlightMatch(request, allRequests, 8);
        if (match === false) return;
        else {
            let matches = match[0];
            let offset = match[1];
            addSlightMatch(returnedSchedule, request, matches, offset, request.shifts, pointer, allRequests);
            let removed = matches.push(request);
            removeExperiments(allRequests, removed);
            removeExperiments(sixteens, [request]);
        }
    });
}

/* function findSlightEights(returnedSchedule, allRequests, pointer) {
    let eights = getExperimentsByDuration(allRequests, 8);
    sortAscending(eights);

    let match;
    eights.forEach(request => {
        match = getSlightDoubleMatch(request, allRequests);
        if (match === false) return;
        else {
            let matches = match[0];
            let offset = match[1];
            addSlightMatch(returnedSchedule, request, matches, offset, request.shifts, pointer, allRequests);
            let removed = matches.push(request);
            removeExperiments(allRequests, removed);
            removeExperiments(eights, [request]);
        }
    });
} */


function addAllElse(returnedSchedule, allRequests, pointer) {
    let sixteens = getExperimentsByDuration(allRequests, 16);

    sixteens.forEach(request => {
        addImperfectExperiment(returnedSchedule, request, pointer);
    });

    let eights = getExperimentsByDuration(allRequests, 8);
    eights.forEach(request => {
        addImperfectExperiment(returnedSchedule, request, pointer);
    })
}

function addImperfectExperiment(returnedSchedule, request, pointer) {
    console.log(request);
    let added = false;
    for (let i = 0; i < returnedSchedule.length; i++) {
        let scheduledTime = returnedSchedule[i];
        // IF ONE SINGLE EXPERIMENT
        if (scheduledTime.type === 'open' && scheduledTime.time >= request.hoursOn) {
            let slotsAvailable = checkOpenSlots(returnedSchedule, request, i);
            console.log(slotsAvailable);
            if (slotsAvailable[0]) {
                replaceOpenTime(returnedSchedule, slotsAvailable[1], request, pointer);
                added = true;
                break;
            }
        }
    }
    if (!added) addExperimentToEnd(returnedSchedule, request, pointer);
    console.log(JSON.parse(JSON.stringify(returnedSchedule)));
}

// TWO CASES: ALWAYS ADDING IN MIDDLE, OR ADDING FROM MIDDLE PAST END
function replaceOpenTime(returnedSchedule, indices, request, pointer) {
    let offset = 0;
    indices.forEach(index => {
        let openTime = returnedSchedule[index + offset];
        let endExperiment = new Date(openTime.start.getTime() + request.hoursOn);
    
        let openTimeIndices = [];

        let insertedExperiment = {
            start: openTime.start,
            end: endExperiment,
            time: request.hoursOn,
            type: "beamtime",
            energy: request.energy,
            id: request.id,
            company: request.company,
            name: request.name,
        };

        if (openTime.time > request.hoursOn) {
            let duration = openTime.time - request.hoursOn;
            let addedOpen = {
                start: endExperiment,
                end: openTime.end,
                type: "open",
                time: duration,
            } 
            returnedSchedule.splice(index + offset + 1, 0, addedOpen);
            pointer.openTime += duration;
            pointer.index += 1;
            offset += 1;
        }
        openTimeIndices.push(index);
        returnedSchedule[index] = insertedExperiment;
        pointer.openTime -= openTime.time;
        pointer.beamTime += request.hoursOn;
    }); 
    sortReturnedSchedule(returnedSchedule);
}

function addExperimentToEnd(returnedSchedule, request, pointer) {
    for (let i = 0; i < request.shifts - 1; i++) {
        addExperiment(returnedSchedule, request, pointer);
        addOpenTime(returnedSchedule, 24 - request.hoursOn, pointer);
    }
    addExperiment(returnedSchedule, request, pointer);
}

// EXPERIMENTS ARE ALWAYS <24 HOURS
function checkOpenSlots(returnedSchedule, request, startIndex) {
    let timeSinceStart = 0;
    let targetTime;

    let success = true;
    let indices = [];

    for (let i = 0; i < request.shifts; i++) {
        targetTime = 24*i;
        for (let j = startIndex; j < returnedSchedule.length; j++) {
            let tempExperiment = returnedSchedule[j];
            if (timeSinceStart > targetTime) success = false;
            else if (timeSinceStart === targetTime && tempExperiment.type === 'open' && tempExperiment.time > request.hoursOn) {
                indices.push(j);
                break;
            }
            else timeSinceStart += tempExperiment.time;
        }
    return [success, indices];
    }
}

// BUBBLE SORT (nlogn)
function sortReturnedSchedule(returnedSchedule) {
    var length = returnedSchedule.length;
    for (var i = 0; i < length; i++) { 
        for (var j = 0; j < (length - i - 1); j++) { 
            if(returnedSchedule[j].start > returnedSchedule[j+1].start) {
                var tmp = returnedSchedule[j];
                returnedSchedule[j] = returnedSchedule[j+1];
                returnedSchedule[j+1] = tmp;
            }
        }        
    }
}
 
function getSlightMatch(mainRequest, allRequests, hours) {
    let energy = mainRequest.energy;
    let shifts = mainRequest.shifts;

    let possibleMatches = getExperimentsByDuration(allRequests, hours);
    let possibleRequests = [];
    possibleMatches.forEach(possibleMatch => {
        if (possibleMatch.energy === energy) possibleRequests.push(possibleMatch);
    });

    let n = possibleRequests.length; 
    let totalShifts, subset, shiftDifference;
    let bestSubsets = [];
    let minShifts = Number.MAX_SAFE_INTEGER;
    // FIND ALL SUBSETS OF EIGHT HOUR CHUNKS
    for (let i = 0; i < (1<<n); i++) {
        subset = [];
        totalShifts = 0
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) > 0) {
                subset.push(possibleRequests[j]);
                totalShifts += possibleRequests[j].shifts;
            }
            // POSTIVE MEANS THAT THE "FILLER" IS LARGER
            shiftDifference = (shifts - totalShifts);
            if (Math.abs(shiftDifference) < Math.abs(minShifts) && subset.length > 0) {
                minShifts = shiftDifference;
                bestSubsets = [];
                bestSubsets.push(subset);
            } else if (shiftDifference === minShifts) bestSubsets.push(subset);
        }
        if (bestSubsets.length === 0) return false;
        else {
        let bestMatch = getSmallestSubset(bestSubsets);
        return [minShifts, bestMatch];
        }
    }
}

// SAME ENERGY
function addSlightMatch(returnedSchedule, request, matches, offset, times, pointer, allRequests) {
    let matchesIndex = 0;
    let matchesShifts = 0;
    
    let excludedRequests = matches.push(request);
    addAllSameEnergy(returnedSchedule, request.energy, excludedRequests, pointer, allRequests);    
    
    if (offset < 0) {
        addExperiment(returnedSchedule, matches[matchesIndex], pointer);
        matchesIndex++;
    }

    for (let i = 0; i < times; i++) {
        addExperiment(returnedSchedule, request, pointer);
        // CHECK TO ITERATE TO NEXT MATCHES SHIFT
        if (matchesShifts === matches[matchesIndex].shifts) {
            matchesIndex++;
            matchesShifts = 0;
        }
        addExperiment(returnedSchedule, matches[matchesIndex], pointer);
        matchesIndex++;
    }

    if (offset < 0) {
        for (let i = 0; i < Math.abs(offset) - 1; i++) {
            addOpenTime(returnedSchedule, request.hoursOn, pointer);
            if (matchesShifts === matches[matchesIndex].shifts) {
                matchesIndex++;
                matchesShifts = 0;
            }
            addExperiment(returnedSchedule, matches[matchesIndex], pointer);
            matchesIndex++;
        }
    } else if (offset > 1) {
        for (let i = 0;  i < offset - 1; i++) {
            addExperiment(returnedSchedule, request, pointer);
            addOpenTime(returnedSchedule, (24 - request.hoursOn), pointer);
        }
        addExperiment(returnedSchedule, request, pointer);
    }   
}


function addOpenTime(returnedSchedule, hours, pointer) {
    let startOpen = new Date(pointer.current.getTime());
    pointer.current.setHours(pointer.current.getHours() + hours);
    let endOpen = new Date(pointer.current.getTime());
    
    let addedOpen = {
        start: startOpen,
        end: endOpen,
        type: "open",
        time: hours,
    }
    returnedSchedule.push(addedOpen);
    pointer.index += 1;
    pointer.openTime += hours;
}


function getExperimentsByDuration(allRequests, hours) {
    let returned = [];
    allRequests.forEach(request => {
        if (request.hoursOn === hours) returned.push(request);
    });
    return returned;
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

function getPerfectEightsMatch(mainRequest, allRequests) {
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
    if (possibleMatches.length === 0) return false;
    else if (neutralOffsets.length === 2) return [[neutralOffsets[0]],[neutralOffsets[1]], 0];
    else if (positiveOffsets.length === 2) return [[positiveOffsets[0]], [positiveOffsets[1]], 1];

    let negativeOffsets = [];
    // CLEAR THESE BECAUSE THEY WILL BE ADDED TO THE SUBSET LATER ON!
    neutralOffsets = [];
    positiveOffsets = [];

    let n = possibleMatches.length; 
    let totalShifts, subset;

    for (let i = 0; i < (1<<n); i++) {
        subset = [];
        totalShifts = 0
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) > 0) {
                subset.push(possibleMatches[j]);
                totalShifts += possibleMatches[j].shifts;
            }
        }
        // IF THEY SUM TO CLOSE TO +/-1 SHIFTS, CONSIDER THEM
        // OTHERWISE IGNORE
        if (totalShifts === shifts + 1) positiveOffsets.push(subset);
        if (totalShifts === shifts) neutralOffsets.push(subset);
        if (totalShifts === shifts - 1) negativeOffsets.push(subset);
    }

    if (negativeOffsets.length >= 2) {
        let smallestSubset = getSmallestSubset(negativeOffsets);
        removeSubset(negativeOffsets, smallestSubset);
        let secondSmallestSubset = getSmallestSubset(negativeOffsets);
        return [smallestSubset, secondSmallestSubset, -1];
    }

    if (neutralOffsets.length >= 2) {
        let smallestSubset = getSmallestSubset(neutralOffsets);
        removeSubset(neutralOffsets, smallestSubset);
        let secondSmallestSubset = getSmallestSubset(neutralOffsets);
        return [smallestSubset, secondSmallestSubset, 0];
    }

    if (positiveOffsets.length >= 2) {
        let smallestSubset = getSmallestSubset(positiveOffsets);
        removeSubset(positiveOffsets, smallestSubset);
        let secondSmallestSubset = getSmallestSubset(positiveOffsets);
        return [smallestSubset, secondSmallestSubset, 1];
    }

    return false;
}


// THIS IS ALL THAT IS LEFT
// ASSUMES THIS IS AN 8/16 or 16/8 PERFECT MATCH AT SAME ENERGY
// OFFSET OF -1 ADDS SECOND EXPERIMENT ONCE BEFORE, OFFSET OF 1 ADDS FIRST EXPERIMENT ONCE AFTER
function addPerfectMatch(returnedSchedule, request, matches, offset, times, pointer, allRequests) {
    let matchesIndex = 0;
    let matchesShifts = 0;

    let excludedRequests = matches.slice(0).push(request);
    addAllSameEnergy(returnedSchedule, request.energy, excludedRequests, pointer, allRequests);
    
    if (offset === -1) {
        addExperiment(returnedSchedule, matches[matchesIndex], pointer);
        matchesShifts += 1;
    }
     
    
    for (let i = 0; i < times - 1; i++) {
        addExperiment(returnedSchedule, request, pointer);
        if (matchesShifts === matches[matchesIndex].shifts) {
            matchesIndex += 1;
            matchesShifts = 0;
        }
        addExperiment(returnedSchedule, matches[matchesIndex], pointer);
        matchesShifts++;
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
                addExperiment(returnedSchedule, request, pointer);
            }
        }
    }
}

function removeSubset(allSubsets, subset) {
    let subsetIsEqual = false;
    let tempSubset;
    for (let i = 0; i < allSubsets.length; i++) {
        tempSubset =  allSubsets[i];
        subsetIsEqual = true;
        if (subset.length != tempSubset.length) subsetIsEqual = false;
        if (subsetIsEqual) {
            for (let j= 0; j < tempSubset.length; j++) {
                if (!equals(tempSubset[j], subset[j])) subsetIsEqual = false;
            }
        }
    
        if (subsetIsEqual) allSubsets = allSubsets.splice(i, 1);
        break;
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

    if (returnedSchedule[pointer.index].type === "beamtime" && returnedSchedule[pointer.index].energy != experiment.energy) {
        addDownTime(returnedSchedule, pointer);
    }

    let startExperiment = new Date(pointer.current.getTime());
    
    pointer.current.setHours(pointer.current.getHours() + experiment.hoursOn);
    let endExperiment = new Date(pointer.current.getTime());
    
    let addedExperiment = {
        start: startExperiment,
        end: endExperiment,
        time: experiment.hoursOn,
        type: "beamtime",
        energy: experiment.energy,
        id: experiment.id,
        company: experiment.company,
        name: experiment.name,
    }
    returnedSchedule.push(addedExperiment);
    pointer.index += 1;
    pointer.beamTime += experiment.hoursOn;
}

// REQUEST SHOULD BE SIXTEEN HOURS
function getPerfectMatch(mainRequest, allRequests, hours) {
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
                let returnedArray = [];
                returnedArray.push(request);
                return [returnedArray, -1];
            }
            else if (request.shifts === shifts) {
                neutralOffsets.push(request);
            }
            else if (request.shifts === shifts - 1) {
                positiveOffsets.push(request);
            }
        }
    }

    if (possibleMatches.length === 0) return false;
    // IF HERE, NO NEGATIVE OFFSETS WERE FOUND
    else if (neutralOffsets.length != 0) {
        let returnedArray = [];
        returnedArray.push(neutralOffsets[0]);
        return [returnedArray, 0];
    }
    else if (positiveOffsets.length != 0) {
        let returnedArray = [];
        returnedArray.push(positiveOffsets[0]);

        return [returnedArray, 1];
    }
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
        if (totalShifts === shifts + 1) positiveOffsets.push(subset);
        if (totalShifts === shifts) neutralOffsets.push(subset);
        if (totalShifts === shifts - 1) negativeOffsets.push(subset);
    }

    if (negativeOffsets.length > 0) {
        return [getSmallestSubset(negativeOffsets), -1];
    }
    if (neutralOffsets.length > 0) {
        return [getSmallestSubset(neutralOffsets), 0];
    }
    if (positiveOffsets.length > 0) {
        return [getSmallestSubset(positiveOffsets), 1];
    }

    // AT THIS POINT, NO PERFECT MATCHES EXIST.
    return false;
}

// USES BUBBLE SORT, COULD BE CHANGED FOR EFFICIENCY
// REQUIRES SPLIT EXPERIMENTS
function sortAscending(experiments) {
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

function sortDescending(experiments) {
    var length = experiments.length;
    for (var i = 0; i < length; i++) { 
        for (var j = 0; j < (length - i - 1); j++) { 
            if(experiments[j].shifts < experiments[j+1].shifts) {
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
    return (energySet.size > 1);
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