from subprocess import Popen

#First start school lectures
school1_schedule_ids = ["5f6a58dcbe928b0499240dba",
              "5f6a5c20d608bb04f2817e93",
              "5f6a5c925e2190050e8cea8c",
              "5f6baa629a088d05149b7681",
              "5f6f925d0e011b02da7c2fac"]

school2_schedule_ids = ["5f6a58dcbe928b0499240dba",
              "5f6a5c20d608bb04f2817e93",
              "5f6a5c925e2190050e8cea8c",
              "5f6baa629a088d05149b7681",
              "5f6f925d0e011b02da7c2fac"]


#school 1
for i in range(len(school1_schedule_ids)):
    Popen(["export", "SCHEDULE_ID=" + school1_schedule_ids[i]], shell=True)
    with open("school1_lec_" + str(i) + "_start.txt", "w") as outfile:
        Popen(["artillery", "run", "-e", "school1", "schools_test.yaml"], stdout=outfile)

#school 2
for i in range(len(school2_schedule_ids)):
    Popen(["export", "SCHEDULE_ID=" + school2_schedule_ids[i]], shell=True)
    with open("school2_lec_" + str(i) + "_start.txt", "w") as outfile:
        Popen(["artillery", "run", "-e", "school2", "schools_test.yaml"], stdout=outfile)


#Now create students and make them join the lectures of both schools_test
#school 1 Students
for i in range(len(school1_schedule_ids)):
    Popen(["export", "SCHEDULE_ID=" + school1_schedule_ids[i]], shell=True)
    with open("school1_lec_" + str(i) + "_students_chat.txt", "w") as outfile:
        Popen(["artillery", "run", "-e", "school1", "students_test.yaml"], stdout=outfile)

#school 2 students
for i in range(len(school2_schedule_ids)):
    Popen(["export", "SCHEDULE_ID=" + school2_schedule_ids[i]], shell=True)
    with open("school2_lec_" + str(i) + "_students_chat.txt", "w") as outfile:
        Popen(["artillery", "run", "-e", "school2", "students_test.yaml"], stdout=outfile)
