import os
import csv

"""
Check id fata directory exists and create if not
"""
directory = './data'
if not os.path.exists(directory):
    os.makedirs(directory)
"""
Save the csv_file to save the students data
"""
csv_file = os.path.join(directory, 'students.csv')

"""
Create the csv file if not exists
"""
if not os.path.exists(csv_file):
    with open(csv_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['code', 'first_name', 'last_name', 'note1', 'note2', 'note3', 'average'])
"""
Calculate the average of the student
"""
def calculateAverage(note1, note2, note3):
    return (float(note1) + float(note2) + float(note3)) / 3
"""
Create a new dtudent
"""
def createStudent(code, first_name, last_name, note1, note2, note3):
    average = calculateAverage(note1, note2, note3)
    with open(csv_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([code, first_name, last_name, note1, note2, note3, average])
    print(f"Student {code} created successfully.")

"""
Find an student by code
"""
def findStudent(code):
    with open(csv_file, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['code'] == code:
                return row
    print(f"Student {code} not found.")
    return None
"""
Update an existing student
"""
def updateStudent(code, first_name, last_name, note1, note2, note3):
    students = []
    found = False
    with open(csv_file, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['code'] == code:
                row['first_name'] = first_name
                row['last_name'] = last_name
                row['note1'] = note1
                row['note2'] = note2
                row['note3'] = note3
                row['average'] = calculateAverage(note1, note2, note3)
                found = True
            students.append(row)

    if found:
        with open(csv_file, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=students[0].keys())
            writer.writeheader()
            writer.writerows(students)
        print(f"Student {code} updated successfully.")
    else:
        print(f"Student {code} not found.")

"""
Delete an student if exists
"""
def deleteStudent(code):
    students = []
    found = False
    with open(csv_file, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['code'] == code:
                found = True
            else:
                students.append(row)

    if found:
        with open(csv_file, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=students[0].keys())
            writer.writeheader()
            writer.writerows(students)
        print(f"Student {code} deleted successfully.")
    else:
        print(f"Student {code} not found.")
"Show all the students"
def showAll():
    with open(csv_file, mode='r') as file:
        reader = csv.DictReader(file)
        print("Code  | First Name | Last Name | Note1 | Note2 | Note3 | Average")
        print("------|------------|-----------|-------|-------|--------|--------")
        for row in reader:
            print(f"{row['code']} | {row['first_name']} | {row['last_name']} | {row['note1']} | {row['note2']} | {row['note3']} | {row['average']}")
"""
Show the class statistics
"""
def showStatistics():
    highest_avg_student = None
    lowest_avg_student = None
    total_avg = 0
    count = 0

    with open(csv_file, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            avg = float(row['average'])
            if highest_avg_student is None or avg > float(highest_avg_student['average']):
                highest_avg_student = row
            if lowest_avg_student is None or avg < float(lowest_avg_student['average']):
                lowest_avg_student = row
            total_avg += avg
            count += 1

    if count > 0:
        general_avg = total_avg / count
        print("Statistics:")
        print(f"Highest Average Student: {highest_avg_student['first_name']} {highest_avg_student['last_name']}, Average: {highest_avg_student['average']}")
        print(f"Lowest Average Student: {lowest_avg_student['first_name']} {lowest_avg_student['last_name']}, Average: {lowest_avg_student['average']}")
        print(f"General Average: {general_avg}")
    else:
        print("No students found to calculate statistics.")

def menu():
    while True:
        print("\nMenu:")
        print("1. List all students")
        print("2. Get student")
        print("3. Create student")
        print("4. Update student")
        print("5. Delete student")
        print("6. Show statistics")
        print("7. Exit")
        
        choice = input("Enter your choice: ")

        if choice == '1':
            showAll()
        elif choice == '2':
            code = input("Enter student code: ")
            student = findStudent(code)
            if student:
                print(f"Code: {student['code']}, First Name: {student['first_name']}, Last Name: {student['last_name']}, Note1: {student['note1']}, Note2: {student['note2']}, Note3: {student['note3']}, Average: {student['average']}")
        elif choice == '3':
            code = input("Enter student code: ")
            first_name = input("Enter first name: ")
            last_name = input("Enter last name: ")
            note1 = input("Enter note1: ")
            note2 = input("Enter note2: ")
            note3 = input("Enter note3: ")
            createStudent(code, first_name, last_name, note1, note2, note3)
        elif choice == '4':
            code = input("Enter student code: ")
            student = findStudent(code)
            if student:
                first_name = input("Enter new first name: ")
                last_name = input("Enter new last name: ")
                note1 = input("Enter new note1: ")
                note2 = input("Enter new note2: ")
                note3 = input("Enter new note3: ")
                updateStudent(code, first_name, last_name, note1, note2, note3)
        elif choice == '5':
            code = input("Enter student code: ")
            deleteStudent(code)
        elif choice == '6':
            showStatistics()
        elif choice == '7':
            break
        else:
            print("Invalid choice. Please try again.")

menu()
