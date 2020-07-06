# -*- coding: utf-8 -*-
"""
Created on Tue Jun 16 13:26:56 2020

@author: Rob
"""

from faker import Faker
fake = Faker()
#import hashlib
from datetime import datetime, timedelta
import random
#import math

fw = open('createData.sql','w')

numUsers = 30
# numEntries = 6000

facilities = ["TAMU", "MSU", "LBNL", "NSRL"]
integrators = ["MDA", "NASA", "Independant"]
beams = ["Heavy Ion", "Proton"]
startTimes = ["00:00", "08:00", "16:00"]
dateRangeStart = datetime.strptime("2020-01-01", "%Y-%m-%d")
dateRangeEnd = datetime.strptime("2020-12-30", "%Y-%m-%d")
day_count = 365
users = []

# Users
for i in range(numUsers):
    initials = fake.pystr(min_chars=2, max_chars=2)
    number = random.randrange(10, 99)
    user = initials + str(number)
    users.append(user)

# Calendar
# for entry in range(numEntries):
    # user = random.choice(users)
    # facility = random.choice(facilities)
    # integrator = random.choice(integrators)
    # beam = random.choice(beams)
cannotRun = "Null"
totalTime = 8

# startDate = fake.date_between(start_date=dateRangeStart, end_date=dateRangeEnd)
# startDate = startDate.strftime("%Y-%m-%d ") + random.choice(startTimes)

# Triple for loop is probably the worst way to do this, but simplest/fastest
# Not dealing with huge datasets, so it works (capped at 10,000 entries)
for date in (dateRangeStart + timedelta(n) for n in range(day_count)):
    for time in startTimes:
        startDate = date.strftime("%Y-%m-%d ") + time
        for facility in facilities:
            user = random.choice(users)
            integrator = random.choice(integrators)
            beam = random.choice(beams)
            statement = ("INSERT INTO public.\"Calendar\" (username, facility, " +
                         "integrator, \"totalTime\", \"startDate\", \"cannotRun\") " +
                         "Values ('" + user + "', '" + facility
                          + "', '" + integrator + "', '" + str(totalTime)
                          + "', '" + startDate 
                          + "', " + str(cannotRun) + ");\n")
            fw.write(statement)

fw.close()