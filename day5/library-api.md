# Library Books REST API

This API manages books in a library system. The main resource is `books`.

## Endpoints

### 1. List all books

* **Method:** `GET`
* **Path:** `/api/books`
* **Description:** Returns a list of all books in the library.
* **Success status:** `200 OK`

### 2. Get one book

* **Method:** `GET`
* **Path:** `/api/books/:id`
* **Description:** Returns the details of one book using its ID.
* **Success status:** `200 OK`

### 3. Create a book

* **Method:** `POST`
* **Path:** `/api/books`
* **Description:** Creates a new book in the library.
* **Example request body:**

```json
{
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "publishedYear": 1958
}
```

* **Success status:** `201 Created`

### 4. Update a book

* **Method:** `PUT`
* **Path:** `/api/books/:id`
* **Description:** Updates an existing book using its ID.
* **Example request body:**

```json
{
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "publishedYear": 1958
}
```

* **Success status:** `200 OK`

### 5. Delete a book

* **Method:** `DELETE`
* **Path:** `/api/books/:id`
* **Description:** Deletes a book using its ID.
* **Success status:** `204 No Content`

### 6. List books by author

* **Method:** `GET`
* **Path:** `/api/books?author=Chinua%20Achebe`
* **Description:** Returns books written by the specified author using the `author` query parameter.
* **Success status:** `200 OK`

## Error Codes

### 400 Bad Request

A `400` response is returned when the request contains invalid or missing data.

**Example:**

A client tries to create a book without providing a required title:

```json
{
    "author": "Chinua Achebe"
}
```

### 404 Not Found

A `404` response is returned when the requested book does not exist.

**Example:**

```text
GET /api/books/9999
```

If book `9999` does not exist, the API returns `404 Not Found`.
