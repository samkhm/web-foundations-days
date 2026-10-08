# School Database Design

## Tables

### Students

The `students` table stores information about each student. It contains the student's unique ID, name, and email address. The email is required and must be unique so that two students cannot register using the same email address.

### Courses

The `courses` table stores the courses offered by the school. Each course has a unique ID and a required name.

### Enrolments

The `enrolments` table records which students are taking which courses. It contains foreign keys referencing both the `students` and `courses` tables, as well as the student's grade for that course. The combination of `student_id` and `course_id` is unique so that the same student cannot enrol on the same course twice.

## Relationships

A student has a **one-to-many relationship** with enrolments because one student can have many enrolment records.

A course also has a **one-to-many relationship** with enrolments because one course can have many students enrolled in it.

Students and courses therefore have a **many-to-many relationship**. One student can take many courses, while one course can have many students. The `enrolments` table is needed as a join table to represent this many-to-many relationship. Each row in `enrolments` connects one student to one course and can store additional information about that relationship, such as the student's grade.

## Index

I would add an index on `enrolments.student_id` because the application will frequently need to find all courses belonging to a particular student. An index can make these lookups more efficient as the number of enrolment records grows.

For example:

```sql
CREATE INDEX idx_enrolments_student_id
ON enrolments(student_id);
```

## SQL or NoSQL?

I would choose SQL for this school system because the data has clear relationships between students, courses, and enrolments. A relational database provides primary keys, foreign keys, unique constraints, and joins that help maintain data integrity. SQL is also well suited to queries such as finding all courses for a student, counting students per course, and finding students without enrolments. A NoSQL database could work, but the structured relationships and need for consistency make a relational SQL database a better fit for this system.
