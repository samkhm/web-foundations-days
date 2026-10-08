-- ============================================
-- School Database
-- ============================================

-- Remove existing tables so the script can
-- be safely re-run in an SQLite playground.

DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

-- ============================================
-- 1. Students
-- ============================================

CREATE TABLE students (
id INTEGER PRIMARY KEY,
name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE
);

-- ============================================
-- 2. Courses
-- ============================================

CREATE TABLE courses (
id INTEGER PRIMARY KEY,
name TEXT NOT NULL
);

-- ============================================
-- 3. Enrolments
-- ============================================

CREATE TABLE enrolments (
id INTEGER PRIMARY KEY,
student_id INTEGER NOT NULL,
course_id INTEGER NOT NULL,
grade TEXT,

```
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (course_id) REFERENCES courses(id),

UNIQUE (student_id, course_id)
```

);

-- ============================================
-- Sample Students
-- ============================================

INSERT INTO students (id, name, email)
VALUES
(1, 'Samuel Kimanthi', 'samuel@example.com'),
(2, 'Grace Wanjiku', 'grace@example.com'),
(3, 'Daniel Otieno', 'daniel@example.com'),
(4, 'Mary Achieng', 'mary@example.com');

-- ============================================
-- Sample Courses
-- ============================================

INSERT INTO courses (id, name)
VALUES
(1, 'Web Development'),
(2, 'Database Systems'),
(3, 'Computer Networks');

-- ============================================
-- Sample Enrolments
-- ============================================

INSERT INTO enrolments (id, student_id, course_id, grade)
VALUES
(1, 1, 1, 'A'),
(2, 1, 2, 'B'),
(3, 2, 1, 'A'),
(4, 2, 3, 'B'),
(5, 3, 2, 'C');

-- ============================================
-- Query 1: All courses for one student
-- ============================================

SELECT
students.name AS student,
courses.name AS course,
enrolments.grade
FROM students
JOIN enrolments
ON students.id = enrolments.student_id
JOIN courses
ON courses.id = enrolments.course_id
WHERE students.name = 'Samuel Kimanthi';

-- ============================================
-- Query 2: All students on one course
-- ============================================

SELECT
students.name AS student,
courses.name AS course
FROM students
JOIN enrolments
ON students.id = enrolments.student_id
JOIN courses
ON courses.id = enrolments.course_id
WHERE courses.name = 'Web Development';

-- ============================================
-- Query 3: Number of students per course
-- ============================================

SELECT
courses.name AS course,
COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments
ON courses.id = enrolments.course_id
GROUP BY courses.id, courses.name;

-- ============================================
-- Query 4: Students who have no enrolments
-- ============================================

SELECT
students.name
FROM students
LEFT JOIN enrolments
ON students.id = enrolments.student_id
WHERE enrolments.id IS NULL;

-- ============================================
-- Query 5: Update one enrolment's grade
-- ============================================

UPDATE enrolments
SET grade = 'A'
WHERE student_id = 3
AND course_id = 2;
