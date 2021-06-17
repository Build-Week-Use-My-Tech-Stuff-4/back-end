## What is this project?

A [RESTful API](https://www.w3schools.in/restful-web-services/intro/) to manage _"Users_, their _"Items"_, and \_"Reviews".

A User has:

- a unique `user_id`(primary key, assigned by the API, integer),
- a `user_name` (required, unique)
- a `password` (required)

An Item has:

- a unique `id`(primary key, integer),
- an `item_name`(required, string)
- a `lister_id` (foreign key for user.user_id)
- a `description` (required, text)
- a `location` (required, string)
- a `price_per_day` (required, float)
- an `available`(required, boolean)

A Review has:

- a `review_id` (primary key, integer)
- a `reviewed_item_id` (foreign key for item.item_id)
- a `reviewer_id` (foreign key for user.user_id)
- a `review_text` (required, text)

### Features

The Web API provides a set of `endpoints` to fulfill the following needs:

- add a new User/Item.
- view a list of existing Users/Items.
- view the details of an User/Item.
- update the information of an existing User/Item.
- remove a User/Item.

Here is a table with the `endpoint` descriptions:

| Action             | URL                  | Method     | Response                 |
| :----------------- | :------------------- | :--------- | :----------------------- |
| Add an item        | /api/items           | POST       | the new item (an object) |
| View list of items | /api/items           | GET        | array of items           |
| View item details  | /api/items/{item_id} | GET        | an item (an object)      |
| Update an item     | /api/items/{item_id} | PATCH(PUT) | updated item             |
| Remove an item     | /api/items/{item_id} | DELETE     | deleted item             |
| Add a user         | /api/users           | POST       | the new user             |
| View list of users | /api/users           | GET        | array of users           |
| View user details  | /api/users/{user_id} | GET        | a user                   |
| Update user        | /api/users/{user_id} | PATCH(PUT) | updated user             |
| Remove a user      | /api/users/{user_id} | DELETE     | deleted user             |

